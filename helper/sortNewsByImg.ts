//@ts-ignore

export default function sortNewsByImg(news) {
  const newsWithImage = news.data.filter(
    (article: any) => article.image !== null
  );

  const newsWithoutImage = news.data.filter(
    (article: any) => article.image === null
  );

  const sortedNews = {
    pagination: news.pagination,
    data: [...newsWithImage, ...newsWithoutImage],
  };

  return sortedNews;
}
