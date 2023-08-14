import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { base64 } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (!base64) {
      return new NextResponse("Image is missing, Try again!", { status: 400 });
    }

    const response = await axios.post(
      "https://api.plant.id/v2/health_assessment",
      {
        images: [base64],
        organs: ["leaf", "flower", "fruit", "bark", "habit"],
        plant_details: ["common_names", "url", "wiki_description", "taxonomy"],
        modifiers: ["crops_fast", "similar_images"],
        disease_details: ["description", "treatment"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.PLANTID_API_KEY as string,
        },
      }
    );

    // console.log("Plant response", response.data);

    if (!response.data.is_plant) {
      return new NextResponse(
        "Upload Failed. Images of only plants are allowed",
        { status: 404 }
      );
    }

    if (response.data.health_assessment.is_healthy) {
      return new NextResponse("Plant is healthy", { status: 201 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse("Plant Disease Identification Error", {
      status: 500,
    });
  }
}
