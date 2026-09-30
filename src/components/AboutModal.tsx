import React from 'react';
import { businessInfo, logoImg } from '../data/menu';
import { X, Clock, MapPin, Instagram, Sparkles, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-md bg-[#FAF5ED] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DAC8] text-right flex flex-col">
        {/* Header with image */}
        <div className="p-6 bg-[#351D12] text-white flex flex-col items-center text-center relative">
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#BA8E48] mb-3 shadow-md bg-black">
            <img
              src={logoImg}
              alt={businessInfo.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-xl font-black">{businessInfo.name}</h3>
          <p className="text-xs text-[#DFCAA7] mt-1 font-medium">
            {businessInfo.slogan}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-[#5D4636]">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFC9] flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#BA8E48] shrink-0" />
            <div>
              <strong className="block text-sm text-[#2D1910]">المدينة والموقع</strong>
              <span>{businessInfo.address}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFC9] flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#BA8E48] shrink-0" />
            <div>
              <strong className="block text-sm text-[#2D1910]">أوقات العمل اليومية</strong>
              <span>{businessInfo.workingHours}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFC9] flex items-center gap-3">
            <Instagram className="w-5 h-5 text-[#BA8E48] shrink-0" />
            <div className="flex-1">
              <strong className="block text-sm text-[#2D1910]">استقبال الطلبات</strong>
              <span>عبر خاص إنستغرام: {businessInfo.instagramHandle}</span>
            </div>
            <a
              href={businessInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#BA8E48] text-white font-bold text-xs hover:bg-[#A67C38] transition-colors"
            >
              زيارة
            </a>
          </div>

          {/* Guarantee / Features */}
          <div className="p-4 rounded-2xl bg-[#F4ECE0] border border-[#DECBB4] space-y-2">
            <div className="font-bold text-sm text-[#2D1910] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#BA8E48]" />
              <span>مميزات دكتور كوكيز</span>
            </div>
            <ul className="space-y-1.5 text-[#5C4434]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>عجينة زبدة فاخرة ومكونات طازجة يومياً</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>شوكولاتة بلجيكية وحشوات ساخنة وذائبة</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>توصيل مجاني للطلبات فوق 20,000 د.ع في كربلاء</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4ECE0] border-t border-[#E8DFC9] text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#351D12] text-white font-bold text-sm hover:bg-[#4A291A] transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
