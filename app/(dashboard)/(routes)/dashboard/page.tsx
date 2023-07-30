"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Option,
  Save,
  Search,
  Settings,
  VideoIcon,
} from "lucide-react";

interface Tool {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  href: string;
}

const tools: Tool[] = [
  {
    label: "Finder",
    icon: Search,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/finder",
  },
  {
    label: "Best Choices",
    icon: Option,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/bestchoices",
  },
  {
    label: "Locate by Image",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/locatebyimage",
  },
  {
    label: "My Favs",
    icon: Save,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/myfavs",
  },
];

export default function Dashboard() {
  const router = useRouter();
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl text-bold text-center">
        Your Personalized Plant Growth Assistant
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Nurture Nature, Cultivate Life - Unleash the Green Thumb Within!
      </p>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center 
            justify-between hover:shadow-md 
            transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn(tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
