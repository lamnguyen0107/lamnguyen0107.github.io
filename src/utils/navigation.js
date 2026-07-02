export const getCurrentRoute = () => {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get("path") || params.get("route");

  if (redirectedPath) {
    return redirectedPath.startsWith("/") ? redirectedPath : `/${redirectedPath}`;
  }

  return window.location.pathname || "/";
};

export const navigateTo = (path) => {
  const url = new URL(path, window.location.origin);
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const easeInOutSoft = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  window.history.pushState({}, "", nextUrl);
  window.dispatchEvent(new Event("app:navigation"));

  if (url.hash) {
    const scrollToHashTarget = () => {
      const target = document.querySelector(url.hash);
      if (target) {
        const shouldCenter = target.dataset.scrollCenter === "true";
        const rect = target.getBoundingClientRect();
        const centerTop = Math.max(0, rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2);

        if (window.lenis) {
          window.lenis.resize?.();
          window.lenis.scrollTo(shouldCenter ? centerTop : target, {
            offset: 0,
            duration: shouldCenter ? 1.45 : 1.15,
            easing: easeInOutSoft,
          });
          return;
        }
        if (shouldCenter) {
          window.scrollTo({ top: centerTop, left: 0, behavior: "smooth" });
          return;
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHashTarget);
      });
    }, 180);
    return;
  }

  window.setTimeout(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
};
