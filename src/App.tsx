/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { products, businessInfo } from './data/menu';
import { Product, CustomerOrderInfo } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';
import { Sparkles, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'bestsellers'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Invoice output state
  const [invoiceData, setInvoiceData] = useState<{
    text: string;
    orderId: string;
    customer: CustomerOrderInfo | null;
  } | null>(null);

  const { notification, openCart, clearCart } = useCart();

  // Filter products for the menu tab
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.includes(searchQuery.trim()) ||
      p.description.includes(searchQuery.trim());
    return matchesCategory && matchesSearch;
  });

  const bestSellerProducts = products.filter((p) => p.isBestSeller);

  const handleOrderConfirmed = (
    invoiceText: string,
    orderId: string,
    customer: CustomerOrderInfo
  ) => {
    setIsCheckoutOpen(false);
    clearCart();
    setInvoiceData({
      text: invoiceText,
      orderId,
      customer,
    });
  };

  const handleCategoryShortcut = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('menu');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF5ED] text-[#2D1910] flex flex-col selection:bg-[#BA8E48]/20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#351D12] text-[#FAF5ED] text-xs font-bold shadow-xl border border-[#5A3824] flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* VIEW 1: HOME PAGE (Matches Reference Image 1) */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Hero Section */}
            <Hero
              onOrderNow={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              onSelectCategory={handleCategoryShortcut}
            />

            {/* Section: الأكثر مبيعًا (Best Sellers - Matching Image 1) */}
            <section className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setActiveTab('menu')}
                  className="text-xs font-bold text-[#BA8E48] hover:text-[#916928] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>عرض الكل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <h3 className="text-xl sm:text-2xl font-black text-[#2D1910] flex items-center gap-2">
                  <span>الأكثر مبيعًا</span>
                  <Sparkles className="w-5 h-5 text-[#BA8E48]" />
                </h3>
              </div>

              {/* 2-Column Grid on Mobile, Expanding to 3-4 on Tablet/Desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {bestSellerProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Free Delivery Announcement Strip (Direct from Image 1) */}
            <div className="max-w-6xl mx-auto px-4">
              <div className="rounded-2xl bg-[#F2E8D7] border border-[#DECBB4] p-3.5 text-center text-xs sm:text-sm font-bold text-[#5C4434] shadow-2xs flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BA8E48]" />
                <span>التوصيل مجاني للطلبات فوق {businessInfo.freeDeliveryThreshold.toLocaleString()} د.ع في كربلاء</span>
              </div>
            </div>

            {/* Special Highlight: كيكة الكوكيز القلب */}
            {products.find((p) => p.id === 'prod-5') && (
              <section className="max-w-6xl mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5EDE1] to-[#EADECB] border border-[#DECBB4] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                  <div className="flex-1 text-right space-y-3">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#BA8E48]/20 text-[#69482F] text-xs font-bold">
                      <Heart className="w-3.5 h-3.5 text-[#BA8E48] fill-[#BA8E48]" />
                      مميز للمناسبات والجمعات
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#2D1910]">
                      كيكة الكوكيز القلب
                    </h3>
                    <p className="text-xs sm:text-sm text-[#735A49] leading-relaxed max-w-lg">
                      كيكة كوكيز طازجة على شكل قلب مغطاة بخطوط غنية من صوصات النوتيلا، اللوتس، الكندر، والبستاشيو الفاخر مع رقائق الشوكولاتة المقرمشة.
                    </p>
                    <div className="text-xl font-black text-[#2D1910]">
                      22,000 <span className="text-xs font-normal">د.ع</span>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedProduct(products.find((p) => p.id === 'prod-5')!)
                      }
                      className="py-2.5 px-6 rounded-xl bg-[#BA8E48] hover:bg-[#A67C38] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>تخصيص الصوص والطلب</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedProduct(products.find((p) => p.id === 'prod-5')!)
                    }
                    className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-white p-2 border border-[#DECBB4] shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0"
                  >
                    <img
                      src={products.find((p) => p.id === 'prod-5')!.image}
                      alt="كيكة الكوكيز القلب"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Quick Browse All Items */}
            <section className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setActiveTab('menu')}
                  className="text-xs font-bold text-[#BA8E48] hover:text-[#916928] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>استكشف كافة الأصناف</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <h3 className="text-xl sm:text-2xl font-black text-[#2D1910]">
                  باقي أصناف المنيو
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {products
                  .filter((p) => !p.isBestSeller)
                  .map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      compactButton={true}
                    />
                  ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: MENU PAGE (Matches Reference Image 2) */}
        {activeTab === 'menu' && (
          <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6 animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1910]">
                قائمة دكتور كوكيز
              </h2>
              <p className="text-xs sm:text-sm text-[#735A49] mt-1">
                اختر صنفك المفضل وخصّص طلبك بسهولة
              </p>
            </div>

            {/* Category Navigation & Search Bar (Direct from Image 2) */}
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-[#8A7160] space-y-3">
                <p className="font-bold text-base text-[#2D1910]">
                  لم يتم العثور على أي منتج يطابق البحث
                </p>
                <p className="text-xs">جرّب اختيار تصنيف آخر أو مسح كلمة البحث</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="py-2 px-5 rounded-xl bg-[#BA8E48] text-white font-bold text-xs hover:bg-[#A67C38] transition-colors"
                >
                  إعادة تعيين الفلترة
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                    compactButton={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: BEST SELLERS */}
        {activeTab === 'bestsellers' && (
          <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6 animate-in fade-in duration-200">
            <div className="text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1910]">
                الأكثر مبيعاً والطلب
              </h2>
              <p className="text-xs sm:text-sm text-[#735A49] mt-1">
                الأصناف الأكثر حباً وتقييماً من زبائن دكتور كوكيز في كربلاء
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {bestSellerProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Product Details Modal (Matches Reference Image 3) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* Invoice Output Modal */}
      <InvoiceModal
        isOpen={invoiceData !== null}
        onClose={() => setInvoiceData(null)}
        invoiceText={invoiceData?.text || ''}
        orderId={invoiceData?.orderId || ''}
        customer={invoiceData?.customer || null}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Store Information Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Bottom Navigation for Mobile (Matches Reference Images 1 & 2) */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Footer with Codiar Tech Attribution */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
