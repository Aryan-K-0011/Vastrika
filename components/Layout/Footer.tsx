import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-primary text-secondary pt-24 pb-12 border-t border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12 lg:gap-24">
           <div className="max-w-md">
              <h3 className="font-serif text-3xl font-bold mb-6 text-white tracking-wide">VASTRIKA</h3>
              <p className="text-stone-300 text-sm leading-7 font-light">
                Celebrating the elegance of Indian heritage with a modern touch. 
                Vastrika brings you the finest collection of ethnic wear, handcrafted for your special moments.
              </p>
           </div>
           
           <div className="w-full lg:max-w-md bg-white/5 p-8 border border-white/10">
              <h4 className="font-serif text-xl text-white mb-2">Join Our Newsletter</h4>
              <p className="text-xs text-stone-400 mb-6 uppercase tracking-wider">Receive exclusive offers & style updates</p>
              
              {status === 'success' ? (
                 <div className="text-accent flex items-center gap-2 animate-fade-in-up">
                    <span className="text-lg">✓</span> 
                    <span className="font-serif italic">Subscribed successfully.</span>
                 </div>
              ) : (
                 <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      disabled={status === 'loading'}
                      className="bg-white text-primary w-full py-2 px-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-400 font-light disabled:opacity-50 rounded-sm"
                    />
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="text-white hover:text-accent transition-colors disabled:opacity-50"
                    >
                       {status === 'loading' ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       ) : (
                          <ArrowRight size={20} />
                       )}
                    </button>
                 </form>
              )}
           </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-16"></div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-accent">Explore</h4>
            <ul className="space-y-4 text-sm text-stone-400 font-light">
              <li><Link to="/about" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Our Heritage</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors hover:pl-2 duration-300 block">The Collection</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Journal</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-accent">Assistance</h4>
            <ul className="space-y-4 text-sm text-stone-400 font-light">
              <li><Link to="/track-order" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors hover:pl-2 duration-300 block">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-accent">Legal</h4>
            <ul className="space-y-4 text-sm text-stone-400 font-light">
              <li><Link to="#" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors hover:pl-2 duration-300 block">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-accent">Visit Us</h4>
            <ul className="space-y-4 text-sm text-stone-400 font-light">
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <span>123 Fashion Avenue, Heritage District, New Delhi, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 flex-shrink-0 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 flex-shrink-0 text-accent" />
                <span>support@vastrika.com</span>
              </li>
            </ul>
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-stone-400 hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 font-light uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Vastrika. All Rights Reserved.</p>
          <p>Designed with ❤️ for Culture</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;