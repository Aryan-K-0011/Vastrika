import React from 'react';
import { Reveal } from '../components/UI/Reveal';
import { Gem, Users, Globe, Feather, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Cinematic Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <img 
               src="https://thumbs.dreamstime.com/b/woman-elegant-dress-mountain-coast-fashion-model-gown-flowing-cloth-looking-to-landscape-view-outdoor-89330862.jpg" 
               alt="Vastrika Artisans" 
               className="w-full h-full object-cover animate-ken-burns opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
         </div>
         <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <Reveal>
               <span className="text-white/80 text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Est. 2024</span>
               <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 tracking-tight leading-none mix-blend-overlay">
                  The Atelier
               </h1>
               <div className="h-px w-24 bg-white/50 mx-auto mb-8"></div>
               <p className="text-stone-200 text-lg md:text-2xl font-light font-serif italic max-w-2xl mx-auto leading-relaxed">
                  "Weaving centuries of tradition into the fabric of the modern world."
               </p>
            </Reveal>
         </div>
      </div>

      {/* 2. The Narrative (Split Section) */}
      <section className="py-24 md:py-32 max-w-[1800px] mx-auto px-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Image Composition */}
            <div className="relative order-2 lg:order-1">
               <Reveal width="100%">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                     <img 
                        src="https://i.pinimg.com/736x/76/92/6d/76926df8dc396345ed57ffee6738451a.jpg" 
                        alt="Weaver at work" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                     />
                     <div className="absolute bottom-0 left-0 bg-white p-6 md:p-10 max-w-xs">
                        <p className="font-serif text-3xl text-primary leading-tight">
                           "Every thread tells a story of patience."
                        </p>
                     </div>
                  </div>
               </Reveal>
               {/* Decorative Element */}
               <div className="absolute -top-10 -right-10 w-64 h-64 border border-primary/20 -z-10 hidden lg:block"></div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2 lg:pl-10">
               <Reveal>
                  <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Our Origin</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-primary mb-10 leading-tight">
                     Crafting a Legacy <br/> Since 2024
                  </h2>
                  <div className="prose prose-lg prose-stone text-stone-600 font-light leading-relaxed">
                     <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                        Vastrika was born out of a profound desire to preserve the fading art of Indian handlooms. 
                        In an era of fast fashion, we chose to slow down. We travelled to the ancient weaving 
                        hubs of Banaras, Kanchipuram, and Chanderi, meeting artisans whose families have 
                        guarded these techniques for generations.
                     </p>
                     <p className="mt-6">
                        We realized that luxury isn't just about the price tag; it's about the hands that made it, 
                        the time invested, and the heritage it carries. Vastrika is more than a brand; it is a 
                        bridge connecting the mastery of the past with the aesthetics of the future.
                     </p>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-12 border-t border-stone-200 pt-8">
                     <div>
                        <h3 className="text-4xl font-serif text-primary mb-1">500+</h3>
                        <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Artisan Families</p>
                     </div>
                     <div>
                        <h3 className="text-4xl font-serif text-primary mb-1">100%</h3>
                        <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Silk Mark Certified</p>
                     </div>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 3. The Pillars (Dark Section) */}
      <section className="bg-primary text-secondary py-32 relative overflow-hidden">
         {/* Background Texture */}
         <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal className="mb-20 text-center">
               <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Ethos</span>
               <h2 className="text-4xl md:text-5xl font-serif">The Vastrika Promise</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
               <Reveal delay={100} className="border-t border-white/20 pt-8">
                  <span className="text-6xl font-serif text-white/10 mb-6 block">-01</span>
                  <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                     <Gem size={20} className="text-accent" /> Authenticity
                  </h3>
                  <p className="text-stone-400 font-light leading-relaxed">
                     We reject the counterfeit. Every saree, lehenga, and fabric is rigorously tested and 
                     Silk Mark certified to ensure you receive nothing but pure, authentic handloom.
                  </p>
               </Reveal>

               <Reveal delay={200} className="border-t border-white/20 pt-8">
                  <span className="text-6xl font-serif text-white/10 mb-6 block">-02</span>
                  <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                     <Users size={20} className="text-accent" /> Empowerment
                  </h3>
                  <p className="text-stone-400 font-light leading-relaxed">
                     We believe in fair trade. By eliminating middlemen, we ensure that the true creators—our weavers—receive 
                     fair compensation, dignified working conditions, and recognition.
                  </p>
               </Reveal>

               <Reveal delay={300} className="border-t border-white/20 pt-8">
                  <span className="text-6xl font-serif text-white/10 mb-6 block">-03</span>
                  <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                     <Globe size={20} className="text-accent" /> Sustainability
                  </h3>
                  <p className="text-stone-400 font-light leading-relaxed">
                     Fashion shouldn't cost the earth. We champion natural fibers, eco-friendly dyes, 
                     and plastic-free packaging, advocating for a slower, more conscious lifestyle.
                  </p>
               </Reveal>
            </div>
         </div>
      </section>

      {/* 4. The Process (Visual Grid - Full Width) */}
      <section className="py-0">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto md:h-[600px]">
            {[
               { title: "Spinning", subtitle: "The Beginning", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2rOgQ4vugTP71Azzqjnvc75DORq6Vtje4gg&s" },
               { title: "Dyeing", subtitle: "Colors of Nature", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJyJ3MeU-bzhu3Ye8fYKrAArUW9qwLLHBAA&s" },
               { title: "Weaving", subtitle: "Rhythm of the Loom", img: "https://media.istockphoto.com/id/1470008958/photo/peruvian-woman-weaving-the-sacred-valley-chinchero.jpg?s=612x612&w=0&k=20&c=ccKMh0oIgYxt0xnJ3G0TlRcy10X-Dmn4n-MY-pxS9lk=" },
               { title: "Finishing", subtitle: "The Final Touch", img: "https://m.media-amazon.com/images/I/71jtYyZpBWL._AC_UY1100_.jpg" }
            ].map((step, idx) => (
               <div key={idx} className="relative group h-[400px] md:h-full overflow-hidden border-r border-stone-100 last:border-0">
                  <img 
                     src={step.img} 
                     alt={step.title} 
                     className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 flex flex-col justify-end p-8 md:p-12">
                     <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">Step 0{idx + 1}</span>
                     <h3 className="text-3xl font-serif text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{step.title}</h3>
                     <p className="text-stone-300 font-light text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{step.subtitle}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. Founder Note */}
      <section className="py-32 bg-stone-50">
         <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
               <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary p-1">
                  <img src="https://m.media-amazon.com/images/I/41XOew4NrlL._AC_UY1100_.jpg" className="w-full h-full object-cover rounded-full" alt="Founder" />
               </div>
               <h2 className="text-3xl font-serif text-primary mb-8 italic">
                  "Our mission is simple: to make the world fall in love with Indian craftsmanship, all over again."
               </h2>
               <p className="font-bold text-sm uppercase tracking-widest text-stone-500">Anjali Desai</p>
               <p className="text-xs text-stone-400 mt-1">Founder, Vastrika</p>
               
               <div className="mt-12">
                  <Link to="/shop">
                     <Button className="px-10 py-4 uppercase tracking-widest text-xs">Explore The Collection</Button>
                  </Link>
               </div>
            </Reveal>
         </div>
      </section>

    </div>
  );
};

export default About;