async function getUserLocation() {
  const res = await fetch(
    `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
  );

  const data = await res.json();
  // console.log(data);

  return data;
}

export default getUserLocation;
