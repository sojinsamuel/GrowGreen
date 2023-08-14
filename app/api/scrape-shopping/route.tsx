import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchTerm } = await req.json();
    console.log("searchTerm on Shopping", searchTerm);

    if (!searchTerm) {
      return NextResponse.next(
        new Response("Missing search term", { status: 400 })
      );
    }

    // Ref: https://docs.oxylabs.io/wmw8gbrbnajdf87/scraper-apis/e-commerce-scraper-api/google-shopping/shopping-search
    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
      method: "POST",
      body: JSON.stringify({
        source: "amazon_search",
        domain: "in",
        query: `${searchTerm} seeds for gardening`,
        start_page: 1,
        pages: 1,
        parse: true,
        // render: "html",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.OXYLABS_SHOPPING_USERNAME}:${process.env.OXYLABS_SHOPPING_PASSWORD}`
          ).toString("base64"),
      },
      cache: "no-store",
    });

    const data = await response.json();
    // console.log(JSON.stringify(data.results, null, 2));
    return NextResponse.json(data.results[0].content.results.organic);
  } catch (error) {
    console.log(error);
    return new NextResponse("Scraping Shopping Search Results Failed", {
      status: 500,
    });
  }
}
