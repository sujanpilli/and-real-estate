import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, BarChart3, Tag, Maximize, Map, Home, Warehouse } from 'lucide-react';

const InsightsDashboard = ({ properties = [] }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const stats = useMemo(() => {
    const total = properties.length;
    
    // Categorize
    const plots = properties.filter(p => p.property_type === 'Plot');
    const houses = properties.filter(p => p.property_type === 'House');
    const warehouses = properties.filter(p => p.property_type === 'Warehouse');
    
    // Average prices (price_value)
    const avgPlotPrice = plots.length > 0
      ? plots.reduce((sum, p) => sum + (p.price_value || 0), 0) / plots.length
      : 0;

    const avgHousePrice = houses.length > 0
      ? houses.reduce((sum, p) => sum + (p.price_value || 0), 0) / houses.length
      : 0;
      
    const avgWarehousePrice = warehouses.length > 0
      ? warehouses.reduce((sum, p) => sum + (p.price_value || 0), 0) / warehouses.length
      : 0;

    // Max area
    const maxArea = properties.length > 0
      ? properties.reduce((max, p) => (p.area_sqft || 0) > max ? (p.area_sqft || 0) : max, 0)
      : 0;

    return {
      total,
      avgPlotPrice,
      avgHousePrice,
      avgWarehousePrice,
      maxArea
    };
  }, [properties]);

  const formatIndianCurrency = (value) => {
    if (!value) return '₹0';
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2).replace(/\.00$/, '')} Lakhs`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm mb-8 transition-all overflow-hidden duration-300">
      {/* Header Panel */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-left outline-none"
      >
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <BarChart3 size={20} className="text-slate-900 dark:text-yellow-400" />
          <h3 className="font-bold text-lg">Market Insights Dashboard</h3>
        </div>
        <div className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </button>

      {/* Stats Collapsible Section */}
      {!isCollapsed && (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 transition-all duration-300">
          {/* Card 1: Total Listings */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
            <div className="p-2 bg-slate-900 dark:bg-yellow-400/10 text-white dark:text-yellow-400 rounded-lg">
              <Tag size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Total Listings</p>
              <h4 className="text-xl font-black mt-1 text-slate-900 dark:text-slate-100">{stats.total} listings</h4>
            </div>
          </div>

          {/* Card 2: Average Plot Price */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
            <div className="p-2 bg-slate-900 dark:bg-yellow-400/10 text-white dark:text-yellow-400 rounded-lg">
              <Map size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Avg Plot Price</p>
              <h4 className="text-xl font-black mt-1 text-slate-900 dark:text-slate-100">
                {stats.avgPlotPrice > 0 ? formatIndianCurrency(stats.avgPlotPrice) : "N/A"}
              </h4>
            </div>
          </div>

          {/* Card 3: Average House Price */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
            <div className="p-2 bg-slate-900 dark:bg-yellow-400/10 text-white dark:text-yellow-400 rounded-lg">
              <Home size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Avg House Price</p>
              <h4 className="text-xl font-black mt-1 text-slate-900 dark:text-slate-100">
                {stats.avgHousePrice > 0 ? formatIndianCurrency(stats.avgHousePrice) : "N/A"}
              </h4>
            </div>
          </div>

          {/* Card 4: Largest Carpet Area */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
            <div className="p-2 bg-slate-900 dark:bg-yellow-400/10 text-white dark:text-yellow-400 rounded-lg">
              <Maximize size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Max Land/Carpet Area</p>
              <h4 className="text-xl font-black mt-1 text-slate-900 dark:text-slate-100">
                {stats.maxArea > 0 ? `${stats.maxArea.toLocaleString('en-IN')} sq.ft` : "0 sq.ft"}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsDashboard;
