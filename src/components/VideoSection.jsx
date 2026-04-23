import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { playHoverSound } from "../utils/audio";
import SpotlightReveal from "./SpotlightReveal";

export const VideoSection = ({ 
  src, 
  title, 
  badge, 
  subtext, 
  ctaText, 
  buttons,
  id,
  desaturated = false,
  rotated = false,
  fullWidth = true,
  objectPosition = "center",
  videoClassName = "",
  className = "",
  useSpotlight = false,
  spotlightImage = "",
  translateY = 5,
  height = "h-[600px] md:h-[800px]",
  scale = 1.1
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (useSpotlight || !videoRef.current) return;
    const video = videoRef.current;
    let hls;

    const startVideo = () => {
      video.play().catch(() => {});
    };

    if (src.toLowerCase().endsWith('.mp4')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, startVideo);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", startVideo);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener("loadedmetadata", startVideo);
    };
  }, [src, useSpotlight]);

  return (
    <section 
      id={id} 
      className={`relative ${height} overflow-hidden flex flex-col items-center justify-center px-6 transition-all duration-700 ${
        fullWidth ? "w-full" : "max-w-7xl mx-auto rounded-[32px] md:rounded-[48px] my-12 md:my-20 shadow-2xl"
      } ${className}`}
    >
      {/* Background Effect */}
      {useSpotlight ? (
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <SpotlightReveal 
            videoSrc={src} 
            imageSrc={spotlightImage} 
            baseRadius={window.innerWidth < 768 ? 180 : 380}
            translateY={translateY}
            scale={scale}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 ${desaturated ? "filter saturate-0" : ""} ${rotated ? "rotate-180" : ""} ${videoClassName}`}
          style={{ objectPosition }}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-x-0 top-0 h-[200px] z-10 pointer-events-none bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[200px] z-10 pointer-events-none bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl">
        {badge && (
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white font-body mb-8">
            {badge}
          </div>
        )}
        
        {title && (
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
            {title}
          </h2>
        )}

        {subtext && (
          <p className="text-white/90 font-body font-normal text-lg max-w-xl mb-12 drop-shadow-lg [text-shadow:_0_2px_10px_rgb(0_0_0_/_100%)]">
            {subtext}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          {ctaText && !buttons && (
            <button 
              onMouseEnter={playHoverSound}
              className="liquid-glass-strong rounded-full px-8 py-3.5 text-white font-medium hover:scale-105 transition-transform"
            >
              {ctaText}
            </button>
          )}

          {buttons && buttons.map((btn, i) => (
            <a 
              key={i}
              href={btn.href}
              target={btn.href.startsWith('http') ? "_blank" : undefined}
              rel={btn.href.startsWith('http') ? "noopener noreferrer" : undefined}
              onMouseEnter={playHoverSound}
                className={`rounded-full px-8 py-3.5 font-medium transition-[transform,background-color] duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                btn.type === 'primary' 
                  ? "bg-white/90 backdrop-blur-lg text-black shadow-xl" 
                  : "liquid-glass-strong backdrop-blur-xl text-white border border-white/10 shadow-lg"
              }`}
            >
              {btn.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
