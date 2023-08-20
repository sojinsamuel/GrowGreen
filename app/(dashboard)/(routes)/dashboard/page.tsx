import CalloutCard from "@/components/ui/CalloutCard";
import TempChart from "@/components/ui/TempChart";
import getClimateStats from "@/helper/getClimateStats";
import RainChart from "@/components/ui/RainChart";
import HumidityChart from "@/components/ui/HumidityChart";

export default async function Dashboard() {
  const { data, city } = await getClimateStats();
  // const user = useUser();
  // console.log();

  return (
    <div className="mb-8 space-y-4 ">
      <h2 className="text-2xl md:text-4xl text-bold text-center">
        Your Personalized Plant Growth Assistant
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Nurture Nature, Cultivate Life - Unleash the Green Thumb Within!
      </p>
      <CalloutCard location={city} />

      {/* Tremor Charts go here */}
      <TempChart data={data} />
      <RainChart data={data} />
      <HumidityChart data={data} />
    </div>
  );
}
