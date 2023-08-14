"use client";

import { Callout } from "@tremor/react";
import { ExclamationIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useUser } from "@clerk/nextjs";

type Props = {
  location: string;
  warning?: boolean;
};

function CalloutCard({ location, warning }: Props) {
  const { user } = useUser();
  const message = `Hie ${user?.firstName}, I see you are from ${location}. Below are some stats that may help you to study the climatic conditions in your area`;
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
