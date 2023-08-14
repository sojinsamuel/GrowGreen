"use client";

import { Card, AreaChart, Title } from "@tremor/react";
//@ts-ignore
function HumidityChart({ data }) {
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
    "Humidity (%)": data.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number: number) => `${number}%`;

  return (
    <div className="flex justify-around p-5">
      <Card className="w-[45vw]">
        <Title>Humidity Levels</Title>
        <AreaChart
          className="mt-6"
          data={stats}
          index="time"
          categories={["Humidity (%)"]}
          colors={["teal"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}

export default HumidityChart;
