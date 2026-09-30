import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(['nutella', 'kinder']);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const toggleSauce = (sauceId: string) => {
    setSelectedSauces((prev) => {
      if (prev.includes(sauceId)) {
        // keep at least one sauce selected if options required
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== sauceId);
      } else {
        return [...prev, sauceId];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      selectedSauces: product.availableSauces ? selectedSauces : undefined,
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 400);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF5ED] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#E5DAC8] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق تفاصيل المنتج"
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2D1910] shadow-sm transition-all focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Header - Matching Image 3 */}
        <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-[#FAF5ED] overflow-hidden flex items-center justify-center border-b border-[#E8DFC9]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5ED] via-transparent to-black/20" />
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-right">
          <div>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-black text-[#2D1910]">
                {product.name}
              </h2>
              {product.badge && (
                <span className="text-xs font-semibold py-1 px-2.5 rounded-full bg-[#EFE4D2] text-[#69482F]">
                  {product.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-[#735A49] mt-2 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-3 text-xl sm:text-2xl font-black text-[#2D1910] tabular-nums">
              {product.price.toLocaleString()} <span className="text-sm font-normal text-[#8A7160]">د.ع</span>
            </div>
          </div>

          {/* Sauces Selection - Exactly as in Image 3 */}
          {product.availableSauces && product.availableSauces.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#E8DFC9]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8A7160]">
                  (يمكنك اختيار أكثر من صوص)
                </span>
                <label className="text-sm sm:text-base font-bold text-[#2D1910] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#BA8E48]" />
                  اختر الصوص
                </label>
              </div>

              <div className="flex items-center justify-around gap-2 py-2 overflow-x-auto">
                {product.availableSauces.map((sauce) => {
                  const isSelected = selectedSauces.includes(sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => toggleSauce(sauce.id)}
                      className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-transform duration-200 shadow-sm flex items-center justify-center ${
                          isSelected
                            ? 'scale-110 ring-3 ring-[#351D12] ring-offset-2 ring-offset-[#FAF5ED]'
                            : 'opacity-85 hover:opacity-100 hover:scale-105 border-2 border-white/60'
                        }`}
                        style={{ backgroundColor: sauce.color }}
                      >
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-white/90 text-[#351D12] flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs transition-colors ${
                          isSelected
                            ? 'font-bold text-[#2D1910]'
                            : 'text-[#7D6656] group-hover:text-[#2D1910]'
                        }`}
                      >
                        {sauce.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: Quantity & Add Button - Matching Image 3 */}
        <div className="p-4 sm:p-5 bg-[#FAF5ED] border-t border-[#E5DAC8] flex items-center gap-3">
          {/* Quantity Stepper: dark brown box [-] [count] [+] */}
          <div className="flex items-center bg-[#351D12] rounded-xl text-white overflow-hidden shadow-xs h-12">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="إنقاص الكمية"
              className="px-3 h-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-base tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="زيادة الكمية"
              className="px-3 h-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-12 rounded-xl bg-[#BA8E48] hover:bg-[#A67C38] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>إضافة إلى السلة</span>
            <span className="text-white/80 text-xs font-normal">
              ({totalPrice.toLocaleString()} د.ع)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
