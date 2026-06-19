import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/images/logo.png" 
            alt="AND Real Estate" 
            className="h-16 w-16 object-cover rounded-full bg-white p-1 mb-3" 
          />
          <h3 className="text-3xl font-extrabold tracking-tight">
            AND Real Estate
          </h3>
          <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Luxury Property Est. 2021</p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center gap-3 text-lg">
            <Phone className="text-yellow-400" size={24} />
            <span>+91 9533691365</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <MapPin className="text-yellow-400" size={24} />
            <span>Ongole, Andhra Pradesh</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <Mail className="text-yellow-400" size={24} />
            <span>info@andrealestate.com</span>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AND Real Estate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
