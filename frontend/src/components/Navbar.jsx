import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [favCount, setFavCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const updateFavs = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavCount(favs.length);
  };

  useEffect(() => {
    updateFavs();
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    window.addEventListener('favorites-updated', updateFavs);
    window.addEventListener('storage', updateFavs);
    return () => {
      window.removeEventListener('favorites-updated', updateFavs);
      window.removeEventListener('storage', updateFavs);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      toast.success('Switched to Dark Mode');
    } else {
      document.documentElement.classList.remove('dark');
      toast.success('Switched to Light Mode');
    }
  };

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/images/logo.png" 
            alt="AND Real Estate" 
            className="h-10 w-auto rounded bg-white p-0.5 group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="text-xl font-bold tracking-tight hover:text-yellow-400 transition-colors hidden sm:block">
            AND Real Estate
          </span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors text-sm font-medium">Home</Link>
          <Link to="/properties" className="hover:text-yellow-400 transition-colors text-sm font-medium">Properties</Link>
          <Link to="/services" className="hover:text-yellow-400 transition-colors text-sm font-medium">Services</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition-colors text-sm font-medium">Contact</Link>
          
          <div className="w-px h-5 bg-slate-700 hidden sm:block"></div>

          {/* Favorites/Shortlist Link */}
          <Link 
            to="/properties?favorites=true"
            className="flex items-center gap-1.5 text-gray-300 hover:text-red-400 transition-colors relative"
            title="View Shortlisted Properties"
          >
            <Heart size={20} className={favCount > 0 ? "fill-red-500 text-red-500" : ""} />
            {favCount > 0 && (
              <span className="absolute -top-2.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {favCount}
              </span>
            )}
            <span className="hidden sm:inline text-sm font-medium">Shortlist</span>
          </Link>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="text-gray-300 hover:text-yellow-400 transition-colors p-1 rounded-lg hover:bg-slate-800"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
