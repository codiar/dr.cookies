import React, { useState } from 'react';
import { products } from '../data/menu';
import { Product } from '../types';
import { Search, X, Cookie, ArrowLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.includes(query.trim()) ||
          p.description.includes(query.trim()) ||
          p.category.includes(query.trim())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-lg bg-[#FAF5ED] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DAC8] text-right flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 bg-[#F4ECE0] border-b border-[#E8DFC9] flex items-center gap-3">
          <button
            onClick={onClose}
            aria-label="إغلاق البحث"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#2D1910] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C715F]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن صنف، كوكيز، كيك..."
              className="w-full pr-10 pl-3 py-2 bg-white border border-[#DECBB4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-[#8C715F] space-y-2">
              <Cookie className="w-8 h-8 mx-auto text-[#BA8E48] opacity-60" />
              <p className="text-xs">اكتب اسم الصنف للبحث السريع في قائمة دكتور كوكيز</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-[#8C715F] space-y-2">
              <p className="text-sm font-bold text-[#2D1910]">لا توجد نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs">جرّب البحث بكلمة أخرى مثل: كوكيز، كلاسيك، كيك، محشي</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#EBE0CD] hover:border-[#BA8E48] hover:bg-[#F8F2E6] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-contain bg-[#FAF5ED] p-1 border border-[#EBE0CD]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#2D1910] group-hover:text-[#BA8E48] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#7C6353] line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-black text-xs text-[#2D1910] tabular-nums">
                    {product.price.toLocaleString()} د.ع
                  </span>
                  <ArrowLeft className="w-4 h-4 text-[#BA8E48] group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
