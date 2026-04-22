import { motion } from "motion/react";
import { Download } from "lucide-react";
import { playHoverSound } from "../utils/audio";

export const Navbar = () => {
  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="flex-1 flex justify-start">
        <div className="pointer-events-auto font-heading italic text-xl md:text-2xl text-white tracking-tighter cursor-pointer">
          LN.
        </div>
      </div>

      {/* Center: Navigation - Pills scrollable on small mobile */}
      <div className="hidden sm:flex items-center gap-1 liquid-glass rounded-full px-4 py-2 pointer-events-auto border border-white/10 backdrop-blur-3xl mx-auto">
        {["Home", "About", "Work", "Contact"].map((link) => (
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
          <span className="hidden xs:inline">Download Resume</span>
          <span className="xs:hidden inline">Resume</span>
          <Download size={14} />
        </a>
      </div>
    </nav>
  );
};
