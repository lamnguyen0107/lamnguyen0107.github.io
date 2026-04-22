const testimonials = [
  {
    quote: "The website redesign played a key role in increasing our conversion rates and effectively reaching the Vietnamese market. Lam's intuition for local user behavior is exceptional.",
    name: "Ryuji Yamaguchi",
    role: "CEO, DYM Medical Center",
  },
  {
    quote: "Lam has a remarkable ability to explore new skills and integrate AI into his workflow. He has become an indispensable part of our design team.",
    name: "Quan Nguyen",
    role: "Project Manager, Prime Commerce",
  },
  {
    quote: "A versatile designer who consistently brings fresh perspectives to our projects at MLtech Soft. His rapid prototyping and design execution are top-tier.",
    name: "Duc Nguyen",
    role: "Project Manager, MLtech Soft",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium text-white font-body inline-block mb-6">
            Words from Mentors
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            What my leads say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div key={i} className="liquid-glass backdrop-blur-xl rounded-3xl p-8 md:p-10 flex flex-col h-full border border-white/5">
              <p className="text-white/80 font-body font-light text-base md:text-lg italic leading-relaxed mb-10">
                "{item.quote}"
              </p>
              <div className="mt-auto">
                <div className="text-white font-body font-medium text-base mb-1">{item.name}</div>
                <div className="text-white/40 font-body font-light text-xs uppercase tracking-wider">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
