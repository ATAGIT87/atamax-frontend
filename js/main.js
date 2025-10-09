// مدیریت انتخاب‌ها و نمایش در Selection Bar
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-service]');
  if (!btn) return;

  const serviceKey = btn.getAttribute('data-service');
  toggleSelection(serviceKey, btn);
});

const selections = new Set();

function toggleSelection(key, btn) {
  // ساده: اگر در سِت هست حذف کن، وگرنه اضافه کن
  if (selections.has(key)) {
    selections.delete(key);
    btn.classList.remove('selected');
    btn.textContent = btn.classList.contains('btn-primary') ? btn.textContent : 'انتخاب';
  } else {
    selections.add(key);
    btn.classList.add('selected');
    // می‌تونیم حالت بصری اضافه کنیم
  }
  updateSelectionBar();
}

function updateSelectionBar() {
  const bar = document.getElementById('selectionBar');
  const proceed = document.getElementById('proceedBtn');

  if (selections.size === 0) {
    bar.querySelector('p').textContent = 'هیچ خدمتی انتخاب نشده.';
    proceed.disabled = true;
  } else {
    bar.querySelector('p').textContent = 'خدمات انتخاب‌شده: ' + Array.from(selections).join('، ');
    proceed.disabled = false;
  }
}

// دکمه ادامه — اینجا فقط برای نمونه است (می‌تونی ارسال به سرور یا باز کردن modal انجام بدی)
document.getElementById('proceedBtn').addEventListener('click', () => {
  if (selections.size === 0) return;
  alert('شما این خدمات را انتخاب کردید:\n' + Array.from(selections).join('\n'));
});
