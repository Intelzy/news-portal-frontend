import { getArticlesByCategory, getCategories } from "@/lib/data";
import ArticleGrid from "@/components/ArticleGrid";
import { notFound } from 'next/navigation';

// Fix: Create URL-friendly slugs for categories
export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/ /g, '-'),
  }));
}

export async function generateMetadata({ params }) {
  const categorySlug = params.category;
  const categories = getCategories();
  const originalCategory = categories.find(c => c.toLowerCase().replace(/ /g, '-') === categorySlug);
  
  if (!originalCategory) return { title: "Category Not Found" };
  
  return {
    title: `${originalCategory} News`,
    description: `The latest news and articles in the ${originalCategory} category.`,
  };
}

export default function CategoryPage({ params }) {
  const categorySlug = params.category;
  const categories = getCategories();
  
  // Fix: Convert the slug from the URL back to the original category name to find articles
  const originalCategory = categories.find(c => c.toLowerCase().replace(/ /g, '-') === categorySlug);

  if (!originalCategory) {
      notFound();
  }
  
  const filteredArticles = getArticlesByCategory(originalCategory);

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 border-b pb-4">
        {originalCategory}
      </h1>
      <ArticleGrid articles={filteredArticles} />
    </section>
  );
}