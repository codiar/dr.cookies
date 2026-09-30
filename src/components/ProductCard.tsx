import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  compactButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  compactButton = false,
}) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.hasOptions) {
      onOpenDetails(product);
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col justify-between bg-[#FFFDF9] border border-[#E8DFC9] hover:border-[#BA8E48] rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Optional Badge */}
      {product.badge && (
        <span className="absolute top-3 right-3 z-10 text-[10px] sm:text-[11px] font-bold py-0.5 px-2 rounded-md bg-[#F2E8D7] text-[#69482F] border border-[#DFCBB5]">
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF5ED] mb-3 flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform duration-300">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between text-right">
        <div>
          <h3 className="font-bold text-[#2D1910] text-sm sm:text-base leading-snug group-hover:text-[#BA8E48] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#7B6353] mt-1 line-clamp-2 leading-relaxed min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* Price and Action Button */}
        <div className="mt-3 pt-2 border-t border-[#F0E6D6] flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#8E7666]">السعر:</span>
            <div className="font-black text-sm sm:text-base text-[#2D1910] tracking-tight tabular-nums">
              {product.price.toLocaleString()} <span className="text-xs font-normal">د.ع</span>
            </div>
          </div>

          <button
            onClick={handleAction}
            aria-label={`إضافة ${product.name} إلى السلة`}
            className={`w-full py-2 sm:py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#BA8E48] hover:bg-[#A67C38] active:scale-95 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>تمت الإضافة</span>
              </>
            ) : product.hasOptions ? (
              <span>اختر النكهة والخيارات</span>
            ) : compactButton ? (
              <>
                <Plus className="w-4 h-4" />
                <span>أضف</span>
              </>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
