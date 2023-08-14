export const fetchHostUrl = (route: string) =>
  `${
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_URL
      : "http://localhost:3000"
  }/${route}`;
