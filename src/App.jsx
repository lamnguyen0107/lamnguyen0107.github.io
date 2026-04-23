import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { VideoSection } from "./components/VideoSection";
import { Works } from "./components/Works";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { Testimonials } from "./components/Testimonials";
import { playHoverSound } from "./utils/audio";

function App() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white selection:text-black antialiased">
      <Navbar />
      
      <main>
        <Hero />
        <About />

        <FeaturesGrid />

        <Works />
        
        <VideoSection 
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          desaturated={true}
          className="my-16 md:my-32"
          badge="Momentum"
          title="Consistently creating value."
        />

        {/* Stats Card Overlay (Adjusted for Junior Designer) */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-32 md:-mt-64 relative z-20 mb-24 md:mb-32">
          <div className="liquid-glass rounded-[32px] md:rounded-[40px] p-8 md:p-20 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center border border-white/5 shadow-2xl">
            {[
              { val: "10+", lab: "Projects" },
              { val: "98%", lab: "Satisfaction" },
              { val: "3.0x", lab: "Conversion" },
              { val: "7 days", lab: "Avg Delivery" },
            ].map((stat, i) => (
              <div 
                key={i} 
                onMouseEnter={playHoverSound}
                className="hover:scale-105 transition-transform cursor-default"
              >
                <div className="text-3xl md:text-6xl font-heading italic text-white mb-2">{stat.val}</div>
                <div className="text-white/40 font-body font-light text-[10px] md:text-xs tracking-widest uppercase">{stat.lab}</div>
              </div>
            ))}
          </div>
        </div>

        <Testimonials />

        <VideoSection 
          id="contact"
          src="https://stream.mux.com/NESdKcnF7fBpiyaVasBJ3lRnNWrWJd02LlQclSQ72ngs.m3u8"
          useSpotlight={true}
          spotlightImage="/assets/base-contact.jpg"
          translateY={10}
          height="h-[1000px]"
          fullWidth={true}
          title="Let's build something together."
          subtext="Available for freelance opportunities and full-time positions. Let's discuss how my design process can add value to your next project."
          buttons={[
            { text: "Send Email", href: "mailto:lamnguyen19417@gmail.com", type: "primary" },
            { text: "My LinkedIn", href: "https://linkedin.com/in/lamnguyen0107", type: "secondary" }
          ]}
        />

        {/* Footer Bar */}
        <footer className="py-12 px-6 md:px-16 border-t border-white/10 bg-background relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white/40 text-[10px] md:text-xs font-body">
              © 2026 Lam Nguyen. All rights reserved. Ho Chi Minh City, VN.
            </div>
            <div className="text-white/40 text-[10px] md:text-xs font-body italic underline-offset-4 decoration-white/20 text-center md:text-right">
               Digital Design — Crafted with intention
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
