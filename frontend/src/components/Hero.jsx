import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-32 md:py-40 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[5%] w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-yellow-400/5 dark:bg-yellow-400/3 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col lg:flex-row justify-between items-center gap-12">
        <div className="max-w-2xl space-y-6">
          <span className="inline-block bg-yellow-400/20 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Premium Real Estate & Construction
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Find Your <span className="text-yellow-400">Dream Property</span> in Andhra Pradesh
          </h2>

          <p className="text-lg md:text-xl text-slate-350 max-w-xl leading-relaxed">
            House Plots, Residential Homes, Warehouse leasing, and Professional Construction Services with complete loan assistance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <Link 
              to="/properties" 
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-yellow-400/10 text-sm"
            >
              Explore Properties
              <ArrowRight size={18} />
            </Link>

            <Link 
              to="/contact" 
              className="border-2 border-white/80 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Small floating branding / badge card */}
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-white w-full max-w-sm shadow-2xl self-center hidden lg:block space-y-4">
          <div className="flex gap-2 items-center">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active Ventures</span>
          </div>
          <h3 className="text-2xl font-bold">AND Real Estate</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Assisting you in discovering top locations and verified plots around Ongole & Prakasam district since 2021.
          </p>
          <div className="flex gap-2 pt-2 border-t border-white/10">
            <Phone size={16} className="text-yellow-400" />
            <span className="text-sm font-semibold">+91 9533691365</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
