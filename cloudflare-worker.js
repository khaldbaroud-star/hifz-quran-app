/**
 * Cloudflare Worker — وسيط آمن بين تطبيق حفظ القرءان و Notion API
 *
 * === كيف تنشره (5 دقائق) ===
 * 1. dashboard.cloudflare.com → Workers & Pages → Create → Create Worker
 * 2. اسم مقترح: hifz-quran-proxy
 * 3. احذف الكود الافتراضي، والصق هذا الملف بالكامل
 * 4. Settings → Variables and Secrets → أضف:
 *      NOTION_TOKEN   = مفتاح تكامل Notion الخاص بك (سرّي)
 *      DATA_SOURCE_ID = 3a0bab3b-70a8-4120-98a3-931533a77b65
 * 5. Deploy → ستحصل على رابط مثل: https://hifz-quran-proxy.YOUR_SUBDOMAIN.workers.dev
 * 6. ضع هذا الرابط في index.html داخل المتغيّر API_BASE
 *
 * ملاحظة أمان: لا تضع مفتاح Notion أبدًا داخل index.html أو أي كود يصل للمتصفح.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/quran") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const notionRes = await fetch(
        `https://api.notion.com/v1/data_sources/${env.DATA_SOURCE_ID}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.NOTION_TOKEN}`,
            "Notion-Version": "2025-09-03",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page_size: 100 }),
        }
      );

      if (!notionRes.ok) {
        return new Response(JSON.stringify({ error: "Notion API error" }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        });
      }

      const notionData = await notionRes.json();

      const items = (notionData.results || []).map((page) => {
        const props = page.properties || {};
        return {
          name: props["Name"]?.title?.[0]?.plain_text || "بدون عنوان",
          tags: (props["Tags"]?.multi_select || []).map((t) => t.name),
          days: (props["The date"]?.multi_select || []).map((t) => t.name),
          score: props["score"]?.number ?? 0,
        };
      });

      return new Response(JSON.stringify(items), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
