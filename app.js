const express = require("express");
const app = express();

// Render مقدار PORT را خودش می‌دهد؛ اگر نبود، از 3001 استفاده می‌کنیم.
const port = process.env.PORT || 3001;

// روت اصلی: صفحه ساده HTML
app.get("/", (req, res) => {
  res.type("html").send(html);
});

// لیست JSON کانفیگ‌ها برای استفاده در وب یا ابزارهای دیگر
app.get("/configs", (req, res) => {
  const configs = [
    {
      id: 1,
      name: "free-vmess-1",
      note: "نمونه تستی با لینک واقعی",
      // اینجا یک لینک vmess واقعی قرار دهید:
      config: "vmess://اینجا-لینک-واقعی-vmess-خودتان-را-کامل-بگذارید"
    }
    // اگر خواستید کانفیگ‌های بیشتری اضافه کنید، به همین شکل عنصرهای دیگر به آرایه اضافه کنید
    // {
    //   id: 2,
    //   name: "free-vless-1",
    //   note: "نمونه vless",
    //   config: "vless://لینک-واقعی-vless"
    // }
  ];

  res.json(configs);
});

// آدرس Subscription مخصوص v2rayNG (Base64 از لیست لینک‌ها، هر لینک در یک خط)
app.get("/sub", (req, res) => {
  // همان لینک‌هایی که می‌خواهید به v2rayNG برسند
  const links = [
    // دقیقا همان لینک vmess واقعی که در بالا در configs گذاشتید:
    "vmess://اینجا-همان-لینک-واقعی-vmess-را-قرار-دهید"
    // اگر چند لینک دیگر هم دارید، فقط با کاما و در خط‌های بعد اضافه کنید:
    // "vless://لینک-دیگر-در-خط-جدا",
    // "vmess://لینک-سوم-در-خط-جدا"
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

// تنظیمات keep-alive (همان چیزی که در نسخه اصلی Render بود)
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
