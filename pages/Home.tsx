import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import ProductCard from '../components/Product/ProductCard';
import { Reveal } from '../components/UI/Reveal';
import { VideoModal } from '../components/UI/VideoModal';
import { CATEGORIES } from '../constants';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Star, PlayCircle, Gem, Sparkles, ShieldCheck, Heart, Truck } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useStore();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const featuredProducts = products.slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribeStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="bg-secondary pb-0">
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://www.youtube.com/embed/zdR2t8e9g8g?autoplay=1&rel=0" 
      />
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2400"
            alt="Cinematic Hero" 
            className="w-full h-full object-cover animate-ken-burns origin-top"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto text-white mt-20">
          <Reveal>
            <div className="flex items-center justify-center gap-6 mb-8 opacity-90">
               <span className="hidden md:block h-[1px] w-16 bg-gradient-to-r from-transparent to-white"></span>
               <span className="text-xs md:text-sm uppercase tracking-[0.5em] font-light text-stone-200">The Royal Trousseau Edit</span>
               <span className="hidden md:block h-[1px] w-16 bg-gradient-to-l from-transparent to-white"></span>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight leading-[0.9] text-stone-50 mix-blend-overlay">
              VASTRIKA
            </h1>
          </Reveal>
          
          <Reveal delay={400}>
            <p className="mt-8 text-xl md:text-3xl font-serif italic text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              "Where heritage whispers in every thread."
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row justify-center gap-8 pt-16">
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="min-w-[220px] py-4 bg-white text-primary border border-white hover:bg-transparent hover:text-white transition-all duration-500 rounded-none uppercase tracking-widest text-xs font-bold">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 opacity-60 animate-bounce">
           <span className="text-[9px] uppercase tracking-[0.3em] text-white">Discover</span>
           <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* 2. Marquee - Subtle & Premium */}
      <div className="bg-primary py-5 overflow-hidden whitespace-nowrap border-b border-white/5 relative z-10">
         <div className="animate-scroll inline-flex items-center gap-16 text-white/30 font-serif text-2xl md:text-3xl italic tracking-wider">
            <span>Handwoven Luxury</span> <Gem size={12} /> 
            <span>Authentic Craft</span> <Gem size={12} /> 
            <span>Timeless Elegance</span> <Gem size={12} /> 
            <span>Indian Heritage</span> <Gem size={12} /> 
            <span>Modern Silhouette</span> <Gem size={12} />
            <span>Handwoven Luxury</span> <Gem size={12} /> 
            <span>Authentic Craft</span> <Gem size={12} /> 
            <span>Timeless Elegance</span>
         </div>
      </div>

      {/* 3. The Vastrika Promise (Why Choose Us) */}
      <section className="py-24 bg-secondary">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               <Reveal>
                  <div className="mb-6 flex justify-center">
                     <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                        <ShieldCheck size={32} strokeWidth={1.5} />
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-4">Silk Mark Certified</h3>
                  <p className="text-stone-600 font-light leading-relaxed">
                     Every silk garment comes with a Silk Mark certification, guaranteeing 100% purity and authenticity.
                  </p>
               </Reveal>
               <Reveal delay={200}>
                  <div className="mb-6 flex justify-center">
                     <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                        <Heart size={32} strokeWidth={1.5} />
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-4">Handcrafted with Love</h3>
                  <p className="text-stone-600 font-light leading-relaxed">
                     Supporting over 500 artisan families across India, preserving age-old weaving traditions.
                  </p>
               </Reveal>
               <Reveal delay={400}>
                  <div className="mb-6 flex justify-center">
                     <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                        <Truck size={32} strokeWidth={1.5} />
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-4">Global Shipping</h3>
                  <p className="text-stone-600 font-light leading-relaxed">
                     Delivering Indian elegance to your doorstep, anywhere in the world, with premium packaging.
                  </p>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 4. Editorial Categories - Asymmetrical Layout */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-[1920px] mx-auto">
         <Reveal>
            <div className="flex justify-between items-end mb-12 border-b border-primary/10 pb-6">
               <h2 className="text-4xl md:text-5xl font-serif text-primary">Curated Editions</h2>
               <Link to="/shop" className="hidden md:flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold hover:text-accent transition-colors">
                  View All <ArrowRight size={14} />
               </Link>
            </div>
         </Reveal>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[800px]">
            {/* Main Feature */}
            <div className="lg:col-span-8 h-[60vh] lg:h-full relative group overflow-hidden">
               <Reveal width="100%" className="h-full">
                  <Link to="/shop?category=sarees" className="block h-full w-full">
                     <img 
                        src={CATEGORIES[0].image} 
                        alt="Sarees" 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                     <div className="absolute bottom-12 left-12 text-white">
                        <span className="text-xs uppercase tracking-[0.3em] mb-2 block opacity-80">The Signature Collection</span>
                        <h3 className="text-5xl md:text-7xl font-serif italic group-hover:translate-x-4 transition-transform duration-500">Sarees</h3>
                        <span className="mt-6 inline-block border-b border-white pb-1 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Shop Now</span>
                     </div>
                  </Link>
               </Reveal>
            </div>
            
            {/* Side Stack */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
               <div className="flex-1 relative group overflow-hidden">
                  <Reveal width="100%" delay={200} className="h-full">
                     <Link to="/shop?category=lehengas" className="block h-full w-full">
                        <img 
                           src={CATEGORIES[1].image} 
                           alt="Lehengas" 
                           className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                           <h3 className="text-3xl md:text-4xl font-serif italic">Lehengas</h3>
                        </div>
                     </Link>
                  </Reveal>
               </div>
               <div className="flex-1 relative group overflow-hidden">
                  <Reveal width="100%" delay={400} className="h-full">
                     <Link to="/shop?category=suits" className="block h-full w-full">
                        <img 
                           src={CATEGORIES[3].image} 
                           alt="Suits" 
                           className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                         <div className="absolute bottom-8 left-8 text-white">
                           <h3 className="text-3xl md:text-4xl font-serif italic">Suits</h3>
                        </div>
                     </Link>
                  </Reveal>
               </div>
            </div>
         </div>
      </section>

      {/* 5. "The Edit" (Occasions) */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
               <div className="text-center mb-16">
                  <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Shop By Occasion</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-primary">The Vastrika Edit</h2>
               </div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { title: "The Bridal Trousseau", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", subtitle: "For your special day" },
                  { title: "Festive Celebrations", img: "https://5.imimg.com/data5/SELLER/Default/2024/6/428835855/JT/NP/IK/28280455/shree-indian-exports-1000x1000.jpg", subtitle: "Lights, colors, joy" },
                  { title: "Contemporary Soiree", img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800", subtitle: "Modern cocktails & parties" }
               ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 150}>
                     <div className="group cursor-pointer">
                        <div className="overflow-hidden aspect-[4/5] mb-6 relative">
                           <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                           <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 transition-all duration-500 m-4"></div>
                        </div>
                        <div className="text-center">
                           <h3 className="text-2xl font-serif text-primary group-hover:text-accent transition-colors">{item.title}</h3>
                           <p className="text-sm text-stone-500 mt-2 font-light uppercase tracking-wider">{item.subtitle}</p>
                        </div>
                     </div>
                  </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Cinematic Story Section - Parallax */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2400')" }}>
         <div className="absolute inset-0 bg-black/60"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <Reveal>
               <div className="border border-white/30 p-12 md:p-20 backdrop-blur-sm bg-white/5">
                  <Gem size={32} className="mx-auto mb-8 text-accent opacity-80" />
                  <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                     The Art of <span className="text-accent italic">Zardosi</span>
                  </h2>
                  <p className="text-stone-200 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-2xl mx-auto">
                     Witness the journey of a single golden thread becoming a masterpiece. Our artisans spend hundreds of hours perfecting the intricate embroidery that adorns your Vastrika garment.
                  </p>
                  <button 
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold hover:text-accent transition-colors group"
                  >
                     <div className="rounded-full border border-white p-3 group-hover:border-accent transition-colors">
                       <PlayCircle size={24} strokeWidth={1} />
                     </div>
                     <span>Watch The Film</span>
                  </button>
               </div>
            </Reveal>
         </div>
      </section>

      {/* 7. Featured Products - Horizontal Vibe */}
      <section className="py-32 bg-secondary">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4">
               <Reveal>
                  <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 block">New Arrivals</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-primary">Essential Luxuries</h2>
               </Reveal>
               <Reveal delay={200}>
                   <Link to="/shop" className="hidden md:block border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0">
                      View All Products
                   </Link>
               </Reveal>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {featuredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
               ))}
            </div>
          </div>
      </section>

      {/* 8. Voice of the Patron (Testimonials) */}
      <section className="py-24 bg-white border-y border-stone-100">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <Reveal>
               <h2 className="text-4xl font-serif text-primary mb-16">Voice of the Patron</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="p-8 bg-secondary/50 rounded-sm relative">
                     <span className="text-6xl font-serif text-primary/10 absolute top-4 left-4">"</span>
                     <p className="text-stone-600 font-light italic mb-6 relative z-10">
                        "The saree I ordered for my reception was breathtaking. The craftsmanship is unlike anything I've seen in boutiques. Vastrika is a gem."
                     </p>
                     <div className="flex items-center justify-center gap-2 mb-2 text-accent">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Ananya R.</h4>
                     <span className="text-xs text-stone-500">Mumbai</span>
                  </div>
                  <div className="p-8 bg-secondary/50 rounded-sm relative transform md:-translate-y-4 shadow-sm">
                     <span className="text-6xl font-serif text-primary/10 absolute top-4 left-4">"</span>
                     <p className="text-stone-600 font-light italic mb-6 relative z-10">
                        "Exceptional quality and packaging. It felt like receiving a gift from royalty. The customer service was also very helpful with sizing."
                     </p>
                     <div className="flex items-center justify-center gap-2 mb-2 text-accent">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Priya M.</h4>
                     <span className="text-xs text-stone-500">Bangalore</span>
                  </div>
                  <div className="p-8 bg-secondary/50 rounded-sm relative">
                     <span className="text-6xl font-serif text-primary/10 absolute top-4 left-4">"</span>
                     <p className="text-stone-600 font-light italic mb-6 relative z-10">
                        "I love how modern yet traditional their lehengas are. Wore one to my sister's wedding and got endless compliments."
                     </p>
                     <div className="flex items-center justify-center gap-2 mb-2 text-accent">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Meera K.</h4>
                     <span className="text-xs text-stone-500">Delhi</span>
                  </div>
               </div>
            </Reveal>
         </div>
      </section>

      {/* 9. Instagram Grid */}
      <section className="py-24">
         <div className="text-center mb-12">
            <h2 className="text-2xl font-serif text-primary mb-2">@VastrikaOfficial</h2>
            <p className="text-stone-500 font-light">Tag us to be featured on our timeline</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0.5">
            {[
               "https://yufta.com/cdn/shop/articles/blue_dupatta_set.jpg?v=1647416059",
               "https://media.samyakk.com/pub/media/catalog/product/g/r/green-shimmer-organza-designer-lehenga-with-printed-jacket-gc4759-b.jpg",
               "https://pub-95ccf2d427eb4955a7de1c41d3fa57dd.r2.dev/blog-g3fashion-com/2021/06/ethnic-wear-e1624093120626.jpg",
               "https://www.lavanyathelabel.com/cdn/shop/files/01_LBL101KS352_6_1200x.jpg",
               "https://www.wholesaletextile.in/product-img/Bipson-Riya-1799-Catalog-Ethni-1650709132.jpeg",
               "https://imgeng.jagran.com/webstories/45932/vinali-bhatnagar-s-ethnic-outfits-for-wedding-guests-1682502302.jpeg",
            ].map((src, i) => (
               <div key={i} className="aspect-square relative group overflow-hidden cursor-pointer">
                  <img src={src} alt="Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-serif italic">
                     Shop Look
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 10. The Inner Circle (Newsletter) - Premium */}
      <section className="py-24 bg-primary text-white text-center">
         <div className="max-w-2xl mx-auto px-6">
            <Reveal>
               <Sparkles size={32} className="text-accent mx-auto mb-6" />
               <h2 className="text-3xl md:text-5xl font-serif mb-6">Join The Inner Circle</h2>
               <p className="text-stone-300 font-light text-lg mb-10">
                  Be the first to access our limited edition drops, private sales, and styling notes from the Vastrika atelier.
               </p>
               
               {subscribeStatus === 'success' ? (
                  <div className="p-8 border border-accent/30 bg-accent/5 rounded-sm animate-fade-in-up">
                      <p className="text-xl font-serif text-accent italic">"Welcome to the family. Your journey with Vastrika begins."</p>
                  </div>
               ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border-b border-white/30 focus-within:border-accent transition-colors">
                     <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address" 
                        required
                        disabled={subscribeStatus === 'loading'}
                        className="bg-transparent w-full py-4 text-white placeholder:text-stone-500 focus:outline-none disabled:opacity-50"
                     />
                     <button 
                        type="submit" 
                        disabled={subscribeStatus === 'loading'}
                        className="py-4 px-6 text-xs uppercase tracking-widest font-bold hover:text-accent transition-colors whitespace-nowrap disabled:opacity-50"
                     >
                        {subscribeStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                     </button>
                  </form>
               )}
            </Reveal>
         </div>
      </section>
    </div>
  );
};

export default Home;