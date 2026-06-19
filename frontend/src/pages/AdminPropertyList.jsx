import AdminLayout from '../components/AdminLayout';
import { useProperties } from '../hooks/useProperties';
import { Plus, Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/api';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const AdminPropertyList = () => {
  const { data: properties, isLoading } = useProperties();
  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    try {
      await propertyService.delete(id);
      toast.success('Property deleted');
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Properties</h2>
          <p className="text-gray-500 mt-1">Manage your property listings.</p>
        </div>
        <Link 
          to="/admin/properties/new" 
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          <Plus size={20} />
          Add Property
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-slate-900" size={48} />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {properties?.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                        {property.images?.[0] && (
                          <img src={property.images[0].image_url} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{property.title}</p>
                        <p className="text-xs text-gray-500">{property.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">{property.property_type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${
                      property.category === 'rent' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {property.category === 'rent' ? 'Rent' : 'Sale'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{property.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    {property.is_sold ? (
                      <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase">Sold</span>
                    ) : property.featured ? (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full uppercase">Featured</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        to={`/properties/${property.id}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <Link 
                        to={`/admin/properties/edit/${property.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyList;
