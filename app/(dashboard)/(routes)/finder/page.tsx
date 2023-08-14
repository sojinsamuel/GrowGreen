"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Delete, Search } from "lucide-react";
import { set, useForm } from "react-hook-form";
import FileBase64 from "react-file-base64";
import { ExclamationIcon } from "@heroicons/react/solid";

import Heading from "@/components/ui/Heading";
import { formSchema } from "./constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import MyCart from "@/components/ui/MyCart";
import RelatedArticles from "@/components/ui/RelatedArticles";
import { SkeletonLoader } from "@/components/ui/skeletonLoader";
import { toast as t } from "react-hot-toast";
import { Callout } from "@tremor/react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Bugfender } from "@bugfender/sdk";

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
  marginBottom: "50px",
};

const slideImages = [
  {
    url: "/finder-1.jpg",
    caption: "Slide 1",
  },
  {
    url: "/finder-2.jpg",
    caption: "Slide 2",
  },
  {
    url: "/finder-3.jpg",
    caption: "Slide 3",
  },
];

function Finder() {
  const router = useRouter();
  const [messages, setMessages] = useState<any>();

  const [base64, setBase64] = useState<undefined>(undefined);
  const [fileKey, setFileKey] = useState(0);
  const [seedCart, setSeedCart] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [hasRecievedData, setHasRecievedData] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  console.log(process.env.NEXT_PUBLIC_BUGFENDER_API_KEY);

  // console.log(hasRecievedData);
  useEffect(() => {
    Bugfender.init({
      appKey: process.env.NEXT_PUBLIC_BUGFENDER_API_KEY!,
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setRelatedArticles([]);
    setHasRecievedData(true);
    setBase64(undefined);
    try {
      if (base64) {
        console.log("Fetching plant API");
        const response = await axios.post("/api/plantid", {
          base64,
        });

        console.log("Data from Plant API", response);
        setMessages(response?.data);

        // console.log("Search keyword", messages.suggestions[0].plant_name);
        const shoppingResponse = await axios.post("/api/scrape-shopping", {
          searchTerm: "jasmine",
        });

        console.log("Shopping Response", shoppingResponse.data);

        // console.log(response.data.slice(0, 5));
        setSeedCart(shoppingResponse.data.slice(0, 5));

        const serpResponse = await axios.post("/api/serp", {
          searchTerm: values.prompt,
        });

        // console.log(serpResponse.data);
        setRelatedArticles(serpResponse.data);
      } else {
        console.log("Fetching openai");

        const userMessage = {
          role: "user",
          content: values.prompt,
        };

        const response = await axios.post("/api/finder", {
          messages: userMessage,
        });

        if (response.status === 400) {
          t.error("Only Plant related prompts are allowed. Try again.");
          return;
        }

        console.log("Data from Openai", response.data);
        // const obj = JSON.parse(response?.data) || "Error";
        // console.log("Object", typeof obj);

        setMessages(response?.data);
        // console.log("Messages", messages);
        const shoppingResponse = await axios.post("/api/scrape-shopping", {
          searchTerm: values.prompt,
        });

        // console.log(response.data.slice(0, 5));
        setSeedCart(shoppingResponse.data.slice(0, 5));

        const serpResponse = await axios.post("/api/serp", {
          searchTerm: values.prompt,
        });

        // console.log(serpResponse.data);
        setRelatedArticles(serpResponse.data);
      }

      form.reset();
      setHasRecievedData(false);
    } catch (error: any) {
      t.error("Try a plant name. eg: Jasmine or upload a plant image.");
      Bugfender.sendIssue("Plant Finder Page", error);
      Bugfender.log("Plant Finder Page", error);
    } finally {
      router.refresh();
      handleClearFileUpload();
      setHasRecievedData(false);
    }
  };

  const validateFields = () => {
    // User is not allowed to submit a prompt and upload a file at the same time
    // If the user has uploaded a file, don't disable the button anymore
    if (base64) {
      return false;
    }

    // disable the button if the prompt is empty
    return !form.getValues().prompt;
  };

  const handleFileUpload = (fileData: any) => {
    // console.log(fileData.base64);
    setBase64(fileData.base64);
  };

  const handleClearFileUpload = () => {
    setFileKey((prevKey) => prevKey + 1);
    setBase64(undefined);
  };
  console.log("Messages", messages);
  console.log("Articles", relatedArticles);
  console.log("Seed", seedCart);

  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-4">
        <Heading
          title="Finder"
          description="Find a plant that's right for you"
          icon={Search}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
        <Callout
          className="mt-4 max-w-md mx-auto p-5 mb-3 shadow-md "
          title="It can take 10 - 25s to get a response from the API. Please be patient."
          icon={ExclamationIcon}
          color="rose"
        />
      </div>
      <div className="px-4 lg-px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <div className="flex items-center">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading || base64}
                          placeholder="Jasmine"
                          {...field}
                        />
                        {/* Filebase64 */}
                        <div className="flex items-center justify-center  sm:w-[5vw] sm:-m-28 lg:w-auto lg:m-auto">
                          <FileBase64
                            key={fileKey}
                            multiple={false}
                            onDone={handleFileUpload}
                            id="fileUpload"
                          />
                          <Delete
                            onClick={handleClearFileUpload}
                            className="z-[10] -m-10 cursor-pointer place-items-end"
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12  w-full  ml-auto"
                type="submit"
                disabled={isLoading || validateFields()}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        {/* Show Data */}
        {relatedArticles.length > 1 && messages.images && (
          <>
            <div className="space-y-4 mt-4 flex flex-col md:flex-row items-center justify-center gap-5 px-3 py-5">
              <div className="">
                <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                  <Image
                    src={messages?.images[0]?.url}
                    width={300}
                    height={300}
                    alt="plant picture"
                    className="bg-gray-200"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
              <div className="items-center">
                <p className="text-customColor font-extrabold text-2xl">
                  {messages?.suggestions[0].plant_name}
                </p>
                <p className="text-gray-500 text-lg w-[40vw] mb-5">
                  {
                    messages?.suggestions[0].plant_details.wiki_description
                      .value
                  }
                </p>
                <ul className=" w-[40vw] text-gray-600 text-lg">
                  <li>
                    <CheckCircle color="green" className="inline mr-1 " />
                    &nbsp;Common Names:{" "}
                    {messages?.suggestions[0].plant_details.common_names.join(
                      ", "
                    )}
                  </li>
                </ul>
                <Button size="default" className="bg-customColor mt-3">
                  Save to my list
                </Button>
              </div>
            </div>

            <MyCart seedList={seedCart} />

            <RelatedArticles relatedArticles={relatedArticles} />
          </>
        )}
        {relatedArticles.length > 1 && messages.text && (
          <>
            <div className="space-y-4 mt-4 flex flex-col md:flex-row items-center justify-center gap-5 px-3 py-5">
              <div className="">
                <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                  <Image
                    src={messages?.image[0]?.url}
                    width={300}
                    height={300}
                    alt="plant picture"
                    className="bg-gray-200"
                    loading="eager"
                  />
                </div>
              </div>
              <div className="items-center">
                <p className="text-customColor font-extrabold text-2xl">
                  {messages?.text.name}
                </p>
                <p className="text-gray-500 text-lg w-[40vw] mb-5">
                  {messages?.text.description}
                </p>
                <ul className=" w-[40vw] text-gray-600 text-lg">
                  <li>
                    <CheckCircle color="green" className="inline mr-1 " />
                    &nbsp;{messages?.text.temperature}
                  </li>
                </ul>
                <Button size="default" className="bg-customColor mt-3">
                  Save to my list
                </Button>
              </div>
            </div>
            <MyCart seedList={seedCart} />
            <RelatedArticles relatedArticles={relatedArticles} />
          </>
        )}

        {hasRecievedData ? (
          <SkeletonLoader />
        ) : (
          <div className="slide-container mx-auto mt-10 w-[50vw] ">
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
    </div>
  );
}

export default Finder;
