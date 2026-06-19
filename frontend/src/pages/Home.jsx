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
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300"
    >
      <Hero />

      {/* About Section with Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            About AND Real Estate
          </h3>
          <p className="text-lg text-gray-600 dark:text-slate-400 leading-8">  
            AND Real Estate provides house plots, residential properties,
            warehouse leasing, construction services, and loan assistance.
            Our goal is to help customers find the right property at the
            right price with complete support throughout the buying process.
          </p>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
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
      <section className="bg-slate-50 dark:bg-slate-900/40 py-20 border-y border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <h3 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Featured Properties
              </h3>
              <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm font-medium">Handpicked premium listings for you</p>
            </div>
            <a href="/properties" className="text-slate-900 dark:text-yellow-400 font-bold hover:underline text-sm">
              View All Properties &rarr;
            </a>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-slate-900 dark:text-yellow-400" size={48} />
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500 font-medium">
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

      {/* Services Section with Logo Accent Colors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-extrabold text-center mb-16 tracking-tight text-slate-900 dark:text-slate-100">Our Services</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                title: "Property Sales", 
                desc: "Buy or sell house plots and residential homes with complete verify guidance.",
                accent: "border-t-4 border-t-red-500" 
              },
              { 
                title: "Construction", 
                desc: "Professional construction services for building your custom dream homes.",
                accent: "border-t-4 border-t-yellow-500" 
              },
              { 
                title: "Warehousing", 
                desc: "Industrial and storage storage warehouse options for commercial businesses.",
                accent: "border-t-4 border-t-blue-600" 
              },
              { 
                title: "Loan Assistance", 
                desc: "Hassle-free process support for bank property loans and mortgages.",
                accent: "border-t-4 border-t-emerald-600" 
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 border border-slate-100 dark:border-slate-800 ${service.accent}`}
              >
                <h4 className="text-xl font-bold mb-3 text-slate-950 dark:text-slate-100">{service.title}</h4>
                <p className="text-gray-650 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
