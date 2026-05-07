import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { LogIn, ShieldAlert } from 'lucide-react';

const ADMIN_EMAIL = 'murad.agasiyev@gmail.com';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  // Sync auth state
  useState(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  });

  if (user && user.email === ADMIN_EMAIL && user.emailVerified) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== ADMIN_EMAIL) {
        setError('Access denied: You are not the authorized administrator.');
        await auth.signOut();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-white text-5xl font-black tracking-tighter uppercase mb-2">Aura</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-12">Management Portal</p>
        
        <div className="bg-white/5 rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <LogIn className="text-white w-6 h-6" />
          </div>
          
          <h2 className="text-white text-2xl font-bold mb-4">Admin Authentication</h2>
          <p className="text-white/60 text-sm mb-8">Only authorized personnel can modify the portfolio content.</p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex items-center gap-3 text-left">
              <ShieldAlert className="text-red-500 w-5 h-5 shrink-0" />
              <p className="text-red-500 text-xs font-bold leading-tight uppercase">{error}</p>
            </div>
          )}
          
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/80 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign in with Google"}
            <span className="w-4 h-4">G</span>
          </button>
        </div>
        
        <p className="mt-8 text-white/20 text-[10px] uppercase font-bold tracking-widest">
          Secure System Access Restricted to murad.agasiyev@gmail.com
        </p>
      </div>
    </div>
  );
}
