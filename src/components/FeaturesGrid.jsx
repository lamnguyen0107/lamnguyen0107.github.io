import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion, useInView } from "motion/react";
import { Search, Scissors, PenTool, Rocket } from "lucide-react";
import { playHoverSound } from "../utils/audio";

const processSteps = [
  {
    icon: Search,
    title: "1. Research",
    description: "Deep diving into the problem, understanding user behavior, and finding the 'why' before the 'what'.",
  },
  {
    icon: Scissors,
    title: "2. Abstract",
    description: "Cutting through the noise. I strip away the unnecessary to focus on the core value of your product.",
  },
  {
    icon: PenTool,
    title: "3. Design",
    description: "Crafting a clean, intentional interface that feels natural and looks premium across all devices.",
  },
  {
    icon: Rocket,
    title: "4. Ship & Refine",
    description: "Iterating fast, testing with real users, and polishing until the output is ready to make an impact.",
  },
];

export const FeaturesGrid = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);
  const src = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

  useEffect(() => {
    let hls;
    const video = videoRef.current;
    
    if (video) {
      video.muted = true;
      video.defaultMuted = true;

      const startVideo = () => {
        video.play().catch(err => {
          console.warn("Video play failed, will retry on view:", err);
        });
      };

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", startVideo);
      } else if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, startVideo);
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
        video.removeEventListener("loadedmetadata", startVideo);
      };
    }
  }, [src]);

  // Force play when in view if it hasn't started
  useEffect(() => {
    if (isInView && videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <section ref={containerRef} id="process" className="relative py-24 md:py-40 px-6 md:px-16 overflow-hidden min-h-[800px] flex items-center">
      {/* Background Video (HLS) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "circOut" }}
        className="absolute inset-0 z-0 bg-black"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20 w-full">
        <div className="mb-24 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium text-white font-body inline-block mb-6 shadow-xl"
          >
            My Creative Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-8xl font-heading italic text-white tracking-tight leading-[0.9] mb-10"
          >
            How I bring ideas to life.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white/70 font-body font-light max-w-2xl text-center text-sm md:text-lg leading-relaxed"
          >
            I follow a tight, intentional loop designed to turn complex problems into simple, beautiful digital products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i + 0.5, duration: 0.6 }}
              onMouseEnter={playHoverSound}
              className="liquid-glass backdrop-blur-xl rounded-3xl p-8 md:p-10 hover:bg-white/[0.05] transition-[background-color,transform] duration-500 border border-white/5 group shadow-2xl"
            >
              <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-lg transform-gpu backface-hidden">
                <step.icon className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-heading italic text-white mb-4 leading-tight">{step.title}</h4>
              <p className="text-white/50 font-body font-light text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
