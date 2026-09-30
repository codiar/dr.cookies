import React from 'react';
import { businessInfo, logoImg } from '../data/menu';
import { Instagram, MapPin, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#26150C] text-[#E0D2C3] border-t border-[#3E2416] mt-16 pb-24 md:pb-12 pt-12 text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#3D2619]">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#5C3B26] bg-black shrink-0">
                <img
                  src={logoImg}
                  alt={businessInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5EBE1]">
                  {businessInfo.name}
                </h3>
                <p className="text-xs text-[#BA8E48] font-medium">
                  {businessInfo.slogan}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#AB9786] leading-relaxed max-w-sm">
              نقدم لكم ألذ كوكيز طازج وحلويات فاخرة مخبوزة بأجود أنواع الزبدة والشوكولاتة البلجيكية داخل كربلاء.
            </p>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F5EBE1] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#BA8E48]" />
              <span>معلومات الفرع</span>
            </h4>
            <div className="space-y-2 text-xs text-[#BFADA0]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#BA8E48] shrink-0" />
                <span>الموقع: {businessInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#BA8E48] shrink-0" />
                <span>أوقات العمل: {businessInfo.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Ordering & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F5EBE1]">
              الطلبات والتواصل
            </h4>
            <p className="text-xs text-[#AB9786]">
              يتم استقبال الطلبات وتأكيد الفواتير مباشرة عبر حسابنا الرسمي على إنستغرام:
            </p>
            <a
              href={businessInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#3E2416] hover:bg-[#52301D] text-[#F3E7D8] text-xs font-semibold border border-[#5A3824] transition-all hover:scale-[1.02]"
            >
              <Instagram className="w-4 h-4 text-[#BA8E48]" />
              <span>{businessInfo.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits & Codiar Tech Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C7665]">
          <div>
            © {new Date().getFullYear()} {businessInfo.name}. جميع الحقوق محفوظة.
          </div>

          {/* Section 23 - CODIAR TECH Credit */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#A69180]">
            <span>تم تطوير الموقع من قبل</span>
            <a
              href="https://www.instagram.com/codiar_tech/" target="_blank" rel="noopener noreferrer"
              className="text-[#DFCAA7] hover:text-white font-bold transition-colors underline decoration-[#BA8E48]/50 underline-offset-4"
              title="شركة كوديار تك لتطوير البرمجيات وتصميم المواقع"
            >
              شركة كوديار تك
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
