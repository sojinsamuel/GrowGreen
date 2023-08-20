import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { base64 } = await req.json();
    // console.log("Your Passed data", base64);

    // console.log("Plant API KEY", process.env.PLANTID_API_KEY);

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (!base64) {
      return new NextResponse("Image is missing, Try again!", { status: 400 });
    }

    const response = await axios.post(
      "https://api.plant.id/v2/identify",
      {
        images: [base64],
        organs: ["leaf", "flower", "fruit", "bark", "habit"],
        plant_details: ["common_names", "url", "wiki_description", "taxonomy"],
        modifiers: ["crops_fast", "similar_images"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.PLANTID_API_KEY as string,
        },
      }
    );

    console.log("Plant response", response.data);

    // if (!response.data.is_plant) {
    //   return new NextResponse(
    //     "Upload Failed. Images of only plants are allowed",
    //     { status: 302 }
    //   );
    // }

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Plant Identification Error", error);

    return new NextResponse("Plant Identification Error", { status: 300 });
  }
}
