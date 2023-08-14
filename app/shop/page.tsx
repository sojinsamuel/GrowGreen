/* eslint-disable @next/next/no-img-element */
import { AFFILIATE_CODE } from "@/constants";
import { fetchHostUrl } from "@/helper/fetchHostUrl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

async function Shop() {
  const response = await fetch(fetchHostUrl("/api/scrape-shopping"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchTerm: "Plant",
    }),
    next: { revalidate: 60 },
  });

  const shoppingItems = await response.json();

  return (
    <>
      <div className="mx-auto w-[30vw] pt-10 ">
        <Alert className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            These are affiliate links, I may earn a commission if you click on
          </AlertDescription>
        </Alert>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full py-10 px-5">
        {shoppingItems.map((data: any) => (
          <a
            key={data.asin}
            target="_blank"
            href={`https://amazon.in${data.url}${AFFILIATE_CODE}`}
            className="flex flex-col space-x-4 w-full bg-white rounded-lg shadow-md p-5"
          >
            <img
              src={data.url_image}
              alt={data.title}
              className="object-contain w-full h-30 py-5 rounded-lg shadow-lg px-5 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100"
              width={100}
              height={100}
            />
            <div className="flex flex-col py-5 flex-1">
              <p className="font-bold line-clamp-3">{data.title}</p>
              <p className="text-sm text-gray-500">
                {data.rating} ({data.reviews_count} reviews)
              </p>
              <div className="flex space-x-2 justify-end flex-1">
                <p className="font-bold text-indigo-500 pt-2 text-xl mt-auto">
                  ₹{data.price}
                </p>
                {data.price_strikethrough && (
                  <p className="font-bold text-indigo-500/50 line-through pt-2 text-xl mt-auto">
                    ₹{data.price_strikethrough}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-5">
                <p className="text-xs bg-indigo-500 px-2 py-1 text-white rounded-md line-clamp-2">
                  {data.shipping_information}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default Shop;
