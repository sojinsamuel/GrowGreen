import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div>
      Home (unprotected){" "}
      <div className="flex space-x-2 m-5">
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Sign up</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
