# حالة المشروع: تطبيق حفظ القرءان

## آخر تحديث: 2026-07-15

### ما تم إنجازه
- بناء واجهة PWA كاملة (index.html) — تعمل، قابلة للتثبيت
- manifest.json — يجعل التطبيق قابلاً للتثبيت
- service-worker.js — يعمل بدون إنترنت
- أيقونات التطبيق (icon-192.png, icon-512.png)
- cloudflare-worker.js — كود الوسيط الآمن لجلب بيانات Notion الحقيقية (جاهز، غير منشور بعد)
- كل الملفات مخزّنة بشكل دائم في مجلد hifz-quran-app داخل Google Drive، وأيضًا كمرفقات في صفحات Notion

### القرارات المعمارية
- PWA بدل تطبيق منفصل لكل نظام
- Notion يبقى مصدر البيانات الوحيد
- Cloudflare Worker كوسيط لحماية مفتاح Notion API
- GitHub Pages للاستضافة المجانية (الرفع يدوي — لا يوجد اتصال كتابة فعلي بـ GitHub من هذه الواجهة)

### الخطوات المتبقية (بالترتيب)
1. رفع الملفات على GitHub يدويًا (حساب مجاني + مستودع جديد + Upload files)
2. تفعيل GitHub Pages (Settings → Pages → main → root)
3. نشر cloudflare-worker.js يدويًا عبر لوحة Cloudflare (Workers & Pages → Create Worker → لصق الكود)
4. إضافة NOTION_TOKEN و DATA_SOURCE_ID كـ Secrets في إعدادات الـ Worker
   (DATA_SOURCE_ID = 3a0bab3b-70a8-4120-98a3-931533a77b65)
5. وضع رابط الـ Worker النهائي داخل index.html في متغيّر API_BASE
6. إعادة رفع index.html المحدّث

### ملاحظات مهمة
- Cloudflare متصل بالقراءة فقط لـ Workers (لا نشر تلقائي ممكن من هذه المحادثة)
- GitHub متصل لكن بصلاحية قراءة/سياق فقط، لا رفع تلقائي
- Google Drive وNotion كلاهما بصلاحية كتابة كاملة وهما مصدر الحقيقة الدائم لهذا المشروع

### للمحادثة القادمة
قل فقط: "افتح ملفات مشروع حفظ القرآن من Google Drive (مجلد hifz-quran-app)" — لا حاجة لإعادة شرح أي شيء.
