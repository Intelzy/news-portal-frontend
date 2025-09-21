import { getAllArticles, getArticlesByCategory } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import AdBanner from "@/components/AdBanner";

export default function HomePage() {
  const allArticles = getAllArticles();
  
  if (!allArticles || allArticles.length === 0) {
    return <p className="text-center text-lg">No articles available.</p>;
  }

  // Data for the Hero Section
  const heroArticle = allArticles[0];
  const sideHeadlines = allArticles.slice(1, 4); // Get 3 headlines for the right side
  
  // Data for Category Sections
  const worldNewsArticles = getArticlesByCategory('World News');
  const economyArticles = getArticlesByCategory('Economy');
  const techArticles = getArticlesByCategory('Technology');
  const sportsArticles = getArticlesByCategory('Sports');

  return (
    <div className="space-y-8">
      {/* The new hero section */}
      <HeroSection mainArticle={heroArticle} sideArticles={sideHeadlines} />
      
      {/* A large ad banner */}
      <section className="text-center">
        <div className="bg-gray-200 w-full min-h-[90px] flex items-center justify-center rounded-lg">
           <AdBanner 
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="YOUR_HOMEPAGE_LEADERBOARD_ID"
            />
            <span className="text-gray-500 text-sm">Advertisement (728x90)</span>
        </div>
      </section>

      {/* The new category sections */}
      <CategorySection title="World News" articles={worldNewsArticles} categorySlug="world-news" accentColor="border-gray-500" />
      <CategorySection title="Economy" articles={economyArticles} categorySlug="economy" accentColor="border-blue-600" />
      <CategorySection title="Technology" articles={techArticles} categorySlug="technology" accentColor="border-purple-600" />
      <CategorySection title="Sports" articles={sportsArticles} categorySlug="sports" accentColor="border-green-600" />
    </div>
  );
}