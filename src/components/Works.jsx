import { motion } from "motion/react";
import { projects } from "../data/projects";
import { ArrowUpRight } from "lucide-react";
import { playHoverSound } from "../utils/audio";

export const Works = () => {
  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32">
        <div className="flex flex-col items-center text-center">
            <div className="liquid-glass backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium text-white font-body inline-block mb-6">
                Selected Works
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-12">
                Crafted with intention.
            </h2>
        </div>

        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 md:gap-16 lg:gap-24`}
          >
            <div className="lg:w-1/2 w-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-white/40 font-body text-sm font-light">0{index + 1}</span>
                <span className="h-px w-8 bg-white/20"></span>
                <span className="text-white/60 font-body text-[10px] uppercase tracking-widest">{project.meta}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-heading italic text-white tracking-tight leading-[1] mb-6 md:mb-8">
                {project.title}
              </h3>
              <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 md:mb-12 max-w-lg">
                {project.description}
              </p>
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="liquid-glass-strong backdrop-blur-xl rounded-full px-6 md:px-8 py-3 md:py-3.5 text-white text-sm md:text-base font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                View Project
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="liquid-glass backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden aspect-video relative group border border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
