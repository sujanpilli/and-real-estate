import { useState, useEffect } from 'react';
import { MapPin, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const PropertyCard = ({ property }) => {
  const { id, title, location, price, description, property_type } = property;
  const [isFavorited, setIsFavorited] = useState(false);

  const displayImage = property.images?.find(img => img.is_main)?.image_url 
    || property.images?.[0]?.image_url 
    || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80";

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorited(favs.includes(id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favs.indexOf(id);
    if (index === -1) {
      favs.push(id);
      setIsFavorited(true);
      toast.success('Property added to shortlist!');
    } else {
      favs.splice(index, 1);
      setIsFavorited(false);
      toast.success('Property removed from shortlist');
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const whatsappMessage = `Hi AND Real Estate, I am interested in the property: ${title} in ${location}. Please share more details.`;
  const whatsappUrl = `https://wa.me/919533691365?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-slate-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold">
            {property_type}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            property.category === 'rent' 
              ? 'bg-purple-600/90 text-white' 
              : 'bg-green-650/90 text-white'
          }`}>
            For {property.category === 'rent' ? 'Rent' : 'Sale'}
          </span>
        </div>
        
        {/* Favorite Floating Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-xs"
          title="Favorite listing"
        >
          <Heart size={18} className={isFavorited ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 truncate" title={title}>
          {title}
        </h4>
        <div className="flex items-center text-gray-500 dark:text-slate-400 mb-2 gap-1 text-sm">
          <MapPin size={16} />
          <span className="truncate">{location}</span>
        </div>

        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          {price}
        </p>
        <p className="text-gray-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm">
          {description}
        </p>

        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link 
            to={`/properties/${id}`}
            className="flex-1 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm shadow-green-100 dark:shadow-none"
            title="Enquire on WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
