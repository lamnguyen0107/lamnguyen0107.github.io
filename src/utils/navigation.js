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

  window.history.pushState({}, "", nextUrl);
  window.dispatchEvent(new Event("app:navigation"));

  if (url.hash) {
    window.setTimeout(() => {
      const target = document.querySelector(url.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};
