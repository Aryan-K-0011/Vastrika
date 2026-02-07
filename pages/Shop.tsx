import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/Product/ProductCard';
import { CATEGORIES } from '../constants';
import { useStore } from '../context/StoreContext';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, X, Check } from 'lucide-react';
import { Reveal } from '../components/UI/Reveal';

const Shop: React.FC = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Update local state if URL param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileFilterOpen]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const finalPrice = product.salePrice || product.price;
      const priceMatch = finalPrice <= priceRange;
      return categoryMatch && priceMatch;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }

    return result;
  }, [selectedCategory, priceRange, sortBy, products]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSearchParams(catId === 'all' ? {} : { category: catId });
    setIsMobileFilterOpen(false);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const FilterContent = () => (
    <div className="space-y-10">
      <div>
        <h3 className="font-serif text-lg text-primary mb-6 flex items-center gap-2">
          Category
          <div className="h-[1px] flex-1 bg-stone-200"></div>
        </h3>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => handleCategoryChange('all')}
              className={`text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 w-full text-left group ${selectedCategory === 'all' ? 'text-primary font-bold' : 'text-stone-500 hover:text-primary'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === 'all' ? 'bg-accent' : 'bg-transparent group-hover:bg-stone-300'}`}></div>
              All Products
            </button>
          </li>
          {CATEGORIES.map(cat => (
            <li key={cat.id}>
              <button 
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 w-full text-left group ${selectedCategory === cat.id ? 'text-primary font-bold' : 'text-stone-500 hover:text-primary'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === cat.id ? 'bg-accent' : 'bg-transparent group-hover:bg-stone-300'}`}></div>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-serif text-lg text-primary mb-6 flex items-center gap-2">
          Price Range
          <div className="h-[1px] flex-1 bg-stone-200"></div>
        </h3>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="1000"
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-[2px] bg-stone-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />
          <div className="flex justify-between text-xs font-medium text-stone-500 mt-4 tracking-wider font-sans">
            <span>₹0</span>
            <span className="text-primary font-bold">Max: ₹{priceRange.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-secondary min-h-screen pt-28 pb-24">
      
      {/* 1. Cinematic Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center bg-primary">
         <div className="absolute inset-0">
            <img 
               src="https://thumbs.dreamstime.com/b/autumn-female-portrait-fall-yellow-leaves-pretty-girl-park-outdoor-september-season-woman-fashion-model-maple-leaf-398561973.jpg"
               alt="Shop Collection" 
               className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-black/30"></div>
         </div>
         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <Reveal>
               <span className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Atelier</span>
               <h1 className="text-5xl md:text-7xl font-serif text-primary mix-blend-color-burn mb-6">
                  Timeless Weaves
               </h1>
               <p className="text-stone-800 text-lg font-light max-w-xl mx-auto leading-relaxed">
                  Discover our curated selection of hand-embroidered masterpieces, designed for the modern connoisseur.
               </p>
            </Reveal>
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 2. Desktop Sidebar (Sticky) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
             <div className="sticky top-32 bg-white/80 backdrop-blur-md p-8 border border-white/40 shadow-sm rounded-sm">
                <FilterContent />
             </div>
          </div>

          {/* Mobile Filter Toggle & Sort Bar */}
          <div className="lg:hidden w-full sticky top-20 z-30 mb-6">
             <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-100 flex items-center justify-between px-4 py-3">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-bold"
                >
                  <SlidersHorizontal size={16} /> Filter
                </button>
                <div className="flex items-center gap-2">
                   <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-xs uppercase tracking-widest font-bold text-stone-600 focus:outline-none"
                   >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                   </select>
                </div>
             </div>
          </div>

          {/* 3. Product Grid Area */}
          <div className="flex-1 pt-12">
            
            {/* Desktop Sort & Count */}
            <div className="hidden lg:flex justify-between items-center mb-10 pb-4 border-b border-primary/10">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Showing <span className="text-primary">{filteredProducts.length}</span> Treasures
              </p>
              <div className="flex items-center gap-3 relative group">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Sort By:</span>
                <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value as any)}
                   className="appearance-none bg-transparent text-sm font-serif text-primary cursor-pointer focus:outline-none pr-6 font-medium"
                >
                   <option value="featured">Featured Collection</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-16 h-16 border border-stone-300 rounded-full flex items-center justify-center text-stone-300 mb-6">
                   <X size={24} />
                </div>
                <h3 className="text-2xl font-serif text-primary mb-2">No Treasures Found</h3>
                <p className="text-stone-500 mb-8 max-w-md">We couldn't find any items matching your current selection. Try adjusting your filters.</p>
                <button 
                  onClick={() => {setSelectedCategory('all'); setPriceRange(100000);}}
                  className="text-xs uppercase tracking-widest font-bold text-white bg-primary px-8 py-4 hover:bg-accent transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Mobile Filter Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isMobileFilterOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
         {/* Backdrop */}
         <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileFilterOpen(false)}
         />
         
         {/* Drawer */}
         <div className={`absolute inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
               <h2 className="font-serif text-xl text-primary">Filters</h2>
               <button onClick={() => setIsMobileFilterOpen(false)} className="text-stone-400 hover:text-primary">
                  <X size={24} />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
               <FilterContent />
            </div>
            
            <div className="p-6 border-t border-stone-100 bg-stone-50">
               <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-primary text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors"
               >
                  Show {filteredProducts.length} Items
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Shop;