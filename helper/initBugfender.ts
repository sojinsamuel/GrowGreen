import { Bugfender } from "@bugfender/sdk";

export default function initBugfender() {
  Bugfender.init({
    appKey: process.env.NEXT_PUBLIC_BUGFENDER_API_KEY!,
    deviceName: "GrowGreener Web",
  });
}
