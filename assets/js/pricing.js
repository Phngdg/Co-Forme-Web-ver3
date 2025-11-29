// hiển thị lỗi inline
function showError(inputId, errorId, show) {
  const input = document.getElementById(inputId);
  const errorDiv = document.getElementById(errorId);
  input.classList.toggle("input-error", show);
  errorDiv.style.display = show ? "block" : "none";
}

// chuyển bảng giá (cá nhân / hlv)
function switchTable(type) {
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");

  document.querySelectorAll(".pricing-block").forEach(b => b.classList.remove("active-table"));
  document.getElementById(`block-${type}`).classList.add("active-table");

  toggleCompare(false);
}

// so sánh (1 tháng / 3 tháng)
function toggleCompare(isCompare) {
  const btn1 = document.getElementById("dur-1");
  const btn3 = document.getElementById("dur-3");
  const tables = document.querySelectorAll(".pricing-table");

  if (isCompare) {
    btn1.classList.remove("active");
    btn3.classList.add("active-compare", "active");
    tables.forEach(tbl => tbl.classList.add("show-compare"));
  } else {
    btn3.classList.remove("active-compare", "active");
    btn1.classList.add("active");
    tables.forEach(tbl => tbl.classList.remove("show-compare"));
  }
}

// chọn gói tập
function selectPlan(planValue) {
  document.getElementById("plan").value = planValue;
  showError("plan", "err-plan", false);
  updateSummary();

  document.getElementById("registration-section").scrollIntoView({ behavior: "smooth" });
  goToStep(1);
}

// điều hướng form (3 bước)
function goToStep(stepNumber) {
  // validate bước 1
  if (stepNumber === 2) {
    const name = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    let valid = true;

    if (!name) { showError("fullname", "err-fullname", true); valid = false; }
    else showError("fullname", "err-fullname", false);

    if (!phone) { showError("phone", "err-phone", true); valid = false; }
    else showError("phone", "err-phone", false);

    if (!email || !email.includes("@")) { showError("email", "err-email", true); valid = false; }
    else showError("email", "err-email", false);

    if (!valid) return;

    document.getElementById("ck-content").innerText = `${phone} ${name}`;
  }

  // validate bước 2
  if (stepNumber === 3) {
    const plan = document.getElementById("plan").value;
    if (!plan) {
      showError("plan", "err-plan", true);
      return;
    }
    updateSummary();
  }

  // chuyển bước hiển thị
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`step-${i}`).classList.add("hidden");
    document.getElementById(`progress-${i}`).classList.remove("active");
  }
  document.getElementById(`step-${stepNumber}`).classList.remove("hidden");
  document.getElementById(`progress-${stepNumber}`).classList.add("active");
}

// cập nhật tóm tắt đơn
function updateSummary() {
  const selectEl = document.getElementById("plan");
  const opt = selectEl.options[selectEl.selectedIndex];
  if (opt.value) {
    document.getElementById("sum-name").innerText = opt.getAttribute("data-name");
    document.getElementById("sum-price").innerText = opt.getAttribute("data-price");
  }
}

// hiển thị file tải lên
function handleFileSelect(input) {
  const display = document.getElementById("file-name-display");
  if (input.files[0]) {
    display.innerText = "Đã chọn: " + input.files[0].name;
    display.style.color = "#28a745";
  }
}

// gửi form
function submitForm() {
  if (!document.getElementById("bill-upload").files.length) {
    alert("Chưa tải hóa đơn!");
    return;
  }

  const btn = document.querySelector("#step-3 .btn-primary");
  const originalText = btn.innerText;

  btn.innerText = "Đang xử lý...";
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById("joinForm").classList.add("hidden");
    document.getElementById("success-message").classList.remove("hidden");
    document.getElementById("registration-section").scrollIntoView({ behavior: "smooth" });
  }, 2000);
}

// tự xóa lỗi khi nhập lại + menu mobile
document.addEventListener("DOMContentLoaded", () => {
  ["fullname", "phone", "email", "plan"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => showError(id, `err-${id}`, false));
  });

  // menu mobile
  const menuBtn = document.getElementById("mobile-menu");
  const nav = document.querySelector(".navbar_header");
  if (menuBtn) menuBtn.addEventListener("click", () => nav.classList.toggle("active"));
});
