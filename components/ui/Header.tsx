"use client";

import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { links } from "@/constants";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

// const font = Montserrat({ weight: "600", subsets: ["latin"] });

function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (
      pathname === "/dashboard" ||
      pathname === "/finder" ||
      pathname === "/whichdisease" ||
      pathname[1] === "s"
    ) {
      return;
    }
  }, [pathname]);
  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40  bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 -translate-x-1/2"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-black sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map((link, index) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.route}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className="flex w-full items-center justify-center px-3 py-3 hover:text-black transition dark:text-gray-500 dark:hover:text-gray-300"
                href={link.route}
              >
                {link.name}
              </Link>
              {index == links.length - 1 && (
                <Link
                  className="pl-5"
                  href={isSignedIn ? "/dashboard" : "/sign-up"}
                >
                  {isSignedIn ? "Dashboard" : "SignUp"}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
