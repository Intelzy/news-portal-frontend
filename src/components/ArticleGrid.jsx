import NewsCard from "./NewsCard";

export default function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700">No Articles Found</h2>
        <p className="text-gray-500 mt-2">Please try another category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <NewsCard key={article.slug} article={article} />
      ))}
    </div>
  );
}