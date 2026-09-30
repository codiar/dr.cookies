# Dr. Cookies — GitHub Pages

موقع منيو إلكتروني لمتجر دكتور كوكيز، مبني باستخدام React + Vite + TypeScript + Tailwind CSS.

## تشغيل محلي

```bash
npm install
npm run dev
```

## اختبار المشروع قبل النشر

```bash
npm run lint
npm run build
npm run preview
```

## النشر على GitHub Pages

1. ارفع كامل محتوى هذا المشروع إلى مستودع GitHub جديد.
2. اجعل الفرع الرئيسي اسمه `main`.
3. من:
   **Settings → Pages → Build and deployment**
   اختر **GitHub Actions**.
4. ادفع الملفات إلى `main`.
5. سيقوم GitHub Actions ببناء المشروع ونشر مجلد `dist` تلقائيًا.

## بيانات المتجر

بيانات المتجر والمنتجات موجودة في:

```text
src/data/menu.ts
```

## ملاحظة الطلب

نظام الطلب الحالي ينشئ فاتورة داخل الموقع، ثم يسمح للعميل بنسخها وفتح حساب Instagram الخاص بالمتجر لإرسالها يدويًا.

## حقوق التطوير

تم تطوير الموقع من قبل شركة كوديار تك.
