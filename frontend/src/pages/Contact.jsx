import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { inquiryService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await inquiryService.create(formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-105 min-h-screen transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-4 tracking-tight text-slate-900 dark:text-slate-100">Contact Us</h2>
        <p className="text-gray-600 dark:text-slate-400 text-center mb-16 max-w-2xl mx-auto text-sm font-medium">
          Have questions about a property or our services? Get in touch with us today.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Get in Touch</h3>
            
            <div className="flex items-start gap-4">
              <div className="bg-slate-200/50 dark:bg-slate-900 p-3 rounded-lg text-slate-900 dark:text-yellow-400">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 dark:text-slate-150 text-base">Phone</h4>
                <p className="text-gray-600 dark:text-slate-400 mt-1">+91 9533691365</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-slate-200/50 dark:bg-slate-900 p-3 rounded-lg text-slate-900 dark:text-yellow-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 dark:text-slate-150 text-base">Address</h4>
                <p className="text-gray-600 dark:text-slate-400 mt-1">Ongole, Andhra Pradesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-slate-200/50 dark:bg-slate-900 p-3 rounded-lg text-slate-900 dark:text-yellow-400">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 dark:text-slate-150 text-base">Email</h4>
                <p className="text-gray-600 dark:text-slate-400 mt-1">info@andrealestate.com</p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-250 dark:border-green-800/30 p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h3>
                <p className="text-green-700 dark:text-green-300 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-green-800 dark:text-green-400 font-bold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg space-y-4 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                {error && <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 rounded-lg text-sm">{error}</div>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all" 
                      placeholder="Phone Number" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Buying Property">Buying Property</option>
                    <option value="Construction Services">Construction Services</option>
                    <option value="Loan Assistance">Loan Assistance</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Message</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="4" 
                    className="w-full border border-slate-200 dark:border-slate-800 bg-transparent dark:text-slate-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 outline-none transition-all" 
                    placeholder="How can we help?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 dark:bg-yellow-400 text-white dark:text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-yellow-300 transition-colors disabled:opacity-70 cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
