"use client";

import { Callout } from "@tremor/react";
import { ExclamationIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import initBugfender from "@/helper/initBugfender";
import { Bugfender } from "@bugfender/sdk";

initBugfender();

type Props = {
  location: string;
  warning?: boolean;
};
let CITY = "";

function CalloutCard({ location, warning }: Props) {
  const [currentLocation, setCurrentLocation] = useState(undefined);

  const { user } = useUser();
  async function getLocation() {
    const res = await fetch(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
    );

    const {
      city: { name },
    } = await res.json();
    // console.log(data);
    CITY = name;
    setCurrentLocation(name);
    console.log({ CITY });

    return name;
  }

  useEffect(() => {
    getLocation();
    Bugfender.sendLog({
      tag: "Searching Location ",
      text: "Initiating Location Search",
    });
  }, []);

  const message = `Hie ${user?.firstName}, I see you are from ${
    currentLocation || "{Searching...}"
  }. Below are some stats that may help you to study the climatic conditions in your area`;
  return (
    <Callout
      className="mt-4 max-w-md mx-auto p-5"
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={warning ? "rose" : "teal"}
    />
  );
}

export default CalloutCard;
