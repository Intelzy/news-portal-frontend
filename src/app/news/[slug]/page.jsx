import { getArticleBySlug, getAllArticles } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.summary };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) { notFound(); }
  
  // Format date for better display
  const publishedDate = new Date(article.publishedDate).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{article.title}</h1>
      <div className="flex items-center space-x-4 text-gray-500 mb-6">
        <span>By {article.author}</span>
        <span>•</span>
        <span>{publishedDate}</span>
      </div>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} priority/>
      </div>
      <div className="prose lg:prose-xl max-w-full">
        <p>{article.content}</p>
      </div>
    </article>
  );
}