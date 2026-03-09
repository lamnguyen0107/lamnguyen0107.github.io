const searchParams = new URLSearchParams(window.location.search);
const isFigmaCapture =
  window.location.hash.includes("figmacapture=") ||
  searchParams.get("figma") === "1" ||
  /figma/i.test(navigator.userAgent);

if (isFigmaCapture) {
  document.body.classList.add("figma-capture");
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || isFigmaCapture) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const mediaItems = Array.from(document.querySelectorAll(".project-media img"));
let ticking = false;

function attachImageFallback(img) {
  const fallback = img.dataset.fallback;
  if (!fallback) {
    return;
  }

  img.addEventListener("error", () => {
    if (img.src !== fallback) {
      img.src = fallback;
    }
  });

  if (isFigmaCapture && img.currentSrc?.includes(".avif")) {
    img.src = fallback;
  }
}

mediaItems.forEach(attachImageFallback);

function applyScrollMotion() {
  const viewportH = window.innerHeight || 1;
  const scrollY = window.scrollY || window.pageYOffset || 0;

  document.documentElement.style.setProperty("--ambient-shift", `${Math.min(scrollY * 0.015, 16)}px`);

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(applyScrollMotion);
    ticking = true;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
applyScrollMotion();

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navDrawer = document.querySelector(".nav-drawer");

if (siteHeader && navToggle && navDrawer) {
  const closeMenu = () => {
    siteHeader.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      closeMenu();
    }
  });
}
