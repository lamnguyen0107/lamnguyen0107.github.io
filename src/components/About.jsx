import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const roles = [
  "UI/UX Designer",
  "Product Designer",
  "Web Builder",
  "AI Explorer",
  "Interaction Designer"
];

export const About = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-32 px-8 lg:px-16 bg-background relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        <div className="lg:w-1/2">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white font-body inline-block mb-10">
            About Me
          </div>
          <h2 className="text-5xl md:text-7xl font-heading italic text-white tracking-tight leading-[0.9]">
            I am <span className="text-white/40 italic">Lam Nguyen.</span>
          </h2>
          
          <div className="mt-8 relative h-[60px] md:h-[90px] overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[index]}
                className="flex flex-nowrap whitespace-nowrap tracking-tighter"
              >
                {roles[index].split("").map((char, i) => (
                  <motion.span
                    key={`${roles[index]}-${i}`}
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
                    transition={{ 
                        duration: 0.8, 
                        delay: i * 0.04,
                        ease: [0.215, 0.61, 0.355, 1]
                    }}
                    style={{ 
                      display: "inline-block", 
                      whiteSpace: "pre",
                    }}
                    className="text-4xl md:text-6xl font-heading italic text-white"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-10">
           <p className="text-base md:text-lg text-white/70 font-body font-light leading-relaxed">
             Technology moves fast, and the digital landscape is always changing. 
             But my goal remains simple: to make sense of the noise and design with real <em className="italic text-white">purpose</em>.
           </p>
           <p className="text-base md:text-lg text-white/70 font-body font-light leading-relaxed">
             I focus on understanding human behavior rather than just chasing trends. 
             My process is built on rapid exploration, bold prototyping, and crafting seamless digital experiences.
           </p>
           <p className="text-base md:text-lg text-white/70 font-body font-light leading-relaxed">
             At the end of the day, good design should be clean, clear, and fun to use. 
             That's what I bring to every product I make.
           </p>
        </div>
      </div>
    </section>
  );
};
