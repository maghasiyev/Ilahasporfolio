import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import type { Project } from '../types';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setFeaturedProjects(projects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="min-h-[90vh] px-6 md:px-12 flex flex-col justify-center relative overflow-hidden bg-white">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-amber-50 rounded-full blur-[120px] opacity-60 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-orange-50 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl relative z-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-0.5 bg-amber-600"></span>
            <span className="text-xs uppercase font-black tracking-[0.3em] text-amber-600">Visionary Design & Illustration</span>
          </div>
          <h1 className="text-7xl md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase mb-10 text-slate-900">
            AURA <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 italic font-serif font-light lowercase">creative</span> 
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-xl mb-12 leading-relaxed">
            Where logic meets magic. We craft immersive digital experiences and dreamlike illustrations that define tomorrow's brands.
          </p>
          <div className="flex flex-wrap gap-8 items-center">
            <Link 
              to="/graphic-design" 
              className="bg-amber-500 text-black px-12 py-6 rounded-full text-xs uppercase font-black tracking-widest flex items-center gap-4 group hover:bg-amber-600 transition-all shadow-xl shadow-amber-100"
            >
              Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/about" className="text-xs uppercase font-black tracking-widest text-amber-600 hover:text-orange-500 flex items-center gap-2">
               The Story <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* YouTube Section */}
      <section className="bg-amber-50/30 py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-amber-200/50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-lg">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">Beyond the <span className="text-amber-600 italic">Static</span></h2>
              <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Process archives & creative explorations.</p>
            </div>
            <Link to="#" className="bg-white text-amber-600 px-8 py-4 rounded-full text-[10px] uppercase font-black tracking-widest shadow-sm hover:shadow-lg transition-all border border-amber-100 italic">
               Youtube / @AuraCreative
            </Link>
          </div>
          
          <div className="aspect-video w-full bg-slate-900 relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(245,158,11,0.2)]">
             <iframe 
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Process Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
          </div>
        </div>
      </section>

      {/* Featured Work Grid */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <div className="space-y-8 self-center">
              <div className="flex items-center gap-4">
                 <span className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Play className="w-4 h-4" /></span>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Curated Works</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">BOLD <br /> <span className="text-orange-500">COLORS</span> <br /> BOLDER <br /> <span className="italic font-serif font-light lowercase">ideas</span></h2>
              <p className="max-w-xs text-slate-500 text-sm leading-loose">Pushing the limits of contemporary aesthetics through digital and traditional medium fusion.</p>
            </div>

            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={cn(
                  "relative aspect-[4/5] overflow-hidden group rounded-[3rem] shadow-2xl shadow-amber-100",
                  idx % 2 === 1 ? "md:mt-32" : ""
                )}
              >
                <img 
                  src={project.imageUrl || `https://picsum.photos/seed/${project.id}/800/1000`} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12 text-white">
                  <span className="text-[10px] uppercase font-black tracking-[0.3em] mb-4 text-amber-300">{project.category}</span>
                  <h3 className="text-4xl font-bold tracking-tighter mb-6">{project.title}</h3>
                  <button className="flex items-center gap-3 text-[10px] uppercase font-black tracking-widest bg-white/10 hover:bg-white hover:text-amber-900 backdrop-blur-md px-6 py-3 rounded-full transition-all w-fit">
                    Full Study <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eccentric Section Shift */}
      <section className="bg-orange-500 text-white py-40 px-6 md:px-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.h2 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-8xl md:text-[20vw] font-black tracking-tighter uppercase mb-12 italic opacity-10 select-none whitespace-nowrap leading-none"
          >
            AURA CREATIVE
          </motion.h2>
          <div className="max-w-2xl -mt-20 md:-mt-48 bg-white/5 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] border border-white/10 shadow-3xl">
             <h3 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-tight uppercase">Ready to <br /><span className="text-amber-300">Ignite</span> your identity?</h3>
             <Link to="/contact" className="inline-flex items-center gap-4 bg-white text-orange-600 px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-orange-900/20">
                Start a project <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


