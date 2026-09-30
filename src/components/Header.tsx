import React from 'react';
import { ShoppingBag, Search, Clock, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { businessInfo, logoImg } from '../data/menu';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAbout,
}) => {
  const { totalItems, openCart } = useCart();
  const currentHour = new Date().getHours();
  const isOpenNow =
    currentHour >= businessInfo.openingHour &&
    currentHour < businessInfo.closingHour;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF5ED]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left side (in RTL: Cart & Search triggers on mobile, or actions) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openCart}
            aria-label="سلة التسوق"
            className="relative p-2.5 sm:p-3 rounded-full bg-[#F3ECE0] hover:bg-[#EADDC9] text-[#2D1910] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BA8E48]"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5 text-[#2D1910]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#BA8E48] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="بحث في المنيو"
            className="p-2.5 sm:p-3 rounded-full bg-[#F3ECE0] hover:bg-[#EADDC9] text-[#2D1910] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BA8E48]"
          >
            <Search className="w-5 h-5 text-[#2D1910]" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A3224]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors pb-1 border-b-2 ${
              activeTab === 'home'
                ? 'border-[#BA8E48] text-[#2D1910] font-bold'
                : 'border-transparent hover:text-[#2D1910]'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`transition-colors pb-1 border-b-2 ${
              activeTab === 'menu'
                ? 'border-[#BA8E48] text-[#2D1910] font-bold'
                : 'border-transparent hover:text-[#2D1910]'
            }`}
          >
            القائمة
          </button>
          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`transition-colors pb-1 border-b-2 ${
              activeTab === 'bestsellers'
                ? 'border-[#BA8E48] text-[#2D1910] font-bold'
                : 'border-transparent hover:text-[#2D1910]'
            }`}
          >
            الأكثر مبيعًا
          </button>
          <button
            onClick={onOpenAbout}
            className="border-transparent border-b-2 hover:text-[#2D1910] transition-colors pb-1"
          >
            معلومات المتجر
          </button>
        </nav>

        {/* Right side: Brand Identity with Logo and Name */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="text-right">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#2D1910] group-hover:text-[#BA8E48] transition-colors">
              {businessInfo.name}
            </h1>
            <p className="text-[11px] sm:text-xs text-[#7A6150] font-normal hidden xs:block">
              {businessInfo.city} · {businessInfo.slogan}
            </p>
          </div>

          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#D8C7B0] shadow-sm bg-[#1A110C] flex items-center justify-center shrink-0">
            <img
              src={logoImg}
              alt={businessInfo.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback styling
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[#DFCAA7] font-bold text-xs pointer-events-none">
              DR
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Store Status Bar for all devices */}
      <div className="bg-[#F2E8D7] border-t border-[#E5D7C2]/70 text-[11px] sm:text-xs text-[#5C4535] py-1 px-4 text-center flex items-center justify-center gap-3 font-medium">
        <span className={`inline-flex items-center gap-1.5 ${isOpenNow ? 'text-emerald-800' : 'text-red-800'}`}>
          <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-600 animate-pulse' : 'bg-red-600'}`}></span>
          {isOpenNow ? 'مفتوح الآن' : 'مغلق الآن'}
        </span>
        <span className="text-[#A8937F]">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#7A6150]" />
          أوقات العمل: {businessInfo.workingHours}
        </span>
        <span className="hidden sm:inline text-[#A8937F]">·</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[#BA8E48] font-semibold">
          <Sparkles className="w-3 h-3" />
          توصيل سريع داخل كربلاء
        </span>
      </div>
    </header>
  );
};
