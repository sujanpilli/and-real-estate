import { RotateCcw } from 'lucide-react';

const PropertyFilter = ({ filters, setFilters, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm mb-8 border border-slate-100 dark:border-slate-800 transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Location search */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</label>
          <input 
            type="text" 
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g. Ongole" 
            className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all"
          />
        </div>

        {/* Property type filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Property Type</label>
          <select 
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all"
          >
            <option value="">All Types</option>
            <option value="Plot">Plot</option>
            <option value="House">House</option>
            <option value="Warehouse">Warehouse</option>
          </select>
        </div>

        {/* Price range filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price Range</label>
          <select 
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all"
          >
            <option value="">Any Price</option>
            <option value="0-2000000">Under ₹20 Lakhs</option>
            <option value="2000000-5000000">₹20 Lakhs - ₹50 Lakhs</option>
            <option value="5000000-10000000">₹50 Lakhs - ₹1 Cr</option>
            <option value="10000000+">Above ₹1 Cr</option>
          </select>
        </div>

        {/* Bedrooms filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">BHK / Bedrooms</label>
          <select 
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all"
          >
            <option value="">All BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        {/* Sort filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sort By</label>
          <select 
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all"
          >
            <option value="recent">Recently Added</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="area_desc">Area: Largest</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-colors outline-none cursor-pointer"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilter;
