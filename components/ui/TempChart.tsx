"use client";

import { Card, AreaChart, Title } from "@tremor/react";
//@ts-ignore

function TempChart({ data }) {
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
    "UV Index": data.hourly.uv_index[i],
    "Temperature (C)": data.hourly.temperature_2m[i],
  }));

  const dataFormatter = (number: number) => `${number}°C`;

  return (
    <div className="flex justify-around p-5">
      <Card className="w-[45vw]">
        <Title>Temperature and UV index</Title>
        <AreaChart
          className="mt-6"
          data={stats}
          index="time"
          categories={["Temperature (C)", "UV Index"]}
          colors={["yellow", "rose"]}
          minValue={0}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}

export default TempChart;
