import { motion } from 'motion/react';
import { Download, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24">
      {/* Split Hero */}
      <section className="px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-black"></div>
              <span className="text-xs uppercase tracking-widest font-black opacity-40">Creative Origin</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-12">
              Human <br /> 
              <span className="italic font-light">Behind</span> <br /> 
              The Art
            </h1>
            <p className="text-xl text-black/70 mb-12 max-w-lg leading-relaxed">
              I am a graphic designer and illustrator with a passion for minimal complexity. I believe that every pixel should serve a purpose and every sketch should hold a memory.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/resume.pdf" 
                download
                className="bg-black text-white px-8 py-4 rounded-full text-[10px] items-center gap-3 font-black uppercase tracking-widest flex group transition-all hover:pr-10"
              >
                Download CV <Download className="w-4 h-4 opacity-50" />
              </a>
              <button className="border border-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Collaboration
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[4rem] overflow-hidden rotate-2 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                alt="Artist Portrait"
                className="w-full h-full object-cover grayscale active:grayscale-0 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Eccentric background block */}
            <div className="absolute -bottom-10 -left-10 w-full h-full bg-[#f0f0f0] -z-10 rounded-[4rem] -rotate-3"></div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-amber-600 text-white py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500 rounded-full blur-[150px] opacity-20 -mr-64 -mt-64"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-200">01 / Concept</span>
              <h3 className="text-3xl font-bold tracking-tight uppercase">Intuitive <br /> Design</h3>
              <p className="text-amber-50/70 text-sm leading-relaxed">Design is not just what it looks like. Design is how it works. I focus on building intuitive paths for the user.</p>
            </div>
            <div className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
              <span className="text-[10px] uppercase font-black tracking-widest text-orange-200">02 / Narrative</span>
              <h3 className="text-3xl font-bold tracking-tight uppercase">Visual <br /> Storytelling</h3>
              <p className="text-amber-50/70 text-sm leading-relaxed">I help brands tell their story through bold imagery and striking illustrations that resonate emotionally.</p>
            </div>
            <div className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-200">03 / Refinement</span>
              <h3 className="text-3xl font-bold tracking-tight uppercase">Minimal <br /> Precision</h3>
              <p className="text-amber-50/70 text-sm leading-relaxed">Cutting away the noise to reveal the core essence of a project. Clean, deliberate, and effective.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tighter uppercase mb-12 text-amber-900">Selected Collaborations</h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 text-amber-600 font-black">
               <span className="text-4xl italic">VOGUE</span>
               <span className="text-4xl text-orange-500">NIKE</span>
               <span className="text-4xl italic">ADOBE</span>
               <span className="text-4xl">APPLE</span>
            </div>
        </div>
      </section>
    </div>
  );
}
