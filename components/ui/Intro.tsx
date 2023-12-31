"use client";

import TypewriterComponent from "typewriter-effect";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./button";
import { Github, Pencil, Rocket, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";

function Intro() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push("https://github.com/sojinsamuel/GrowGreen");
  };

  const handleArticle = () => {
    router.push(
      "https://www.showwcase.com/show/36110/reactplay-hackathon-project-day-1-recap?seriesId=11791&seriesIndex=0"
    );
  };

  const handleVideo = () => {
    router.push(
      "https://drive.google.com/file/d/10DgOSrJcWJw3merqIyAleSfTbRfj-Und/view?usp=sharing"
    );
  };

  return (
    <div className=" font-bold py-36 text-center space-y-5 overflow-hidden">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best Platform For Rookie Gardeners</h1>

        <div className=" bg-clip-text bg-gradient-to-r from-gray-700 via-gray-900 to-black">
          <TypewriterComponent
            options={{
              strings: [
                "Discover Plants",
                "Identify Species",
                "Diagnose Diseases",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl  text-black font-serif font-extrabold">
        Unveiling Nature&apos;s Secrets, One Leaf at a Time
      </div>
      <div className="">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Unleash the Plant Whiz Within&nbsp; <Rocket />
          </Button>
        </Link>
      </div>
      <div className="flex justify-center items-center h-20 gap-5 font-extrabold">
        <Button
          variant="cta"
          className="text-black text-xs md:text-sm  "
          onClick={handleVideo}
        >
          <Youtube />
          &nbsp; Video
        </Button>
        <Button
          variant="cta"
          className="text-black text-xs md:text-sm   "
          onClick={handleClick}
        >
          <Github />
          &nbsp; Source Code
        </Button>
        <Button
          variant="cta"
          className="text-black text-xs md:text-sm"
          onClick={handleArticle}
        >
          <Pencil />
          &nbsp; Article
        </Button>
      </div>
    </div>
  );
}

export default Intro;
