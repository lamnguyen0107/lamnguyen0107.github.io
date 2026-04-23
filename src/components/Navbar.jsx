import { motion } from "motion/react";
import { Download } from "lucide-react";
import { playHoverSound } from "../utils/audio";

export const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="flex-1 flex justify-start">
        <div 
          className="pointer-events-auto flex items-center gap-1 cursor-pointer group"
          onClick={scrollToTop}
        >
          <motion.div 
            className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center transform-gpu"
            whileHover={{ 
              rotate: [-3, 3],
              rotateY: [-6, 6],
              rotateX: [-3, 3],
            }}
            transition={{ 
              rotate: { repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" },
              rotateY: { repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" },
              rotateX: { repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" }
            }}
            style={{ perspective: 1000, backfaceVisibility: "hidden" }}
          >
            <img src="/assets/avatar.png" alt="Lam Nguyen" className="w-full h-full object-contain drop-shadow-lg" />
          </motion.div>
          <span className="font-heading italic text-lg md:text-xl text-white tracking-tight leading-none">
            Lam Nguyen
          </span>
        </div>
      </div>

      {/* Center: Navigation - Pills scrollable on small mobile */}
      <div className="hidden sm:flex items-center gap-1 liquid-glass rounded-full px-4 py-2 pointer-events-auto border border-white/10 backdrop-blur-3xl mx-auto">
        {["About", "Work", "Contact"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onMouseEnter={playHoverSound}
            className="px-3 md:px-4 py-2 text-[10px] md:text-xs font-medium text-white/70 font-body hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right: Button */}
      <div className="flex-1 flex justify-end">
        <a 
          href="/CV-Nguyen Van Lam.pdf"
          download="CV-Nguyen-Van-Lam.pdf"
          onMouseEnter={playHoverSound}
          className="pointer-events-auto bg-white/90 backdrop-blur-lg text-black rounded-full px-4 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 hover:opacity-90 transition-[transform,background-color,opacity] duration-300 shadow-lg active:scale-95 whitespace-nowrap"
        >
          <span className="hidden xs:inline">Download Résumé</span>
          <span className="xs:hidden inline">Résumé</span>
          <Download size={14} />
        </a>
      </div>
    </nav>
  );
};
