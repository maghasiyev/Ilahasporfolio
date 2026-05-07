import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-amber-950 text-white py-20 px-8 md:px-24 relative overflow-hidden">
      {/* Abstract decorative backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[120px] opacity-20 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-10 -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 max-w-sm leading-tight">
              Let's create something <span className="text-amber-400 italic">extraordinary</span>.
            </h2>
            <a 
              href="mailto:aura@creative.com"
              className="group flex items-center gap-4 text-xl font-medium hover:text-amber-400 transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:border-amber-400 transition-all shadow-lg group-hover:shadow-amber-400/20">
                <Mail className="w-5 h-5" />
              </div>
              aura@creative.com
            </a>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest font-semibold text-amber-300 mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/graphic-design" className="hover:text-amber-400 transition-colors">Graphic Design</Link></li>
              <li><Link to="/illustrations" className="hover:text-amber-400 transition-colors">Illustrations</Link></li>
              <li><Link to="/sketches" className="hover:text-amber-400 transition-colors">Sketches</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Journal</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Me</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest font-semibold text-amber-300 mb-6">Socials</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-white">Instagram <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-white">Dribbble <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-white">Behance <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-white">Twitter <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-amber-400">
          <p>© 2026 Aura Creative Portfolio</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
