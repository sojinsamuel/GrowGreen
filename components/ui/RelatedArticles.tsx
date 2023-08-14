//@ts-ignore
function ArticleCard({ title, url, description }) {
  const truncateDescription = (desc: any) => {
    const maxLength = 100;
    return desc.length > maxLength ? desc.slice(0, maxLength) + "..." : desc;
  };

  return (
    <div className="p-4 bg-white rounded hover:shadow-lg transition duration-200 ease-in-out">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 font-semibold text-xl mb-2"
      >
        {title}
      </a>
      <p className="text-gray-700 mb-4">{truncateDescription(description)}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold hover:text-blue-800"
      >
        Read More
      </a>
    </div>
  );
}

function RelatedArticles({ relatedArticles }: any) {
  return (
    <>
      <h3 className="text-lg font-extrabold my-5">Related Articles</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedArticles.map((article: any) => (
          <ArticleCard
            key={article.pos}
            title={article.title}
            url={article.url}
            description={article.desc}
          />
        ))}
      </div>
    </>
  );
}

export default RelatedArticles;
