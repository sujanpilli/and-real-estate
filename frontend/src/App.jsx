import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './router/AppRouter';

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-grow">
        <AppRouter />
      </main>
      <div className={isHomePage ? "lg:hidden animate-fade-in" : ""}>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
