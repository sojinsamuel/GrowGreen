import {
  LayoutDashboard,
  ImageIcon,
  Search,
  Music,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_TRIALS = 5;

export const routes = [
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
] as const;

export const links = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Shop",
    route: "/shop",
  },
  {
    name: "News",
    route: "/news",
  },
] as const;

export const AFFILIATE_CODE =
  "?tag=thewire06-20&linkCode=xm2&ascsubtag=AwEAAAAAAAAAAn8d";
// Amazon ref: ?tag=thewire06-20&linkCode=xm2&ascsubtag=AwEAAAAAAAAAAn8d
