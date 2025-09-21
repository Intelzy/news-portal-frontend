import Link from "next/link";
import Image from "next/image";

export default function CategorySection({
  title,
  articles = [],
  categorySlug,
  accentColor = "border-blue-600",
}) {
  if (articles.length === 0) return null;

  const featured = articles[0];
  const others = articles.slice(1, 4); // Get the next 3

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-2xl font-extrabold text-gray-800 border-b-4 ${accentColor} pb-2`}
        >
          {title}
        </h2>
        <Link
          href={`/${categorySlug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured article in category */}
        <Link href={`/news/${featured.slug}`} className="block group">
          <div className="relative w-full h-56 rounded-lg overflow-hidden mb-2">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {featured.title}
          </h3>
          <p className="text-gray-600 mt-1 text-sm">{featured.summary}</p>
        </Link>

        {/* List of other articles in category */}
        <div className="space-y-4">
          {others.map((article) => (
            <Link
              href={`/news/${article.slug}`}
              key={article.slug}
              className="block group"
            >
              <div className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
                <div className="relative w-28 h-20 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
