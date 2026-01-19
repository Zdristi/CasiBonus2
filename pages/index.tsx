import Link from 'next/link';
import { Casino, GameCategory } from '@/types/casino';
import { mockCasinos } from '@/data/casinos';
import ThemeToggle from '@/components/ThemeToggle';
import CategoryFilter from '@/components/CategoryFilter';
import { useState } from 'react';

// Типизированный интерфейс для казино
interface CasinoCardProps {
  casino: Casino;
}

// Компонент карточки казино
const CasinoCard = ({ casino }: CasinoCardProps) => {
  return (
    <Link href={`/casino/${casino.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{casino.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{casino.description}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-700 dark:text-gray-300">{casino.rating}</span>
              <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">{casino.bonuses.length} бонусов</span>
            </div>

            {/* Отображение категорий */}
            {casino.categories && casino.categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1 justify-center sm:justify-start">
                {casino.categories.slice(0, 3).map((category, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-100"
                  >
                    {category}
                  </span>
                ))}
                {casino.categories.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full dark:bg-gray-700 dark:text-gray-100">
                    +{casino.categories.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Главная страница со списком казино
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);

  // Фильтрация казино по выбранной категории
  const filteredCasinos = selectedCategory
    ? mockCasinos.filter(casino =>
        casino.categories && casino.categories.includes(selectedCategory)
      )
    : mockCasinos;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Онлайн Казино с Промокодами</h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Лучшие лицензированные онлайн казино с эксклюзивными бонусами и промокодами
          </p>
        </header>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />

        {filteredCasinos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCasinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              К сожалению, не найдено казино с категорией "{selectedCategory}"
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Показать все казино
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
