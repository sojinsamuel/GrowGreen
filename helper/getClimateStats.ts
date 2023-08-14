import getUserLocation from "./getUserLocation";

async function getClimateStats() {
  const {
    location: { latitude, longitude },
    city: { name: city },
  } = await getUserLocation();

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,windspeed_10m_max&timezone=auto`
  );

  const data = await res.json();

  return { data, city };
}

export default getClimateStats;
