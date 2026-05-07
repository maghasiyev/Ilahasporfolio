import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { BlogPost } from '../types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export default function BlogPostView() {
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;
      try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  if (loading) return <div className="p-48 text-center animate-pulse">Gathering thoughts...</div>;
  if (!post) return <div className="p-48 text-center">Article not found. <Link to="/blog" className="underline">Back to Journal</Link></div>;

  return (
    <article className="pt-32 pb-24 px-6 md:px-12">
      <Helmet>
        <title>{post.title} | Aura Creative Journal</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-widest opacity-40 italic">
            <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}</div>
            <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8 leading-[0.9]">{post.title}</h1>
          <p className="text-xl text-black/60 italic leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="aspect-[16/9] w-full bg-[#f0f0f0] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
           <img 
              src={post.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000"} 
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
           />
        </div>

        <div className="prose prose-lg max-w-none prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-p:text-black/70 prose-p:leading-loose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <footer className="mt-24 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black"></div>
              <div>
                 <p className="text-sm font-bold uppercase tracking-tight">Written by Aura</p>
                 <p className="text-[10px] uppercase tracking-widest opacity-40">Creative Lead</p>
              </div>
           </div>
           <button className="bg-black text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
              Share Entry
           </button>
        </footer>
      </div>
    </article>
  );
}
