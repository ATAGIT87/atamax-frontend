async function fetchEuroRateFromTGJU() {
  try {
    const res = await fetch("https://english.tgju.org/profile/price_eur");
    const html = await res.text();

    // در html دنبال بخشی باش که قیمت یورو نوشته شده، مثلا "قیمت هر یورو … ریال می باشد"
    const match = html.match(/قیمت هر یورو\s+([\d,]+)\s+ریال/);
    if (match && match[1]) {
      const rate = Number(match[1].replace(/,/g, ""));
      document.getElementById("euroRate").textContent =
        `💶 نرخ یورو امروز: ${rate.toLocaleString("fa-IR")} ریال`;
      return rate;
    } else {
      throw new Error("قیمت یورو پیدا نشد در HTML");
    }
  } catch (err) {
    console.error("خطا در دریافت نرخ از TGJU:", err);
    document.getElementById("euroRate").textContent = "❌ خطا در دریافت نرخ یورو";
  }
}
