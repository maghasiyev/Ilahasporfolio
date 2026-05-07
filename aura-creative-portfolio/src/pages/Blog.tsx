import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import type { BlogPost } from '../types';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
        setPosts(fetchedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6">Journal</h1>
          <p className="max-w-md mx-auto text-black/60">Thoughts on design, life, and the messy process of creation.</p>
        </header>

        <div className="space-y-32">
          {loading ? (
             [1,2].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-3xl" />)
          ) : posts.length > 0 ? (
            posts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center group"
              >
                <Link to={`/blog/${post.id}`} className={idx % 2 === 1 ? "md:order-2" : ""}>
                  <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-[#f0f0f0] relative">
                    <img 
                      src={post.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000"} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Read Post</span>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="w-8 h-px bg-black opacity-10"></span>
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-40 italic">Inspiration</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="hover:opacity-70 transition-opacity">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">{post.title}</h2>
                  </Link>
                  <p className="text-black/60 mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group">
                    Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="text-center py-24 opacity-30 uppercase tracking-[0.3em] font-bold">No entries found. Check back later.</div>
          )}
        </div>
      </div>
    </div>
  );
}
