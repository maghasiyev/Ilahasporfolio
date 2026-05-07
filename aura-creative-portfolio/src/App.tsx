import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import CategoryView from './pages/CategoryView';
import Blog from './pages/Blog';
import BlogPostView from './pages/BlogPostView';
import About from './pages/About';
import { Contact } from './pages/Contact';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Admin/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <title>Aura Creative | Portfolio & Design Studio</title>
          <meta name="description" content="Portfolio of a creative graphic designer and illustrator showcasing bold visual storytelling and eccentric design concepts." />
        </Helmet>
        <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <ConditionalNavbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categorySlug" element={<CategoryView />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPostView />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <ConditionalFooter />
      </div>
    </Router>
    </HelmetProvider>
  );
}

// Don't show navbar on dashboard
function ConditionalNavbar() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/admin');
  if (isDashboard) return null;
  return <Navbar />;
}

// Don't show footer on dashboard
function ConditionalFooter() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/admin');
  if (isDashboard) return null;
  return <Footer />;
}
