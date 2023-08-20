"use client";

import {
  ImageIcon,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Finder",
    icon: Search,
    href: "/finder",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },

  {
    label: "Which Disease is it?",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/whichdisease",
  },
];

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-3 ">
            <Image fill alt="grow green" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            <Link href="/">Grow Greener</Link>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className={cn(
                `text-sm group flex p-3 w-full justify-start font-medium cursor-pointer 
                hover:text-white hover:bg-white/10 
                rounded-lg transition`,
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zince-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
