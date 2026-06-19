import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Ruler, Bed, Bath, ArrowLeft, Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProperty } from '../hooks/useProperties';
import { inquiryService } from '../services/api';
import AgentChat from '../components/AgentChat';
import toast from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: property, isLoading, isError } = useProperty(Number(id));
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: 'Hi, I am interested in this property. Please share more details.'
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [chatInfo, setChatInfo] = useState({ active: false, userName: '' });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <Loader2 className="animate-spin text-slate-900 dark:text-yellow-400" size={48} />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="py-20 text-center bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100">
        <h2 className="text-2xl font-bold">Property not found</h2>
        <Link to="/properties" className="text-slate-900 dark:text-yellow-400 underline mt-4 inline-block font-semibold">
          Back to listings
        </Link>
      </div>
    );
  }

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80";
  const images = property.images && property.images.length > 0
    ? property.images
    : [{ image_url: DEFAULT_IMAGE, is_main: true }];
  
  const displayImage = images[selectedImageIndex]?.image_url || DEFAULT_IMAGE;

  const whatsappMessage = `Hi AND Real Estate, I am interested in the property: ${property.title} (ID: ${property.id}). Please share more details.`;
  const whatsappUrl = `https://wa.me/919533691365?text=${encodeURIComponent(whatsappMessage)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await inquiryService.create({
        name: formData.name,
        phone: formData.phone,
        subject: `Inquiry on property: ${property.title}`,
        message: formData.message,
        property_id: property.id
      });
      
      toast.success('Inquiry submitted successfully!');
      
      // Open Rajesh Kumar Consultant Agent Chat
      setChatInfo({
        active: true,
        userName: formData.name
      });
      
      // Clear form
      setFormData({ name: '', phone: '', message: 'Hi, I am interested in this property. Please share more details.' });
    } catch (err) {
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300"
    >
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/properties" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft size={18} />
            Back to Properties
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex gap-2">
                <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {property.property_type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  property.category === 'rent' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-green-650 text-white'
                }`}>
                  For {property.category === 'rent' ? 'Rent' : 'Sale'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">{property.title}</h1>
              <div className="flex items-center gap-2 text-slate-400 mt-2">
                <MapPin size={20} />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">Price</p>
              <p className="text-4xl font-extrabold text-yellow-400">{property.price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image Display */}
          <div className="space-y-4">
            <div className="aspect-video bg-slate-200 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800">
              <img 
                src={displayImage} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {images.map((img, index) => (
                  <button
                    key={img.id || index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 ${
                      selectedImageIndex === index ? 'border-yellow-400 scale-95 shadow-md' : 'border-transparent'
                    }`}
                  >
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs / Area Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {property.area_sqft && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center shadow-xs">
                <Ruler className="text-slate-900 dark:text-yellow-400 mb-2" size={24} />
                <span className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Area</span>
                <span className="font-bold text-slate-850 dark:text-slate-100 mt-1">{property.area_sqft.toLocaleString('en-IN')} sq.ft</span>
              </div>
            )}
            {property.bedrooms && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center shadow-xs">
                <Bed className="text-slate-900 dark:text-yellow-400 mb-2" size={24} />
                <span className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Bedrooms</span>
                <span className="font-bold text-slate-850 dark:text-slate-100 mt-1">{property.bedrooms} BHK</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center shadow-xs">
                <Bath className="text-slate-900 dark:text-yellow-400 mb-2" size={24} />
                <span className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Bathrooms</span>
                <span className="font-bold text-slate-850 dark:text-slate-100 mt-1">{property.bathrooms} Bath</span>
              </div>
            )}
          </div>

          {/* Property Description */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs">
            <h3 className="text-2xl font-bold mb-4">Description</h3>
            <p className="text-gray-650 dark:text-slate-350 text-base leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>
        </div>

        {/* Action Widgets Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 sticky top-28 space-y-6">
            
            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect Instantly</h3>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-md shadow-green-100 dark:shadow-none text-sm"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <a 
                  href="tel:+919533691365"
                  className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-150 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                >
                  <Phone size={18} />
                  Call Agent
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <h3 className="text-lg font-bold mb-4">Interested? Send Inquiry</h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Your Name</label>
                  <input 
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sujan"
                    className="w-full border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    className="w-full border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                  <textarea 
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 dark:text-slate-100 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full bg-slate-900 dark:bg-yellow-400 text-white dark:text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-yellow-300 transition-colors disabled:opacity-75 cursor-pointer text-sm"
                >
                  {submitLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  Send inquiry & chat
                </button>
              </form>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <h4 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assigned Agent</h4>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">AND Real Estate Team</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Ongole Office</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating simulated chat agent widget */}
      {chatInfo.active && (
        <AgentChat
          propertyTitle={property.title}
          userName={chatInfo.userName}
          onClose={() => setChatInfo({ active: false, userName: '' })}
        />
      )}
    </motion.div>
  );
};

export default PropertyDetails;
