import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-stone-50">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">Our Story</h1>
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-12 shadow-lg">
             <img 
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H1RC2D2hB3j6Mls_an5_g0p4esvx2QnxRA&s" 
               alt="Vastrika Workshop" 
               className="w-full h-full object-cover"
             />
          </div>
          
          <div className="prose prose-stone mx-auto text-lg leading-relaxed text-stone-600">
             <p className="mb-6">
                <strong>Vastrika</strong> was born out of a desire to preserve and celebrate the rich textile heritage of India. 
                Established in 2024, we started as a small boutique in New Delhi with a vision to bring authentic, high-quality ethnic wear to the modern Indian woman.
             </p>
             <p className="mb-6">
                Our collections are a blend of traditional craftsmanship and contemporary aesthetics. 
                We work directly with weavers from Banaras, Kanchipuram, and Lucknow to source the finest silks and fabrics. 
                Every piece in our collection tells a story of skill, patience, and art passed down through generations.
             </p>
             <p>
                At Vastrika, we believe that ethnic wear is not just clothing; it is an emotion, a tradition, and a celebration of identity. 
                Whether it's a bridal lehenga for your big day or a simple cotton kurti for work, we ensure that you carry a piece of art with you.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
             <div>
                <h3 className="text-4xl font-serif text-accent font-bold mb-2">500+</h3>
                <p className="text-stone-600">Artisans Supported</p>
             </div>
             <div>
                <h3 className="text-4xl font-serif text-accent font-bold mb-2">10k+</h3>
                <p className="text-stone-600">Happy Customers</p>
             </div>
             <div>
                <h3 className="text-4xl font-serif text-accent font-bold mb-2">25+</h3>
                <p className="text-stone-600">Cities Covered</p>
             </div>
          </div>
       </div>
    </div>
  );
};

export default About;