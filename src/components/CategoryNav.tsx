import React from 'react';
import { Search } from 'lucide-react';
import { categories } from '../data/menu';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Tabs - Matching Image 2 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#351D12] text-white shadow-sm ring-1 ring-[#351D12]'
                  : 'bg-[#F3ECE0] text-[#553C2C] hover:bg-[#EAE0D1] border border-[#E3D7C3]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Search Input Bar - Matching Image 2 */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#745847]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث عن صنف..."
          className="w-full pr-12 pl-4 py-3 bg-[#FAF5ED] border-2 border-[#5C3925] rounded-xl text-[#2D1910] placeholder-[#8C7262] text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48] transition-all font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-[#8C7262] hover:text-[#2D1910]"
          >
            مسح
          </button>
        )}
      </div>
    </div>
  );
};
