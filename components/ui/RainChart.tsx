"use client";

import { Card, AreaChart, Title } from "@tremor/react";

//@ts-ignore
function RainChart({ data }) {
  const hourly = data.hourly.time
    .map((time: string) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);
  // console.log(hourly);

  const stats = hourly.map((hour: string, i: number) => ({
    time: Number(hour),
    "Rain (%)": data.hourly.precipitation_probability[i],
  }));

  const dataFormatter = (number: number) => `${number}%`;

  return (
    <div className="flex justify-around p-5">
      <Card className="w-[45vw]">
        <Title>Chances of Rain</Title>
        <AreaChart
          className="mt-6"
          data={stats}
          index="time"
          categories={["Rain (%)"]}
          colors={["blue"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}

export default RainChart;
