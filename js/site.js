const searchParams = new URLSearchParams(window.location.search);
const isFigmaCapture =
  window.location.hash.includes("figmacapture=") ||
  searchParams.get("figma") === "1" ||
  /figma/i.test(navigator.userAgent);

if (isFigmaCapture) {
  document.body.classList.add("figma-capture");
}

// -------------------------------------------------------------
// Lenis Smooth Scrolling Initialization
// -------------------------------------------------------------
let lenis;
if (!isFigmaCapture && typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Integrate Lenis with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback if GSAP is not loaded
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Handle anchor links for smooth scrolling via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80 }); // offset for sticky header
      }
    });
  });
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

// If Lenis is active, hook the ambient shift to Lenis scroll event
if (lenis) {
  lenis.on('scroll', onScroll);
} else {
  window.addEventListener("scroll", onScroll, { passive: true });
}
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

// SIMPLIFIED LOADER LOGIC
window.addEventListener("load", () => {
  const loader = document.getElementById("site-loader");
  if (loader) {
    // Small delay for premium feel
    setTimeout(() => {
      loader.classList.add("loaded");
      // Optional: mark hero as active for a reveal animation if needed
      const hero = document.getElementById("hero");
      if (hero) hero.classList.add("active");
    }, 1000);
  }
});
