import { Product, BusinessInfo, SauceOption } from '../types';

import darkLavaImg from '../assets/images/dr_cookies_dark_lava_1790738142354.jpg';
import classicBoxImg from '../assets/images/dr_cookies_classic_box_1790738152763.jpg';
import miniBoxImg from '../assets/images/dr_cookies_mini_box_1790738162252.jpg';
import mixedTrayImg from '../assets/images/dr_cookies_mixed_tray_1790738172279.jpg';
import heartCakeImg from '../assets/images/dr_cookies_heart_cake_1790738182007.jpg';
import logoImg from '../assets/images/dr_cookies_brand_logo_1790738205819.jpg';

export { logoImg };

export const businessInfo: BusinessInfo = {
  name: 'دكتور كوكيز',
  nameEn: 'Dr. Cookies',
  category: 'محل حلويات وكوكيز فاخر',
  slogan: 'خذلك لقمة من السعادة',
  city: 'كربلاء',
  address: 'كربلاء المقدسة',
  workingHours: '12:00 ظهرًا إلى 11:00 مساءً',
  openingHour: 12,
  closingHour: 23,
  instagramUrl: 'https://www.instagram.com/dr.cookies24?stkn=MWFmNjk0M2drY3lqcA==',
  instagramHandle: '@dr.cookies24',
  freeDeliveryThreshold: 20000,
};

export const defaultSauces: SauceOption[] = [
  { id: 'nutella', name: 'نوتيلا', color: '#96572E' },
  { id: 'lotus', name: 'لوتس', color: '#C68B45' },
  { id: 'kinder', name: 'كندر', color: '#DFCAA7' },
  { id: 'pistachio', name: 'بستاشيو', color: '#6E8A38' },
  { id: 'belgian', name: 'بلجيكي', color: '#4A2818' },
];

export const categories = [
  { id: 'all', name: 'الكل', icon: 'Sparkles' },
  { id: 'classic', name: 'كوكيز كلاسيك', icon: 'Cookie' },
  { id: 'stuffed', name: 'كوكيز محشية', icon: 'Flame' },
  { id: 'mix', name: 'كوكيز مكس', icon: 'Boxes' },
  { id: 'cake', name: 'كيك', icon: 'Cake' },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'كوكيز دارك محشي',
    description: 'كاكاو غامق وحشوة ذائبة',
    price: 10000,
    category: 'stuffed',
    image: darkLavaImg,
    isBestSeller: true,
    hasOptions: false,
    badge: 'الأكثر طلبًا',
  },
  {
    id: 'prod-2',
    name: 'كوكيز كلاسيك',
    description: 'عجينة زبدة تقليدية مع رقائق الشوكولاتة الفاخرة',
    price: 5000,
    category: 'classic',
    image: classicBoxImg,
    isBestSeller: true,
    hasOptions: false,
    badge: 'كلاسيكي',
  },
  {
    id: 'prod-3',
    name: 'طبق كوكيز مشكل',
    description: 'تشكيلة كوكيز مميزة بنكهات متعددة: لوتس، بستاشيو، وشوكولاتة فاخرة',
    price: 13000,
    category: 'mix',
    image: mixedTrayImg,
    isBestSeller: false,
    hasOptions: false,
    badge: 'مكس فاخر',
  },
  {
    id: 'prod-4',
    name: 'مني كوكيز أشقر',
    description: 'بوكس ميني كوكيز طازج مع صوص شوكولاتة ذائبة للتغميس',
    price: 15000,
    category: 'classic',
    image: miniBoxImg,
    isBestSeller: false,
    hasOptions: false,
    badge: 'بوكس مشاركة',
  },
  {
    id: 'prod-5',
    name: 'كيكة الكوكيز القلب',
    description: 'كيكة على شكل قلب مغطاة بالصوصات والشوكولاتة والرقائق.',
    price: 22000,
    category: 'cake',
    image: heartCakeImg,
    isBestSeller: true,
    hasOptions: true,
    availableSauces: defaultSauces,
    badge: 'مميز للمناسبات',
  },
];
