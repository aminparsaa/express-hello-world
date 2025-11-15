const express = require("express");
const app = express();

// Render مقدار PORT را خودش می‌دهد؛ اگر نبود، از 3001 استفاده می‌کنیم.
const port = process.env.PORT || 3001;

// روت اصلی: صفحه ساده HTML برای تست
app.get("/", (req, res) => {
  res.type("html").send(html);
});

// لیست JSON کانفیگ‌ها برای استفاده در وب یا ابزارهای دیگر
app.get("/configs", (req, res) => {
  const configs = [
    {
      id: 1,
      name: "demo-vmess-1",
      note: "نمونه تستی، فقط برای تست import شدن در v2rayNG",
      // vmess استاندارد (ساختار صحیح، اما روی example.com سرور واقعی وجود ندارد)
      config:
        "vmess://eyJ2IjoiMiIsInBzIjoiZGVtby1ub2RlIiwiYWRkIjoiZXhhbXBsZS5jb20iLCJwb3J0IjoiNDQzIiwiaWQiOiJiODMxMzgxZC02MzI0LTRkNTMtYWQ0Zi04Y2RhNDhiMzA4MTEiLCJhaWQiOiIwIiwibmV0Ijoid3MiLCJ0eXBlIjoibm9uZSIsImhvc3QiOiJleGFtcGxlLmNvbSIsInBhdGgiOiIvd2Vic29ja2V0IiwidGxzIjoidGxzIn0="
    }
  ];

  res.json(configs);
});

// آدرس Subscription مخصوص v2rayNG
// خروجی: Base64 از لیست لینک‌ها (هر لینک در یک خط) طبق فرمت Subscription
app.get("/sub", (req, res) => {
  const links = [
    // همان لینک vmess بالا
    "vmess://eyJ2IjoiMiIsInBzIjoiZGVtby1ub2RlIiwiYWRkIjoiZXhhbXBsZS5jb20iLCJwb3J0IjoiNDQzIiwiaWQiOiJiODMxMzgxZC02MzI0LTRkNTMtYWQ0Zi04Y2RhNDhiMzA4MTEiLCJhaWQiOiIwIiwibmV0Ijoid3MiLCJ0eXBlIjoibm9uZSIsImhvc3QiOiJleGFtcGxlLmNvbSIsInBhdGgiOiIvd2Vic29ja2V0IiwidGxzIjoidGxzIn0="
  ];

  // هر لینک در یک خط جدا
  const joined = links.join("\n");

  // تبدیل متن به Base64 طبق فرمت Subscription
  const base64 = Buffer.from(joined, "utf-8").toString("base64");

  // ارسال به‌صورت متن ساده
  res.type("text/plain").send(base64);
});

// اجرای سرور
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// تنظیمات keep-alive مطابق نمونه اصلی Render
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// محتوای HTML ساده برای صفحه اصلی
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>amin-v2ray-config</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>amin-v2ray-config</h1>
    <p>این سرویس برای تست API کانفیگ V2Ray و Subscription ساخته شده است.</p>
    <ul>
      <li><a href="/configs">نمایش JSON کانفیگ‌ها (/configs)</a></li>
      <li><a href="/sub">خروجی Subscription برای v2rayNG (/sub)</a></li>
    </ul>
  </body>
</html>
`;
