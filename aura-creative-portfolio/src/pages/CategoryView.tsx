import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import type { Project } from '../types';
import { cn } from '../lib/utils';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryView() {
  const { categorySlug } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Map slug to display name
  const categoryMap: { [key: string]: string } = {
    'graphic-design': 'Graphic Design',
    'illustrations': 'Illustrations',
    'sketches': 'Sketches'
  };
  
  const currentCategory = categoryMap[categorySlug || ''] || 'Works';

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const q = categorySlug 
          ? query(collection(db, 'projects'), where('category', '==', currentCategory), orderBy('createdAt', 'desc'))
          : query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        
        const snapshot = await getDocs(q);
        const fetchedProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(fetchedProjects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [categorySlug, currentCategory]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <Helmet>
        <title>{currentCategory} | Aura Creative Portfolio</title>
        <meta name="description" content={`Explore a curated collection of ${currentCategory.toLowerCase()} by Aura.`} />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-black opacity-20"></div>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Portfolio</span>
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6"
          >
            {currentCategory}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-black/60 leading-relaxed"
          >
            Exploring the boundaries of physical and digital mediums through {currentCategory.toLowerCase()}. Every piece is a story told in silence.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-2xl" />
              ))
            ) : projects.length > 0 ? (
              projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl bg-[#f0f0f0]">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight uppercase">{project.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mt-1">{project.category}</p>
                    </div>
                    <button className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all transform hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <p className="text-black/40 uppercase tracking-widest text-xs font-bold">No projects found in this section yet.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
