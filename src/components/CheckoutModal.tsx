import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { businessInfo } from '../data/menu';
import { CustomerOrderInfo } from '../types';
import { X, Send, AlertCircle, MapPin, User, Phone, FileText } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderConfirmed: (invoiceText: string, orderId: string, customer: CustomerOrderInfo) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderConfirmed,
}) => {
  const { items, totalAmount, isFreeDelivery } = useCart();

  const [form, setForm] = useState<CustomerOrderInfo>({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    notes: '',
  });

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError('يرجى إدخال اسم العميل');
      return;
    }
    if (!form.phone.trim()) {
      setError('يرجى إدخال رقم الهاتف للتواصل');
      return;
    }
    if (!form.address.trim()) {
      setError('يرجى تحديد العنوان في كربلاء');
      return;
    }

    // Generate unique order ID
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const year = new Date().getFullYear();
    const orderId = `ORD-${year}-${randomSuffix}`;

    // Generate structured invoice message exactly as specified in guidelines
    const itemsListText = items
      .map((item) => {
        const sauces = item.selectedSauces && item.selectedSauces.length > 0
          ? ` (${item.selectedSauces.join(', ')})`
          : '';
        return `• ${item.name}${sauces} × ${item.quantity}\n  السعر: ${(item.price * item.quantity).toLocaleString()} د.ع`;
      })
      .join('\n\n');

    const deliveryNote = isFreeDelivery ? 'توصيل مجاني 🎉' : 'حسب منطقة التوصيل';

    const invoiceText = `━━━━━━━━━━━━━━━━
طلب جديد من ${businessInfo.name}
رقم الطلب: ${orderId}
━━━━━━━━━━━━━━━━

العميل:
${form.name.trim()}

الهاتف:
${form.phone.trim()}

العنوان:
${form.address.trim()}

أقرب نقطة دالة:
${form.landmark.trim() || 'غير محدد'}

الطلب:

${itemsListText}

━━━━━━━━━━━━━━━━
مجموع المنتجات: ${totalAmount.toLocaleString()} د.ع
التوصيل: ${deliveryNote}
المجموع: ${totalAmount.toLocaleString()} د.ع
━━━━━━━━━━━━━━━━

ملاحظات:
${form.notes.trim() || 'لا توجد ملاحظات خاصة'}`;

    onOrderConfirmed(invoiceText, orderId, form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF5ED] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DAC8] text-right my-8">
        {/* Header */}
        <div className="p-5 bg-[#F4ECE0] border-b border-[#E8DFC9] flex items-center justify-between">
          <button
            onClick={onClose}
            aria-label="إلغاء"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#2D1910] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-lg text-[#2D1910]">بيانات استلام الطلب</h3>
            <p className="text-xs text-[#7B6353]">التوصيل متوفر لكافة مناطق كربلاء</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#422C1D] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#BA8E48]" />
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: علي الكربلائي"
              className="w-full px-3.5 py-2.5 bg-white border border-[#DFCBB5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422C1D] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#BA8E48]" />
              رقم الهاتف للتواصل <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              dir="ltr"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="07XXXXXXXXX"
              className="w-full px-3.5 py-2.5 bg-white border border-[#DFCBB5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48] transition-all text-right"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422C1D] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#BA8E48]" />
              العنوان والمنطقة في كربلاء <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="مثال: كربلاء - حي الإسكان / شارع..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#DFCBB5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422C1D] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#BA8E48]" />
              أقرب نقطة دالة (معلم مميز)
            </label>
            <input
              type="text"
              value={form.landmark}
              onChange={(e) => setForm({ ...form, landmark: e.target.value })}
              placeholder="مثال: قرب صيدلية... أو جامع..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#DFCBB5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#422C1D] mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#BA8E48]" />
              ملاحظات إضافية على الطلب
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="مثال: الكوكيز ساخن، بدون لمس، تغليف هدية..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#DFCBB5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BA8E48] transition-all"
            />
          </div>

          {/* Order Summary Snapshot */}
          <div className="bg-[#F2E8D7] rounded-xl p-3 text-xs text-[#5C4230] space-y-1">
            <div className="flex justify-between font-medium">
              <span>عدد الأصناف:</span>
              <span className="font-bold text-[#2D1910]">{items.length} أصناف</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#2D1910] pt-1 border-t border-[#DFCBB5]">
              <span>المجموع:</span>
              <span className="tabular-nums">{totalAmount.toLocaleString()} د.ع</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#BA8E48] hover:bg-[#A67C38] active:scale-[0.99] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>توليد الفاتورة ومتابعة الطلب عبر إنستغرام</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
