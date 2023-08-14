import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchTerm } = await req.json();
    console.log("searchTerm on SERP", searchTerm);

    if (!searchTerm) {
      return NextResponse.next(
        new Response("Missing search term", { status: 400 })
      );
    }

    // Ref: https://docs.oxylabs.io/wmw8gbrbnajdf87/scraper-apis/e-commerce-scraper-api/google-shopping/shopping-search
    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
      method: "POST",
      body: JSON.stringify({
        source: "google_search",
        domain: "com",
        query: `${searchTerm} gardening tips`,
        parse: true,
        start_page: 1,
        pages: 1,
        geo_location: "Untied States",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.OXYLABS_SERP_USERNAME}:${process.env.OXYLABS_SERP_PASSWORD}`
          ).toString("base64"),
      },
      cache: "no-store",
    });

    const data = await response.json();
    // console.log(JSON.stringify(data.results, null, 2));
    return NextResponse.json(data.results[0].content.results.organic);
  } catch (error) {
    // console.log(error);
    return new NextResponse("Scraping Google Search Results Failed", {
      status: 500,
    });
  }
}
