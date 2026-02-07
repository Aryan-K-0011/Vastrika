import React from 'react';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Reveal } from '../UI/Reveal';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  return (
    <Reveal delay={index * 50} width="100%">
      <div className="group relative flex flex-col items-center">
        {/* Image Container */}
        <Link to={`/product/${product.id}`} className="block relative w-full aspect-[3/4] overflow-hidden bg-stone-100 mb-5">
           {/* Main Image */}
           <img
             src={product.image}
             alt={product.name}
             className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
           />
           
           {/* Overlay */}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

           {/* Wishlist Button (Top Right) */}
           <button 
             className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2.5 rounded-full text-stone-600 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0" 
             title="Add to Wishlist"
             onClick={(e) => {
               e.preventDefault();
               // Wishlist logic here
             }}
           >
              <Heart size={18} />
           </button>

           {/* Action Button (Bottom) */}
           <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <button className="w-full bg-white text-primary font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] py-4 hover:bg-primary hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2">
                 <ShoppingBag size={14} /> View Details
              </button>
           </div>
        </Link>

        {/* Product Info - Centered & Editorial */}
        <div className="text-center w-full px-2">
          <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2">{product.category}</p>
          <h3 className="font-serif text-lg md:text-xl text-primary mb-2 leading-tight">
            <Link to={`/product/${product.id}`} className="hover:text-stone-600 transition-colors">
              {product.name}
            </Link>
          </h3>
          <div className="flex items-center justify-center gap-2">
             <span className="text-sm font-medium text-stone-900 tracking-wide">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default ProductCard;