// --- نمایش/پنهان کردن فیلد مبلغ دلخواه ---
const customRadio = document.getElementById("customAmountRadio");
const customInput = document.getElementById("customAmountInput");
const radios = document.querySelectorAll('input[name="amount"]');

const SCRIPT_URL="https://script.google.com/macros/s/AKfycbxg7G1UZp2Zwc9QtGctxdbhM8WbybQsrqCG8ZIuHfw_zF8KsaxLiT6Fj-YfyaoPy4os/exec";


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
    const response = await fetch(SCRIPT_URL, {
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

    
    if (data.success) {
      alert("✅ درخواست شما با موفقیت ثبت شد!");
      document.getElementById("giftForm").reset();
      customInput.style.display = "none";
    } else {
      alert("❌  خطا در پردازش اطلاعات: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error(error);
    alert("⚠️ مشکلی در ارتباط با سرور پیش آمد.");
  }
});
