"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import DiseaseDetailsSkeleton from "@/components/ui/DisableDetailsSkeleton";
import toast from "react-hot-toast";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

const slideImages = [
  {
    url: "/slide-1.png",
    caption: "Slide 1",
  },
  {
    url: "/upload-v2.jpg",
    caption: "Slide 2",
  },
  {
    url: "/slide-2.png",
    caption: "Slide 3",
  },
];

function FindDisease() {
  const [file, setFile] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = async (e: any) => {
    setFile(undefined);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async function () {
      setLoading(true);
      try {
        const response = await axios.post("/api/find-disease", {
          base64: reader.result,
        });
        console.log(response.status);
        if (response.status === 201) {
          toast.success("Your plant is healthy 🌱", {
            duration: 3000,
          });
          setLoading(false);
          return;
        } else if (response.status === 404) {
          toast.error("This isnt an image of a plant ", {
            duration: 3000,
          });
          setLoading(false);
          return;
        }
        setFile(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("This isnt an image of a plant ", {
            duration: 3000,
          });
        } else {
          toast.error("Something went wrong, Try again!", {
            duration: 3000,
          });
        }
        setLoading(false);
        return;
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <div className="min-h-screen bg-white/5 py-8">
      <div className="flex justify-center mb-6">
        <div>
          <Label
            htmlFor="picture"
            className="relative cursor-pointer block rounded-md px-10 py-4 text-white bg-green-600 hover:bg-green-700"
          >
            <span className="font-semibold">Upload Picture</span>
            <Input
              id="picture"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handlePhotoUpload}
              disabled={loading}
            />
          </Label>
        </div>
      </div>
      {file?.health_assessment && (
        <div className="px-4 mt-3">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {file.health_assessment.diseases[0].name}
              </h2>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-700">
                {file.health_assessment.diseases[0].disease_details.description}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Similar Cases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {file.health_assessment.diseases[0].similar_images.map(
                  (image: any) => (
                    <div key={image.id} className="flex justify-center">
                      <div className="rounded-lg shadow-lg">
                        <Image
                          src={image.url}
                          alt="Similar case"
                          height={300}
                          width={300}
                          loading="eager"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Treatment</h2>
              <div className="grid gap-4 ml-3">
                {Object.entries(
                  file.health_assessment.diseases[0].disease_details.treatment
                ).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <ul className="list-disc pl-6">
                      {/* @ts-ignore */}
                      {items.map((item: any, index: any) => (
                        <li key={index} className="text-gray-700 ">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <DiseaseDetailsSkeleton />
      ) : (
        <div className="slide-container mx-auto mt-10 w-[50vw]">
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.url})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
      )}
    </div>
  );
}

export default FindDisease;
