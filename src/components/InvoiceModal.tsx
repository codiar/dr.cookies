import React, { useState } from 'react';
import { businessInfo } from '../data/menu';
import { CustomerOrderInfo } from '../types';
import { Check, Copy, Instagram, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceText: string;
  orderId: string;
  customer: CustomerOrderInfo | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  invoiceText,
  orderId,
  customer,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invoiceText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = invoiceText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenInstagram = () => {
    window.open(businessInfo.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF5ED] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DAC8] text-right my-6 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#351D12] text-white flex items-center justify-between">
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-[#BA8E48] text-white px-2.5 py-0.5 rounded-full">
              {orderId}
            </span>
            <div className="font-bold text-base sm:text-lg flex items-center gap-1.5">
              <span>فاتورة الطلب</span>
              <Sparkles className="w-4 h-4 text-[#DFCAA7]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Success Banner */}
          <div className="p-4 rounded-2xl bg-[#E8F3E5] border border-[#BFDFB7] flex items-start gap-3 text-emerald-900">
            <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">تم إنشاء فاتورتك بنجاح!</h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                وفقاً لتعليمات المتجر، يتم تأكيد الطلبات عبر خاص الإنستغرام. انسخ الفاتورة بالزر أدناه وأرسلها لصفحة دكتور كوكيز.
              </p>
            </div>
          </div>

          {/* Customer Summary Card */}
          {customer && (
            <div className="bg-[#FFFDF9] border border-[#E8DFC9] rounded-2xl p-4 text-xs space-y-1 text-[#694E3D]">
              <div className="flex justify-between">
                <span>اسم العميل:</span>
                <span className="font-bold text-[#2D1910]">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span>رقم الهاتف:</span>
                <span className="font-mono text-[#2D1910] font-bold" dir="ltr">
                  {customer.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span>العنوان:</span>
                <span className="font-medium text-[#2D1910]">{customer.address}</span>
              </div>
            </div>
          )}

          {/* Formatted Invoice Preview Container */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#452D1E] block">
              نص الفاتورة للنسخ:
            </label>
            <pre className="w-full max-h-56 overflow-y-auto bg-[#26150C] text-[#F3E7D7] p-4 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap select-all border border-[#442819] shadow-inner text-right" dir="rtl">
              {invoiceText}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleCopy}
              className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                copied
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#FAF0E1] text-[#351D12] border-2 border-[#BA8E48] hover:bg-[#F3E5CF]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم نسخ الفاتورة!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#BA8E48]" />
                  <span>نسخ الفاتورة كاملة</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenInstagram}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#BA8E48] to-[#986F2C] hover:from-[#A87E38] hover:to-[#866024] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>فتح إنستغرام دكتور كوكيز</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-[#8C7362]">
              رابط الحساب:{' '}
              <a
                href={businessInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-[#BA8E48] hover:text-[#2D1910]"
              >
                {businessInfo.instagramHandle}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
