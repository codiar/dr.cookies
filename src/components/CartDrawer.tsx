import React from 'react';
import { useCart } from '../context/CartContext';
import { businessInfo } from '../data/menu';
import { X, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalAmount,
    totalItems,
    freeDeliveryRemaining,
    isFreeDelivery,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Container (RTL: Slide in from the left or right) */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF5ED] border-r border-[#E5DAC8] shadow-2xl flex flex-col text-right">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DFC9] flex items-center justify-between bg-[#F4ECE0]">
            <button
              onClick={closeCart}
              aria-label="إغلاق السلة"
              className="p-2 rounded-full hover:bg-black/5 text-[#2D1910] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 font-bold text-lg text-[#2D1910]">
              <ShoppingBag className="w-5 h-5 text-[#BA8E48]" />
              <span>سلة المشتريات ({totalItems})</span>
            </div>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#FFFDF9] p-3 px-4 border-b border-[#E8DFC9] text-xs">
            {isFreeDelivery ? (
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>مبروك! لقد حصلت على توصيل مجاني داخل كربلاء 🎉</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-[#684C38] mb-1 font-medium">
                  <span>
                    أضف بقيمة{' '}
                    <strong className="text-[#2D1910] font-bold">
                      {freeDeliveryRemaining.toLocaleString()} د.ع
                    </strong>{' '}
                    للحصول على توصيل مجاني
                  </span>
                  <span>{businessInfo.freeDeliveryThreshold.toLocaleString()} د.ع</span>
                </div>
                <div className="w-full h-2 bg-[#EADEC9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#BA8E48] transition-all duration-300 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalAmount / businessInfo.freeDeliveryThreshold) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8A7160]">
                <div className="w-20 h-20 rounded-full bg-[#F3ECE0] flex items-center justify-center mb-4 text-[#BA8E48]">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-lg text-[#2D1910] mb-1">
                  السلة فارغة حالياً
                </h3>
                <p className="text-xs max-w-xs mb-6 text-[#7B6353]">
                  استكشف كوكيز دكتور كوكيز الفاخرة وأضف ما يحلو لك من السعادة
                </p>
                <button
                  onClick={closeCart}
                  className="py-2.5 px-6 rounded-xl bg-[#BA8E48] text-white font-bold text-sm hover:bg-[#A67C38] transition-colors"
                >
                  تصفح المنيو
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF9] border border-[#E8DFC9] rounded-2xl p-3 flex items-center gap-3 shadow-2xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-contain bg-[#FAF5ED] p-1 border border-[#F0E6D6] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-[#2D1910] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="حذف المنتج"
                        className="text-[#A8937F] hover:text-red-700 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.selectedSauces && item.selectedSauces.length > 0 && (
                      <p className="text-[11px] text-[#8C7262] mt-0.5">
                        الصوصات: {item.selectedSauces.join(' + ')}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-[#2D1910] tabular-nums">
                        {(item.price * item.quantity).toLocaleString()} د.ع
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#F4ECE0] rounded-lg border border-[#E5DAC8] text-[#2D1910]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#EAE0D1] rounded-r-lg transition-colors"
                          aria-label="إنقاص"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#EAE0D1] rounded-l-lg transition-colors"
                          aria-label="زيادة"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#F4ECE0] border-t border-[#E5DAC8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6A4F3E]">
                <div className="flex justify-between">
                  <span>مجموع المنتجات:</span>
                  <span className="font-bold text-[#2D1910] tabular-nums">
                    {totalAmount.toLocaleString()} د.ع
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>التوصيل (داخل كربلاء):</span>
                  <span className="font-bold text-[#2D1910]">
                    {isFreeDelivery ? (
                      <span className="text-emerald-700">مجاني 🎉</span>
                    ) : (
                      'حسب المنطقة عند التأكيد'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#2D1910] pt-2 border-t border-[#DECBB4]">
                  <span>المجموع النهائي:</span>
                  <span className="tabular-nums">
                    {totalAmount.toLocaleString()} د.ع
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#BA8E48] hover:bg-[#A67C38] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>متابعة إتمام الطلب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
