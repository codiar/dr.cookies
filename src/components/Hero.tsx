import React from 'react';
import { ArrowLeft, Cookie, Sparkles, Flame, Cake, CupSoda } from 'lucide-react';
import darkLavaImg from '../assets/images/dr_cookies_dark_lava_1790738142354.jpg';

interface HeroProps {
  onOrderNow: () => void;
  onSelectCategory: (catId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onSelectCategory }) => {
  return (
    <div className="pt-4 pb-6 px-4 max-w-6xl mx-auto">
      {/* Main Hero Card - Identical to Reference Image 1 */}
      <div className="relative overflow-hidden rounded-3xl bg-[#F4ECE0] border border-[#E4D8C4] p-6 sm:p-10 shadow-sm flex flex-col items-center text-center">
        {/* Decorative subtle ambient lights */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#BA8E48]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#7B4628]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-[#2D1910] tracking-tight mb-2 sm:mb-4">
          لقمة من السعادة
        </h2>
        <p className="text-sm sm:text-base text-[#6E5544] max-w-md mb-6 leading-relaxed">
          كوكيز طازج مخبوز بحب يومياً في كربلاء، شوكولاتة بلجيكية فاخرة وحشوات غنية تذوب في فمك
        </p>

        {/* Hero Product Visual */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 my-2 transition-transform duration-500 hover:scale-105">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2D1910]/5 to-[#2D1910]/15 blur-xl transform scale-90 translate-y-4" />
          <img
            src={darkLavaImg}
            alt="كوكيز دارك محشي - دكتور كوكيز"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain drop-shadow-2xl relative z-10"
          />
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={onOrderNow}
          className="mt-4 w-full max-w-xs sm:max-w-sm py-3.5 px-8 rounded-xl bg-[#BA8E48] hover:bg-[#A67C38] active:scale-95 text-white font-bold text-base sm:text-lg shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>اطلب الآن</span>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Visual Category Quick-Nav Buttons - Matching Image 1 */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mt-6">
        <button
          onClick={() => onSelectCategory('stuffed')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E6DAC6] hover:border-[#BA8E48] hover:bg-[#F8F2E8] shadow-2xs transition-all text-[#2D1910] group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F6EFE3] flex items-center justify-center mb-2 group-hover:bg-[#BA8E48]/15 transition-colors">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#BA8E48]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-center leading-tight">
            كوكيز محشوة
          </span>
        </button>

        <button
          onClick={() => onSelectCategory('mix')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E6DAC6] hover:border-[#BA8E48] hover:bg-[#F8F2E8] shadow-2xs transition-all text-[#2D1910] group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F6EFE3] flex items-center justify-center mb-2 group-hover:bg-[#BA8E48]/15 transition-colors">
            <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-[#BA8E48]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-center leading-tight">
            قوالب كوكيز
          </span>
        </button>

        <button
          onClick={() => onSelectCategory('cake')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E6DAC6] hover:border-[#BA8E48] hover:bg-[#F8F2E8] shadow-2xs transition-all text-[#2D1910] group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F6EFE3] flex items-center justify-center mb-2 group-hover:bg-[#BA8E48]/15 transition-colors">
            <Cake className="w-5 h-5 sm:w-6 sm:h-6 text-[#BA8E48]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-center leading-tight">
            كعكات
          </span>
        </button>

        <button
          onClick={() => onSelectCategory('classic')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E6DAC6] hover:border-[#BA8E48] hover:bg-[#F8F2E8] shadow-2xs transition-all text-[#2D1910] group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F6EFE3] flex items-center justify-center mb-2 group-hover:bg-[#BA8E48]/15 transition-colors">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#BA8E48]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-center leading-tight">
            كلاسيك
          </span>
        </button>
      </div>
    </div>
  );
};
