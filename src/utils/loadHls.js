export const loadHls = () => import("hls.js").then(({ default: Hls }) => Hls);
