import Link from "next/link";
import Image from "next/image";

export default function NewsCard({ article }) {
  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col">
        <div className="relative w-full h-48 overflow-hidden">
          <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300"/>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-sm font-semibold text-blue-600 mb-1">{article.category}</span>
          <h2 className="text-xl font-bold mb-2 leading-tight flex-grow group-hover:text-blue-700 transition-colors">{article.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
          <div className="mt-auto">
            <span className="text-blue-600 font-bold group-hover:underline">Read More &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
}