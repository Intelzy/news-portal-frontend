import Link from 'next/link';
import { getAllArticles } from '@/lib/data';
import AdBanner from './AdBanner';

export default function Sidebar() {
  const latestArticles = getAllArticles().slice(0, 5);

  return (
    <aside className="space-y-8 sticky top-28">
      {/* Ad Slot 1 */}
      <div className="bg-gray-50 border h-64 flex items-center justify-center rounded-lg text-gray-400 text-sm">
        {/* <AdBanner data-ad-slot="YOUR_SIDEBAR_AD_SLOT_1" ... /> */}
        Ad Space
      </div>

      {/* Latest Posts Widget */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-extrabold text-xl border-b-2 pb-2 mb-4 text-gray-900">Most Popular</h3>
        <ul className="space-y-4">
          {latestArticles.map((article, index) => (
            <li key={article.slug} className="flex items-start space-x-3">
              <span className="font-bold text-2xl text-gray-300">{index + 1}</span>
              <Link href={`/news/${article.slug}`} className="font-semibold text-gray-800 hover:text-blue-600 transition-colors leading-tight">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

       {/* Ad Slot 2 */}
       <div className="bg-gray-50 border h-64 flex items-center justify-center rounded-lg text-gray-400 text-sm">
        {/* <AdBanner data-ad-slot="YOUR_SIDEBAR_AD_SLOT_2" ... /> */}
        Ad Space
      </div>
    </aside>
  );
}