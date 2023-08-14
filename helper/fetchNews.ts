import { gql } from "graphql-request";
import sortNewsByImg from "./sortNewsByImg";

const fetchNews = async (keywords: string) => {
  const query = gql`
    query MyQuery($access_key: String!, $keywords: String) {
      myQuery(
        access_key: $access_key
        categories: ""
        countries: ""
        keywords: $keywords
        languages: "en"
        limit: "50"
        offset: ""
        sort: "published_desc"
      ) {
        data {
          author
          category
          country
          description
          language
          image
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  // fetch function with nextjs13 caching
  const response = await fetch(
    "https://hauppauge.stepzen.net/api/rousing-gibbon/__graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          keywords: keywords,
        },
      }),
    }
  );
  //   console.log("Loading new data from API", keywords);

  const newsResponse = await response.json();
  // Sort by images vs no images present
  console.log(newsResponse.data);

  const news = sortNewsByImg(newsResponse.data.myQuery);

  return news;
};

export default fetchNews;
