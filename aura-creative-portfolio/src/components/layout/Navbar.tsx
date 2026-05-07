import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Twitter, Linkedin } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Graphic design', path: '/graphic-design' },
  { name: 'Illustrations', path: '/illustrations' },
  { name: 'Sketches', path: '/sketches' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12",
        isScrolled ? "bg-amber-500/90 backdrop-blur-md py-4 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link 
          to="/" 
          className={cn(
            "text-2xl font-black tracking-tighter uppercase group flex items-center gap-2",
            isScrolled ? "text-white" : "text-amber-600"
          )}
        >
          <span className="block group-hover:rotate-12 transition-transform duration-300">Aura</span>
          <span className="text-sm font-medium tracking-normal lowercase opacity-70">Creative</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs uppercase font-semibold tracking-widest hover:opacity-100 transition-colors relative group",
                isScrolled 
                  ? (location.pathname === item.path ? "text-white" : "text-white/60")
                  : (location.pathname === item.path ? "text-amber-600" : "text-amber-600/60")
              )}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className={cn("absolute -bottom-1 left-0 w-full h-px", isScrolled ? "bg-white" : "bg-amber-600")}
                />
              )}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className={cn(
              "px-5 py-2 text-xs uppercase font-bold tracking-widest transition-all rounded-full",
              isScrolled 
                ? "bg-white text-amber-600 hover:bg-slate-100" 
                : "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-200"
            )}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8 p-12 md:hidden"
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-4xl font-bold tracking-tighter uppercase hover:italic"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex gap-6">
              <Instagram className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer" />
              <Twitter className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer" />
              <Linkedin className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
