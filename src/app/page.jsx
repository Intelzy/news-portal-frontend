// src/app/page.jsx

import { getAllArticles } from "@/lib/data";
import ArticleGrid from "@/components/ArticleGrid";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const allArticles = getAllArticles();
  
  if (!allArticles || allArticles.length === 0) {
    return <p className="text-center text-lg">No articles available.</p>;
  }

  // 1. Split your articles into three distinct sections
  const topStory = allArticles[0];           // The very first article
  const latestNews = allArticles.slice(1, 5);  // The next 4 articles
  const moreNews = allArticles.slice(5);       // All the rest

  return (
    <div className="space-y-16">
      
      {/* --- TOP STORY SECTION --- */}
      {topStory && (
        <section>
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-4 border-blue-600 pb-2 mb-6">
            Top Story
          </h2>
          <Link href={`/news/${topStory.slug}`} className="block group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <Image 
                  src={topStory.image} 
                  alt={topStory.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority 
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-extrabold my-3 leading-tight group-hover:text-blue-700 transition-colors">{topStory.title}</h3>
                <p className="text-gray-600 text-lg mb-4">{topStory.summary}</p>
                <span className="text-blue-600 font-bold text-lg group-hover:underline">Read Full Story &rarr;</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* --- LATEST NEWS SECTION --- */}
      {latestNews.length > 0 && (
        <section>
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-4 border-red-600 pb-2 mb-6">
            Latest News
          </h2>
          <ArticleGrid articles={latestNews} />
        </section>
      )}

      {/* --- MORE NEWS SECTION --- */}
      {moreNews.length > 0 && (
        <section>
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-4 border-gray-400 pb-2 mb-6">
            More News
          </h2>
          <ArticleGrid articles={moreNews} />
        </section>
      )}

    </div>
  );
}