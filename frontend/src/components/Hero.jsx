import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex flex-col justify-between h-full space-y-6 text-left">
        <div className="space-y-4">
          <span className="inline-block bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Premium Real Estate & Construction
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Find Your <span className="text-yellow-400">Dream Property</span> in India
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-md">
            House Plots, Residential Homes, Warehouse leasing, and Professional Construction Services with complete loan assistance.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link 
              to="/properties" 
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-5 py-3 rounded-xl font-bold flex items-center gap-1.5 transition-all duration-200 text-xs shadow-md shadow-yellow-400/5"
            >
              Explore Properties
              <ArrowRight size={14} />
            </Link>
            <Link 
              to="/contact" 
              className="border border-white/60 hover:border-white hover:bg-white/15 text-white px-5 py-3 rounded-xl font-bold flex items-center transition-all duration-200 text-xs"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Small floating branding / badge card */}
        <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10 text-white w-full space-y-2 mt-auto">
          <div className="flex gap-2 items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-[9px] font-bold text-slate-350 uppercase tracking-widest">Active Ventures</span>
          </div>
          <h3 className="text-lg font-bold">AND Real Estate</h3>
          <p className="text-[11px] text-slate-350 leading-normal">
            Assisting you in discovering top locations and verified plots around Ongole & Prakasam district since 2021.
          </p>
          <div className="flex gap-2 pt-1.5 border-t border-white/5 items-center">
            <Phone size={12} className="text-yellow-400" />
            <span className="text-[11px] font-semibold text-slate-350">+91 9533691365</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-20 md:py-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[5%] w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-yellow-400/5 dark:bg-yellow-400/3 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col lg:flex-row justify-between items-center gap-12">
        <div className="max-w-2xl space-y-5">
          <span className="inline-block bg-yellow-400/20 text-yellow-400 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Premium Real Estate & Construction
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Find Your <span className="text-yellow-400">Dream Property</span> in India
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
            House Plots, Residential Homes, Warehouse leasing, and Professional Construction Services with complete loan assistance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <Link 
              to="/properties" 
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-yellow-400/10 text-sm"
            >
              Explore Properties
              <ArrowRight size={18} />
            </Link>

            <Link 
              to="/contact" 
              className="border-2 border-white/80 hover:border-white hover:bg-white/10 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Small floating branding / badge card */}
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white w-full max-w-xs shadow-2xl self-center hidden lg:block space-y-3">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Active Ventures</span>
          </div>
          <h3 className="text-xl font-bold">AND Real Estate</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Assisting you in discovering top locations and verified plots around Ongole & Prakasam district since 2021.
          </p>
          <div className="flex gap-2 pt-2 border-t border-white/10 items-center">
            <Phone size={14} className="text-yellow-400" />
            <span className="text-xs font-semibold">+91 9533691365</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
