import React from 'react';
import { Home, BookOpen, ShoppingBag, Info, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAbout: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenAbout,
}) => {
  const { totalItems, openCart } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF5ED]/95 backdrop-blur-md border-t border-[#E5DAC8] px-3 py-2 shadow-lg">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home'
              ? 'text-[#2D1910] font-bold'
              : 'text-[#8A7160] hover:text-[#2D1910]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              activeTab === 'home' ? 'bg-[#EFE4D2] scale-110' : ''
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">الرئيسية</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'menu'
              ? 'text-[#2D1910] font-bold'
              : 'text-[#8A7160] hover:text-[#2D1910]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              activeTab === 'menu' ? 'bg-[#EFE4D2] scale-110' : ''
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">القائمة</span>
        </button>

        {/* Offers / Specials */}
        <button
          onClick={() => setActiveTab('bestsellers')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'bestsellers'
              ? 'text-[#2D1910] font-bold'
              : 'text-[#8A7160] hover:text-[#2D1910]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              activeTab === 'bestsellers' ? 'bg-[#EFE4D2] scale-110' : ''
            }`}
          >
            <Tag className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">المميز</span>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 text-[#8A7160] hover:text-[#2D1910] transition-colors"
        >
          <div className="relative p-1 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#BA8E48] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">السلة</span>
        </button>

        {/* Info */}
        <button
          onClick={onOpenAbout}
          className="flex flex-col items-center justify-center py-1 text-[#8A7160] hover:text-[#2D1910] transition-colors"
        >
          <div className="p-1 rounded-xl">
            <Info className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">معلومات</span>
        </button>
      </div>
    </div>
  );
};
