import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { propertyService } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  property_type: z.enum(['Plot', 'House', 'Warehouse']),
  price: z.string().min(1, 'Price is required'),
  price_value: z.number().min(0),
  location: z.string().min(1, 'Location is required'),
  area_sqft: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  featured: z.boolean().default(false),
  is_sold: z.boolean().default(false),
});

const PropertyForm = ({ initialData, isEdit = false }) => {
  const [images, setImages] = useState(initialData?.images || []);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      property_type: 'Plot',
      price_value: 0,
      featured: false,
      is_sold: false
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await propertyService.update(initialData.id, data);
        toast.success('Property updated successfully');
      } else {
        response = await propertyService.create(data);
        const newProperty = response.data;
        
        // Handle image uploads sequentially for Sprint 1
        for (const img of images) {
          if (img.file) {
            const formData = new FormData();
            formData.append('file', img.file);
            await propertyService.uploadImage(newProperty.id, formData);
          }
        }
        toast.success('Property created successfully');
      }
      navigate('/admin/properties');
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Property Title</label>
          <input 
            {...register('title')}
            className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all" 
            placeholder="e.g. Luxury 3BHK Villa"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Property Type</label>
          <select 
            {...register('property_type')}
            className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all"
          >
            <option value="Plot">Plot</option>
            <option value="House">House</option>
            <option value="Warehouse">Warehouse</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Display Price</label>
          <input 
            {...register('price')}
            className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all" 
            placeholder="e.g. ₹45 Lakhs"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Numeric Price (for filtering)</label>
          <input 
            {...register('price_value', { valueAsNumber: true })}
            type="number"
            className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all" 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Location</label>
          <input 
            {...register('location')}
            className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all" 
            placeholder="e.g. Ongole, Andhra Pradesh"
          />
          {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Description</label>
          <textarea 
            {...register('description')}
            rows="4"
            className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 transition-all" 
            placeholder="Detailed property information..."
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        <div className="flex gap-8 md:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer text-slate-800 dark:text-slate-200">
            <input type="checkbox" {...register('featured')} className="w-4 h-4 rounded text-slate-900 dark:text-yellow-400 border-slate-350 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-yellow-400" />
            <span className="text-sm font-semibold">Featured Property</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400">
            <input type="checkbox" {...register('is_sold')} className="w-4 h-4 rounded text-red-500 border-slate-350 dark:border-slate-800 focus:ring-red-500" />
            <span className="text-sm font-semibold">Mark as Sold</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-850 dark:text-slate-200">Property Images</label>
        <ImageUpload images={images} setImages={setImages} />
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="bg-slate-900 dark:bg-yellow-400 text-white dark:text-slate-950 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-yellow-300 transition-colors disabled:opacity-70 cursor-pointer"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isEdit ? 'Update Property' : 'Save Property'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
