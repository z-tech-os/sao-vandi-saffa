
/* ============================================
    MAIN JAVASCRIPT
   =============================================== */

/* Page loader */
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 300);
  }
});

/* Mobile navigation */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("active")
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

/* Light / dark mode */
const modeBtn = document.querySelector("#modeBtn");
const savedMode = localStorage.getItem("classic-personal-mode") || "light";

document.documentElement.setAttribute("data-mode", savedMode);

function updateModeIcon() {
  if (!modeBtn) return;

  const icon = modeBtn.querySelector("i");
  if (!icon) return;

  icon.className =
    document.documentElement.getAttribute("data-mode") === "dark"
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";
}

if (modeBtn) {
  updateModeIcon();

  modeBtn.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-mode");

    const next = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-mode", next);
    localStorage.setItem("classic-personal-mode", next);

    updateModeIcon();
  });
}

/* Reveal sections while scrolling */
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {threshold:.12}
);

revealItems.forEach(item => revealObserver.observe(item));
