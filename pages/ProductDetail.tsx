import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/UI/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star, Ruler, ShieldCheck, ChevronDown, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/UI/Reveal';
import ProductCard from '../components/Product/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useStore();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('features');
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product, id]);
  
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-secondary">
        <h2 className="text-3xl font-serif text-primary mb-4">Treasure Not Found</h2>
        <p className="text-stone-500 mb-8">The item you are looking for is unavailable.</p>
        <Link to="/shop"><Button>Return to Collection</Button></Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login, but save the current location to redirect back after login
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!selectedSize) {
      alert('Please select a size to proceed.');
      return;
    }
    // Handle price if on sale
    const priceToUse = product.salePrice || product.price;
    addToCart({ ...product, price: priceToUse }, selectedSize);
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  }

  return (
    <div className="bg-secondary min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Reveal>
          <nav className="text-xs uppercase tracking-widest text-stone-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
            <span className="text-stone-300">/</span> 
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link> 
            <span className="text-stone-300">/</span>
            <span className="text-primary font-bold">{product.name}</span>
          </nav>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          
          {/* Left: Interactive Image Gallery */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-28">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24 flex-shrink-0 no-scrollbar">
                 <button 
                    onClick={() => setActiveImage(product.image)}
                    className={`aspect-[3/4] w-20 md:w-full flex-shrink-0 overflow-hidden border transition-all duration-300 ${activeImage === product.image ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                 >
                    <img src={product.image} alt="Main view" className="w-full h-full object-cover" />
                 </button>
                 {/* Simulated additional images using same source for demo */}
                 {[1, 2, 3].map((i) => (
                   <button 
                      key={i}
                      onClick={() => setActiveImage(product.image)} // In real app, these would be product.images[i]
                      className={`aspect-[3/4] w-20 md:w-full flex-shrink-0 overflow-hidden border transition-all duration-300 ${activeImage === product.image && i === -1 ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                   >
                      <img src={product.image} alt={`Detail ${i}`} className="w-full h-full object-cover" />
                   </button>
                 ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-[3/4] bg-stone-100 overflow-hidden relative group cursor-zoom-in">
                 <img 
                   src={activeImage} 
                   alt={product.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    Best Seller
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-2/5 pt-2">
            <Reveal delay={200}>
              <h1 className="text-3xl md:text-5xl font-serif text-primary mb-2 leading-tight">{product.name}</h1>
              <p className="text-sm text-stone-500 uppercase tracking-widest mb-6">{product.category} Collection</p>
              
              <div className="flex items-end gap-4 border-b border-stone-200 pb-8 mb-8">
                <div>
                   {product.salePrice ? (
                      <div className="flex items-baseline gap-3">
                         <p className="text-3xl text-red-600 font-medium">₹{product.salePrice.toLocaleString()}</p>
                         <p className="text-xl text-stone-400 line-through">₹{product.price.toLocaleString()}</p>
                      </div>
                   ) : (
                      <p className="text-3xl text-primary font-medium">₹{product.price.toLocaleString()}</p>
                   )}
                </div>
                <div className="flex items-center text-accent text-sm mb-1.5 ml-auto">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-stone-400 text-xs ml-2 underline decoration-stone-300 underline-offset-4 cursor-pointer hover:text-primary transition-colors">42 Reviews</span>
                </div>
              </div>

              <div className="prose prose-stone mb-10">
                 <p className="text-stone-600 leading-relaxed font-light text-lg">{product.description}</p>
              </div>

              {/* Size Selector */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Select Size</h3>
                   <button className="flex items-center text-xs uppercase tracking-widest text-stone-500 hover:text-primary transition-colors gap-2 group">
                      <Ruler size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Size Guide
                   </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-sm border transition-all duration-300 rounded-sm ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white shadow-md transform scale-105'
                          : 'border-stone-300 text-stone-600 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mb-12">
                <Button onClick={handleAddToCart} size="lg" className="w-full py-5 text-lg uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  {isAuthenticated ? `Add to Bag` : 'Login to Add to Bag'}
                </Button>
                
                <p className="text-center text-xs text-stone-500 mt-2 flex items-center justify-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   Order in next 4h 32m for express delivery
                </p>
              </div>

              {/* Accordion Details */}
              <div className="border-t border-stone-300">
                 {/* Features */}
                 <div className="border-b border-stone-300">
                    <button onClick={() => toggleAccordion('features')} className="w-full py-5 flex justify-between items-center text-left group">
                       <span className="font-serif text-lg text-primary group-hover:text-accent transition-colors">Fabric & Care</span>
                       <span className={`transition-transform duration-300 ${activeAccordion === 'features' ? 'rotate-180' : ''}`}>
                          <ChevronDown size={18} />
                       </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === 'features' ? 'max-h-60 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                       <ul className="space-y-3 text-stone-600 font-light text-sm pl-4">
                          {product.features.map((f, i) => (
                             <li key={i} className="list-disc marker:text-accent">{f}</li>
                          ))}
                          <li className="list-disc marker:text-accent">Dry Clean Only Recommended</li>
                          <li className="list-disc marker:text-accent">Store in muslin cloth</li>
                       </ul>
                    </div>
                 </div>

                 {/* Shipping */}
                 <div className="border-b border-stone-300">
                    <button onClick={() => toggleAccordion('shipping')} className="w-full py-5 flex justify-between items-center text-left group">
                       <span className="font-serif text-lg text-primary group-hover:text-accent transition-colors">Shipping & Returns</span>
                       <span className={`transition-transform duration-300 ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`}>
                          <ChevronDown size={18} />
                       </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === 'shipping' ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                       <p className="text-sm text-stone-600 leading-relaxed font-light">
                          Complimentary express shipping on all orders above ₹5,000. 
                          We accept returns within 7 days of delivery for unworn items with tags attached.
                       </p>
                    </div>
                 </div>
                 
                 {/* Authenticity */}
                 <div className="border-b border-stone-300">
                    <button onClick={() => toggleAccordion('auth')} className="w-full py-5 flex justify-between items-center text-left group">
                       <span className="font-serif text-lg text-primary group-hover:text-accent transition-colors">Authenticity Promise</span>
                       <span className={`transition-transform duration-300 ${activeAccordion === 'auth' ? 'rotate-180' : ''}`}>
                          <ChevronDown size={18} />
                       </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === 'auth' ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                       <div className="flex items-center gap-3 text-stone-600 text-sm font-light bg-stone-50 p-4 rounded-sm border border-stone-200">
                          <ShieldCheck size={24} className="text-accent flex-shrink-0" />
                          <p>100% Authentic Handloom certified by Silk Mark Organization of India.</p>
                       </div>
                    </div>
                 </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-primary/10 pt-20">
             <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-primary">You May Also Like</h2>
                <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
                   View Collection <ArrowRight size={14} />
                </Link>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p, idx) => (
                   <ProductCard key={p.id} product={p} index={idx} />
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;