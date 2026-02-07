import React, { useState } from 'react';
import { Button } from '../components/UI/Button';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from '../components/UI/Reveal';

const Contact: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you shortly!");
  };

  const faqs = [
    { q: "How do I track my order?", a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track it in the 'My Orders' section of your profile." },
    { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for unworn items with original tags attached. Custom-made items are not eligible for return." },
    { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Shipping costs are calculated at checkout based on your location and order weight." },
    { q: "Can I customize a saree or lehenga?", a: "Yes, select products are eligible for customization. Please contact our styling team via WhatsApp or email for bespoke requests." }
  ];

  return (
    <div className="bg-white min-h-screen pt-28">
       
       {/* Hero Banner */}
       <div className="h-[40vh] bg-primary relative overflow-hidden flex items-center justify-center">
          <img 
             src="https://img.freepik.com/premium-photo/fashion-girl-standing-landscape-stylish-clothes-model-beautiful-hill_723208-18253.jpg" 
             alt="Contact Support" 
             className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative z-10 text-center px-4">
             <Reveal>
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Get in Touch</h1>
                <p className="text-stone-300 max-w-lg mx-auto font-light">
                   Our concierge team is here to assist you with styling advice, order inquiries, and more.
                </p>
             </Reveal>
          </div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-20">
        <div className="bg-white rounded-sm shadow-xl overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-2">
             
             {/* Contact Info Side */}
             <div className="bg-stone-50 p-12 lg:p-16 border-r border-stone-100">
                <h3 className="font-serif text-2xl font-bold text-primary mb-8">Contact Information</h3>
                
                <div className="space-y-8 mb-12">
                   <div className="flex items-start group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                         <MapPin size={20} />
                      </div>
                      <div className="ml-6">
                         <h4 className="font-bold text-primary mb-1">Visit Our Atelier</h4>
                         <p className="text-stone-500 text-sm leading-relaxed">123 Fashion Avenue, Heritage District,<br/>New Delhi, India 110001</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                         <Mail size={20} />
                      </div>
                      <div className="ml-6">
                         <h4 className="font-bold text-primary mb-1">Email Us</h4>
                         <p className="text-stone-500 text-sm">support@vastrika.com</p>
                         <p className="text-stone-500 text-sm">sales@vastrika.com</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                         <Phone size={20} />
                      </div>
                      <div className="ml-6">
                         <h4 className="font-bold text-primary mb-1">Call Us</h4>
                         <p className="text-stone-500 text-sm">+91 98765 43210</p>
                         <p className="text-stone-500 text-sm font-light italic">Mon - Sat, 10am - 7pm IST</p>
                      </div>
                   </div>
                </div>

                <div className="h-64 w-full rounded-sm overflow-hidden bg-stone-200 relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800" 
                      alt="Map Location" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                       <Button variant="secondary" size="sm" className="shadow-lg pointer-events-none">View on Google Maps</Button>
                    </div>
                </div>
             </div>

             {/* Form Side */}
             <div className="p-12 lg:p-16 bg-white">
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">Send a Message</h3>
                <p className="text-stone-500 mb-8 text-sm">We usually respond within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">First Name</label>
                         <input required type="text" className="w-full bg-stone-50 border border-stone-200 rounded-sm p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Last Name</label>
                         <input required type="text" className="w-full bg-stone-50 border border-stone-200 rounded-sm p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                      <input required type="email" className="w-full bg-stone-50 border border-stone-200 rounded-sm p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Topic</label>
                      <select className="w-full bg-stone-50 border border-stone-200 rounded-sm p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-stone-600">
                         <option>General Inquiry</option>
                         <option>Order Status</option>
                         <option>Returns & Exchanges</option>
                         <option>Wholesale / Bulk Orders</option>
                         <option>Styling Advice</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Message</label>
                      <textarea required rows={5} className="w-full bg-stone-50 border border-stone-200 rounded-sm p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"></textarea>
                   </div>
                   <Button type="submit" size="lg" className="w-full py-4 shadow-lg hover:-translate-y-1 transition-transform">Send Message</Button>
                </form>
             </div>

           </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
           <div className="text-center mb-12">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Help Center</span>
              <h2 className="text-3xl font-serif text-primary">Frequently Asked Questions</h2>
           </div>
           
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                 <div key={i} className="border border-stone-200 rounded-sm bg-white overflow-hidden">
                    <button 
                       onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                       className="w-full flex justify-between items-center p-6 text-left hover:bg-stone-50 transition-colors"
                    >
                       <span className="font-serif text-lg text-primary">{faq.q}</span>
                       {activeFAQ === i ? <ChevronUp size={20} className="text-accent" /> : <ChevronDown size={20} className="text-stone-400" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFAQ === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                       <p className="p-6 pt-0 text-stone-600 font-light leading-relaxed border-t border-stone-100 mt-2">
                          {faq.a}
                       </p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;