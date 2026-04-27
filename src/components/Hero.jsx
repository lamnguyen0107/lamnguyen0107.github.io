import { motion as Motion } from "motion/react";
import { BlurText } from "./BlurText";
import { ArrowUpRight } from "lucide-react";
import { playHoverSound } from "../utils/audio";
import SpotlightReveal from "./SpotlightReveal";

export const Hero = () => {
  const tools = ["Notion", "Adobe", "Figma", "Codex", "Claude"];
  // Mux stream URL derived from the playback ID: mHLXnGlPHW01DnTSSMn201j014ZHGziaV37EOb31SQJpqo
  const videoSrc = "https://stream.mux.com/mHLXnGlPHW01DnTSSMn201j014ZHGziaV37EOb31SQJpqo.m3u8";
  // Using the new local Base.jpg as the cover image for the reveal effect.
  const imageSrc = "/assets/Base.jpg";

  return (
    <section id="home" className="relative h-[1000px] w-full overflow-hidden flex flex-col items-center">
      {/* Background Spotlight Reveal - Bottom layer */}
      <div className="absolute inset-0 z-0">
        <SpotlightReveal
          videoSrc={videoSrc}
          imageSrc={imageSrc}
        />
      </div>

      {/* Subtle Bottom Gradient for transition to the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[500px] z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, black 90%)" }}
      />

      {/* Content - z-20 for clear separation from background - Shifted up */}
      <div className="relative z-20 pt-[204px] flex flex-col items-center text-center px-6 max-w-6xl pointer-events-none w-full">
        <div className="pointer-events-auto flex flex-col items-center w-full">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass backdrop-blur-md rounded-full px-1 py-1 flex items-center gap-3 pr-4 mb-4"
          >
            <span className="bg-green-500 text-black rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Available
            </span>
            <span className="text-xs font-body text-white/80 uppercase tracking-wide">UI/UX Designer in Ho Chi Minh City</span>
          </Motion.div>

          <div className="flex flex-col items-center mb-10 py-10">
            <BlurText
              text="Have a cool idea?"
              className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-foreground leading-[0.9] tracking-[-3px] justify-center"
              delay={100}
            />
            <BlurText
              text="Let's chat."
              className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-foreground leading-[0.9] tracking-[-3px] justify-center"
              delay={500}
            />
          </div>

          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm md:text-lg text-white/90 font-body font-normal leading-relaxed max-w-2xl mb-12 drop-shadow-lg [text-shadow:_0_2px_10px_rgb(0_0_0_/_100%)]"
          >
            I design clean, beautiful, and easy-to-use websites and apps.
            Let's work together to turn your ideas into digital products that people actually love.
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {/* Primary Button Only */}
            <a
              href="#work"
              onMouseEnter={playHoverSound}
              className="liquid-glass-strong backdrop-blur-xl rounded-full px-8 py-4 flex items-center gap-2 text-white font-semibold hover:scale-105 transition-transform group shadow-xl"
            >
              View My Work
              <Motion.div
                variants={{
                  initial: { rotate: 0 },
                  hover: { rotate: 90 }
                }}
                initial="initial"
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowUpRight size={20} />
              </Motion.div>
            </a>
          </Motion.div>

          {/* Tools Bar - Also within pointer-events-auto to allow interaction if needed */}
          <div className="mt-12 w-full flex flex-col items-center pb-8 pt-8 px-4">
            <div className="liquid-glass backdrop-blur-md rounded-full px-6 py-2 text-[10px] font-body text-white/40 mb-10 uppercase tracking-[0.2em] border border-white/5 shadow-sm text-center">
              Top Tools I Use
            </div>
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-x-2 gap-y-8 md:gap-x-10 lg:gap-20 opacity-50 grayscale saturate-0 w-full max-w-6xl">
              {tools.map((tool) => (
                <span key={tool} className="text-xl md:text-2xl lg:text-3xl font-heading italic text-white cursor-default text-center whitespace-nowrap w-[30%] md:w-[150px] lg:w-auto">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

