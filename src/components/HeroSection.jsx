import Link from "next/link";
import Image from "next/image";

export default function HeroSection({ mainArticle, sideArticles = [] }) {
  if (!mainArticle) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Story (Left, takes 2/3 space) */}
      <div className="lg:col-span-2">
        <Link
          href={`/news/${mainArticle.slug}`}
          className="block group relative w-full h-full min-h-[450px] rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src={mainArticle.image}
            alt={mainArticle.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            className="group-hover:scale-105 transition-transform duration-300"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="text-sm font-semibold bg-blue-600 px-3 py-1 rounded-full">
              {mainArticle.category}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight group-hover:underline">
              {mainArticle.title}
            </h1>
            {/* --- NEW: Added summary to the overlay --- */}
            <p className="mt-2 text-gray-200 hidden md:block">
              {mainArticle.summary}
            </p>
          </div>
        </Link>
      </div>

      {/* Side Stories (Right, takes 1/3 space) */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-extrabold text-gray-900 border-b-2 pb-2 mb-4">
          Trending
        </h2>
        <div className="space-y-4">
          {sideArticles.map((article) => (
            <Link
              href={`/news/${article.slug}`}
              key={article.slug}
              className="block group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
