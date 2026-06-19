import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import InsightsDashboard from '../components/InsightsDashboard';
import { motion } from 'framer-motion';
import { useProperties } from '../hooks/useProperties';
import { Loader2, Heart } from 'lucide-react';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showFavsParam = searchParams.get('favorites') === 'true';

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceRange: '',
    bedrooms: '',
    sortBy: 'recent'
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(showFavsParam);
  const [favorites, setFavorites] = useState([]);

  // Sync favorites query param with state
  useEffect(() => {
    setShowOnlyFavorites(showFavsParam);
  }, [showFavsParam]);

  // Load favorites from local storage
  const loadFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  };

  useEffect(() => {
    loadFavorites();
    window.addEventListener('favorites-updated', loadFavorites);
    return () => {
      window.removeEventListener('favorites-updated', loadFavorites);
    };
  }, []);

  // Map frontend filters to API parameters
  const apiParams = useMemo(() => {
    const params = {
      sortBy: filters.sortBy
    };
    if (filters.location) params.location = filters.location;
    if (filters.type) params.property_type = filters.type;
    if (filters.bedrooms) params.bedrooms = Number(filters.bedrooms);
    
    if (filters.priceRange) {
      if (filters.priceRange.endsWith('+')) {
        params.min_price = 10000000;
      } else {
        const [min, max] = filters.priceRange.split('-').map(Number);
        params.min_price = min;
        params.max_price = max;
      }
    }
    return params;
  }, [filters]);

  const { data: properties, isLoading, isError } = useProperties(apiParams);

  // Filter properties client-side only for favorites if the toggle is active
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    if (showOnlyFavorites) {
      return properties.filter(property => favorites.includes(property.id));
    }
    return properties;
  }, [properties, showOnlyFavorites, favorites]);

  const handleReset = () => {
    setFilters({
      location: '',
      type: '',
      priceRange: '',
      bedrooms: '',
      sortBy: 'recent'
    });
    setShowOnlyFavorites(false);
    setSearchParams({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Properties Catalog</h2>
          
          <button
            onClick={() => {
              const next = !showOnlyFavorites;
              setShowOnlyFavorites(next);
              setSearchParams(next ? { favorites: 'true' } : {});
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border outline-none cursor-pointer ${
              showOnlyFavorites 
                ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-100 dark:shadow-none' 
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Heart size={16} className={showOnlyFavorites ? 'fill-white' : ''} />
            {showOnlyFavorites ? 'Show All Properties' : `My Shortlist (${favorites.length})`}
          </button>
        </div>
        
        {/* Market Insights Dashboard */}
        <InsightsDashboard properties={properties || []} />

        {/* Filter Bar */}
        <PropertyFilter filters={filters} setFilters={setFilters} onReset={handleReset} />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-slate-900 dark:text-yellow-400" size={48} />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load properties. Please check your connection and try again.
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800 transition-colors">
            <p className="text-gray-500 dark:text-slate-400 text-lg">No properties match your search criteria.</p>
            <button 
              onClick={handleReset}
              className="mt-4 bg-slate-900 dark:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Properties;
