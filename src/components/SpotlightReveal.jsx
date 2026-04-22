import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function SpotlightReveal({
  imageSrc,
  videoSrc,
  isPlaying = true,
  baseRadius = 380,
}) {
  const NUM_TRAILS = 6;
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [spotlightScale, setSpotlightScale] = useState(0);
  const [currentBaseRadius, setCurrentBaseRadius] = useState(baseRadius);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCurrentBaseRadius(180);
      } else {
        setCurrentBaseRadius(baseRadius);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseRadius]);

  useEffect(() => {
    const timer = setTimeout(() => setSpotlightScale(1), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (videoSrc.includes("stream.mux.com") || videoSrc.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoSrc;
      }
    } else {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let targetX = (window.innerWidth / 2) - rect.left;
    let targetY = (window.innerHeight / 2) - rect.top;

    const points = pointsRef.current;
    for (let i = 0; i < points.length; i++) {
      points[i].x = targetX;
      points[i].y = targetY;
    }

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const animate = () => {
      const points = pointsRef.current;
      points[0].x += (targetX - points[0].x) * 0.2;
      points[0].y += (targetY - points[0].y) * 0.2;

      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.35;
        points[i].y += (points[i - 1].y - points[i].y) * 0.35;
      }

      for (let i = 0; i < points.length; i++) {
        const circle = document.getElementById(`trail-${i}`);
        if (circle) {
          circle.setAttribute("cx", points[i].x.toString());
          circle.setAttribute("cy", points[i].y.toString());
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const pointsRef = useRef(
    Array.from({ length: NUM_TRAILS }, () => ({
      x: -1000,
      y: -1000,
    }))
  );

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 flex h-full w-full items-center justify-center overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          transform: `scaleY(0.95) translateY(5%)`, 
          width: '100%',
          transformOrigin: 'center center'
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
          
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="holeGradient">
                <stop offset="0%" stopColor="black" stopOpacity="1" />
                <stop offset="60%" stopColor="black" stopOpacity="0.8" />
                <stop offset="100%" stopColor="black" stopOpacity="0" />
              </radialGradient>
              <mask id="spotlight-mask" maskContentUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <rect width="100%" height="100%" fill="white" />
                <g style={{ opacity: spotlightScale, transition: 'opacity 1.5s ease-out' }}>
                  {Array.from({ length: NUM_TRAILS }).reverse().map((_, reversedIndex) => {
                    const i = NUM_TRAILS - 1 - reversedIndex;
                    return (
                      <circle
                        key={`trail-${i}`}
                        id={`trail-${i}`}
                        cx="-1000"
                        cy="-1000"
                        r={currentBaseRadius - i * 35}
                        fill="url(#holeGradient)"
                        opacity={1 - i * 0.15}
                      />
                    );
                  })}
                </g>
              </mask>
            </defs>
            <image href={imageSrc} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask="url(#spotlight-mask)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
