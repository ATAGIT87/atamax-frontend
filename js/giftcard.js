// --- نمایش/پنهان کردن فیلد مبلغ دلخواه ---
const customRadio = document.getElementById("customAmountRadio");
const customInput = document.getElementById("customAmountInput");
const radios = document.querySelectorAll('input[name="amount"]');

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (customRadio.checked) {
      customInput.style.display = "block";
      customInput.focus();
    } else {
      customInput.style.display = "none";
      customInput.value = "";
    }
  });
});

// --- ارسال فرم به backend ---
document.getElementById("giftForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let amount;
  const selected = document.querySelector('input[name="amount"]:checked');

  if (!selected) {
    alert("لطفاً مبلغ را انتخاب کنید.");
    return;
  }

  if (selected.value === "custom") {
    amount = customInput.value.trim();
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("لطفاً مبلغ دلخواه معتبر وارد کنید.");
      return;
    }
  } else {
    amount = selected.value;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email) {
    alert("لطفاً تمام فیلدهای الزامی را پر کنید.");
    return;
  }

  try {
    const response = await fetch("https://atamax-backend.onrender.com/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, amount, message }),
    });
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }
    const data = await response.json();

    if (response.ok) {
      alert("✅ ایمیل با موفقیت ارسال شد!");
      document.getElementById("giftForm").reset();
      customInput.style.display = "none";
    } else {
      alert("❌ خطا در ارسال ایمیل: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error(error);
    alert("⚠️ مشکلی در ارتباط با سرور پیش آمد.");
  }
});
