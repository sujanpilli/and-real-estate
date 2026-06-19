import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'framer-motion';
import { useFeaturedProperties } from '../hooks/useProperties';
import { Loader2, Users, Building, ShieldCheck } from 'lucide-react';

const Home = () => {
  const { data: featuredProperties, isLoading, isError } = useFeaturedProperties();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 lg:h-[calc(100vh-64px)] lg:overflow-hidden lg:p-6 transition-colors duration-300"
    >
      {/* ========================================================= */}
      {/* DESKTOP VIEWPORT-LOCKED LAYOUT (lg:flex) */}
      {/* ========================================================= */}
      <div className="hidden lg:flex h-full gap-6 overflow-hidden">
        {/* Left Column: Hero (Compact) */}
        <div className="w-[360px] xl:w-[400px] flex-shrink-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/5">
          {/* Ambient glows inside left column */}
          <div className="absolute top-[-10%] left-[5%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <Hero compact={true} />
          
          <div className="text-[10px] text-slate-400/60 text-center mt-4">
            &copy; {new Date().getFullYear()} AND Real Estate. All rights reserved.
          </div>
        </div>

        {/* Right Column: Content panels */}
        <div className="flex-1 h-full overflow-hidden flex flex-col gap-6">
          
          {/* Top Panel: About & Stats */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl flex-shrink-0 flex items-center justify-between gap-6 shadow-xs transition-colors">
            <div className="max-w-[400px] xl:max-w-[500px]">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">About Us</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                AND Real Estate provides premium house plots, residential properties, warehouse leasing, construction services, and loan assistance in Ongole and Andhra Pradesh.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { label: "Clients", value: "500+", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
                { label: "Properties", value: "150+", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
                { label: "Verified", value: "100%", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" }
              ].map((stat, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750/80 rounded-xl text-center space-y-0.5 min-w-[75px] shadow-2xs">
                  <span className={`text-base font-black ${stat.color} block`}>{stat.value}</span>
                  <span className="text-[9px] font-bold text-gray-500 dark:text-slate-400 block uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Panel: Featured Properties */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl flex-grow overflow-hidden flex flex-col shadow-xs transition-colors">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Featured Listings</h3>
              <a href="/properties" className="text-slate-900 dark:text-yellow-400 font-bold hover:underline text-xs">
                View Catalog &rarr;
              </a>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center flex-grow">
                <Loader2 className="animate-spin text-slate-900 dark:text-yellow-400" size={32} />
              </div>
            ) : isError ? (
              <div className="text-center text-xs text-red-500 flex-grow flex items-center justify-center">
                Failed to load properties.
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
                {featuredProperties?.slice(0, 3).map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Panel: Services */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl flex-shrink-0 shadow-xs transition-colors">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">Our Core Services</h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { title: "Property Sales", desc: "House plots & residential homes", border: "border-t-4 border-t-red-500" },
                { title: "Construction", desc: "Build your custom dream homes", border: "border-t-4 border-t-yellow-500" },
                { title: "Warehousing", desc: "Industrial leasing & storage", border: "border-t-4 border-t-blue-600" },
                { title: "Loan Assistance", desc: "Mortgages & processing support", border: "border-t-4 border-t-emerald-600" }
              ].map((service, i) => (
                <div key={i} className={`p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750/80 hover:scale-[1.01] transition-all shadow-2xs ${service.border}`}>
                  <h4 className="text-xs font-bold text-slate-950 dark:text-slate-100">{service.title}</h4>
                  <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1 leading-normal">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE/TABLET SCROLLING LAYOUT (lg:hidden) */}
      {/* ========================================================= */}
      <div className="block lg:hidden space-y-0">
        <Hero />
        
        {/* About Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              About AND Real Estate
            </h3>
            <p className="text-base text-gray-600 dark:text-slate-400 leading-relaxed">  
              AND Real Estate provides house plots, residential properties,
              warehouse leasing, construction services, and loan assistance.
              Our goal is to help customers find the right property at the
              right price with complete support throughout the buying process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">500+</h4>
              <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">Happy Clients</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center">
                <Building size={24} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">150+</h4>
              <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">Properties Handled</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">100%</h4>
              <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">Verified & Clear Titles</p>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-y border-slate-100 dark:border-slate-900/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  Featured Properties
                </h3>
                <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm font-medium">Handpicked premium listings for you</p>
              </div>
              <a href="/properties" className="text-slate-900 dark:text-yellow-400 font-bold hover:underline text-sm">
                View All Properties &rarr;
              </a>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="animate-spin text-slate-900 dark:text-yellow-400" size={40} />
              </div>
            ) : isError ? (
              <div className="text-center py-16 text-red-500 font-medium">
                Failed to load properties. Please try again later.
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {featuredProperties?.slice(0, 3).map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-extrabold text-center mb-12 tracking-tight text-slate-900 dark:text-slate-100">Our Services</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Property Sales", desc: "Buy or sell house plots and residential homes with complete verify guidance.", accent: "border-t-4 border-t-red-500" },
                { title: "Construction", desc: "Professional construction services for building your custom dream homes.", accent: "border-t-4 border-t-yellow-500" },
                { title: "Warehousing", desc: "Industrial and storage storage warehouse options for commercial businesses.", accent: "border-t-4 border-t-blue-600" },
                { title: "Loan Assistance", desc: "Hassle-free process support for bank property loans and mortgages.", accent: "border-t-4 border-t-emerald-600" }
              ].map((service, index) => (
                <div key={index} className={`p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 ${service.accent}`}>
                  <h4 className="text-lg font-bold mb-2 text-slate-950 dark:text-slate-100">{service.title}</h4>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
