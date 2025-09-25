// theme.js

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = "🌙 Dark Mode";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "15px";
  toggleBtn.style.right = "15px";
  toggleBtn.style.zIndex = "1000";
  toggleBtn.style.padding = "10px 15px";
  toggleBtn.style.borderRadius = "50px";
  toggleBtn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  toggleBtn.style.transition = "all 0.3s ease";

  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.body.style.transition = "background 0.4s, color 0.4s";
    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.innerText = "☀️ Light Mode";
    } else {
      toggleBtn.innerText = "🌙 Dark Mode";
    }
  });
});
