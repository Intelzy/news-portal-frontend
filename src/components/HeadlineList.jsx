// src/components/HeadlineList.jsx

import Link from 'next/link';

export default function HeadlineList({ articles = [], title }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-extrabold text-gray-800 border-b-2 pb-2 mb-4">
        {title}
      </h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-3 last:border-b-0">
            <Link href={`/news/${article.slug}`} className="group">
              <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {article.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}