/* eslint-disable @next/next/no-img-element */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import fetchNews from "@/helper/fetchNews";
import { Terminal } from "lucide-react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

async function News() {
  const { data } = await fetchNews("plant gardening");

  return (
    <>
      <div className="mx-auto w-[35vw] pt-10 ">
        <Alert className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            News are fetched Using{" "}
            <a
              href="https://mediastack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline "
            >
              MediaStack
            </a>{" "}
            API with the Keyword <strong>Plants</strong>. if it shows irrelavant
            data, i have no control on it.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-4">
        {data.map((article) => (
          <article
            key={article.url}
            className="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg shadow-sm hover:scale-105 hover:shadow-lg hover:bg-slate-200 transition-all duration-200 ease-out"
          >
            {article.image && (
              <img
                alt={article.title}
                src={`${article.image}`}
                width={200}
                height={200}
                className="h-56 w-full object-cover rounded-t-lg shadow-md"
              />
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col p-5">
                <h2 className="font-bold font-serif">{article.title}</h2>
                <section className="mt-2 flex-1">
                  <p className="line-clamp-3">{article.description}</p>
                </section>
                <footer>
                  <p>{article.source}</p>
                  <p>{formatDate(article.published_at)}</p>
                </footer>
              </div>
              <a
                href={article.url}
                target="_blank"
                className="text-white text-center p-4 bg-gradient-to-r from-gray-700 via-gray-900 to-black"
              >
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default News;
