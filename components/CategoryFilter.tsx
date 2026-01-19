import { useState } from 'react';
import { GameCategory } from '@/types/casino';

interface CategoryFilterProps {
  selectedCategory: GameCategory | 'All' | null;
  onCategoryChange: (category: GameCategory | 'All' | null) => void;
}

const categories: (GameCategory | 'All')[] = ['All', 'Crash', 'Roulette', 'Slots'];

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category === 'All' ? null : category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;