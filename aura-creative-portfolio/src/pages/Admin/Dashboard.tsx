import { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Plus, Trash2, Edit3, LogOut, Image, FileText, Layout, Check, X } from 'lucide-react';
import type { Project, BlogPost } from '../../types';
import { cn } from '../../lib/utils';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Graphic Design',
    imageUrl: '',
    description: '',
    youtubeId: ''
  });

  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    published: true
  });

  async function fetchData() {
    setLoading(true);
    try {
      const pSnapshot = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
      setProjects(pSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      
      const bSnapshot = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      setPosts(bSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const ref = doc(db, 'projects', editingProject.id);
        await updateDoc(ref, {
          ...projectForm,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectForm,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      setShowProjectModal(false);
      setEditingProject(null);
      fetchData();
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        const ref = doc(db, 'posts', editingPost.id);
        await updateDoc(ref, {
          ...postForm,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postForm,
          createdAt: new Date().toISOString(),
          published: postForm.published
        });
      }
      setShowPostModal(false);
      setEditingPost(null);
      fetchData();
    } catch (err) {
      alert('Error saving post');
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="p-24 text-center font-black uppercase text-xs tracking-widest animate-pulse">Loading System...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-8">
        <h1 className="text-2xl font-black mb-12 tracking-tighter uppercase">Aura CMS</h1>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === 'projects' ? "bg-black text-white" : "hover:bg-gray-100 text-black/40"
            )}
          >
            <Layout className="w-4 h-4" /> Portfolio
          </button>
          <button 
             onClick={() => setActiveTab('blog')}
             className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === 'blog' ? "bg-black text-white" : "hover:bg-gray-100 text-black/40"
            )}
          >
            <FileText className="w-4 h-4" /> Journal
          </button>
        </nav>

        <button 
          onClick={() => auth.signOut()}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 text-xs font-bold uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase">{activeTab === 'projects' ? 'Portfolio Projects' : 'Blog Archive'}</h2>
              <p className="text-black/40 text-xs font-bold uppercase tracking-widest mt-2">Manage your public storefront</p>
            </div>
            <button 
              onClick={() => activeTab === 'projects' ? setShowProjectModal(true) : setShowPostModal(true)}
              className="bg-black text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {activeTab === 'projects' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gray-100 italic relative">
                    <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingProject(proj);
                          setProjectForm({
                            title: proj.title,
                            category: proj.category,
                            imageUrl: proj.imageUrl,
                            description: proj.description || '',
                            youtubeId: proj.youtubeId || ''
                          });
                          setShowProjectModal(true);
                        }}
                        className="bg-white p-2 rounded-full shadow-sm text-black hover:bg-black hover:text-white"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('projects', proj.id)}
                        className="bg-white p-2 rounded-full shadow-sm text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-tight">{proj.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-1">{proj.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
               {posts.map(post => (
                 <div key={post.id} className="bg-white p-6 rounded-2xl flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-6">
                       <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden">
                          <img src={post.imageUrl || "https://picsum.photos/200"} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <h3 className="font-bold uppercase tracking-tight">{post.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                             <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{new Date(post.createdAt).toLocaleDateString()}</span>
                             <span className={cn("text-[8px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full", post.published ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                                {post.published ? 'Published' : 'Draft'}
                             </span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button 
                         onClick={() => {
                           setEditingPost(post);
                           setPostForm({
                             title: post.title,
                             excerpt: post.excerpt,
                             content: post.content,
                             imageUrl: post.imageUrl || '',
                             published: post.published
                           });
                           setShowPostModal(true);
                         }}
                         className="p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all"
                       >
                         <Edit3 className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => handleDelete('posts', post.id)}
                         className="p-3 bg-gray-50 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <form onSubmit={handleSaveProject} className="bg-white w-full max-w-xl rounded-3xl p-12 relative overflow-hidden">
            <button 
              type="button" 
              onClick={() => setShowProjectModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">{editingProject ? 'Edit' : 'New'} Project</h3>
            <div className="space-y-6">
              <input 
                placeholder="Project Title"
                className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm font-bold uppercase tracking-tight"
                value={projectForm.title}
                onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                required
              />
              <select 
                className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-[10px] font-black uppercase tracking-widest"
                value={projectForm.category}
                onChange={e => setProjectForm({...projectForm, category: e.target.value as any})}
              >
                <option value="Graphic Design">Graphic Design</option>
                <option value="Illustrations">Illustrations</option>
                <option value="Sketches">Sketches</option>
              </select>
              <input 
                placeholder="Image URL"
                className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm font-medium"
                value={projectForm.imageUrl}
                onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})}
                required
              />
              <textarea 
                placeholder="Brief Description"
                rows={3}
                className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm font-medium"
                value={projectForm.description}
                onChange={e => setProjectForm({...projectForm, description: e.target.value})}
              />
            </div>
            <button className="w-full bg-black text-white mt-12 py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black/80 transition-all">
              Commit Changes
            </button>
          </form>
        </div>
      )}

      {/* Blog Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <form onSubmit={handleSavePost} className="bg-white w-full max-w-3xl rounded-3xl p-12 relative overflow-hidden">
             <button 
              type="button" 
              onClick={() => setShowPostModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">{editingPost ? 'Edit' : 'New'} Article</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <input 
                placeholder="Article Title"
                className="col-span-2 w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm font-bold uppercase tracking-tight"
                value={postForm.title}
                onChange={e => setPostForm({...postForm, title: e.target.value})}
                required
              />
              <input 
                placeholder="Feature Image URL"
                className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm"
                value={postForm.imageUrl}
                onChange={e => setPostForm({...postForm, imageUrl: e.target.value})}
              />
              <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4">
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Status:</span>
                 <button 
                   type="button"
                   onClick={() => setPostForm({...postForm, published: !postForm.published})}
                   className={cn("px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all", postForm.published ? "bg-green-500 text-white" : "bg-red-500 text-white")}
                 >
                   {postForm.published ? 'Published' : 'Draft'}
                 </button>
              </div>
            </div>
            <textarea 
               placeholder="Short Excerpt"
               rows={2}
               className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm mb-6"
               value={postForm.excerpt}
               onChange={e => setPostForm({...postForm, excerpt: e.target.value})}
            />
            <textarea 
               placeholder="Main Content (Markdown supported)"
               rows={10}
               className="w-full px-4 py-4 bg-gray-50 rounded-xl border-none text-sm font-mono"
               value={postForm.content}
               onChange={e => setPostForm({...postForm, content: e.target.value})}
               required
            />
            <button className="w-full bg-black text-white mt-12 py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black/80 transition-all">
              Save Entry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
