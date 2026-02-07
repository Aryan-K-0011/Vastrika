import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Reveal } from '../components/UI/Reveal';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="bg-stone-50 min-h-screen pt-28 pb-24">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
         <Reveal>
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Journal</span>
            <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Vastrika Chronicles</h1>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
               Immerse yourself in stories of heritage, styling wisdom, and the artistry behind our collections.
            </p>
         </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
         {/* Featured Post */}
         <Reveal className="mb-20">
            <Link to={`/blog/${featuredPost.id}`} className="group relative block overflow-hidden shadow-lg">
               <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px]">
                  <div className="relative overflow-hidden h-64 lg:h-full">
                     <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Featured Story
                     </div>
                  </div>
                  <div className="bg-white p-8 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-r border-b border-stone-100">
                     <div className="flex items-center gap-4 text-xs text-accent font-bold uppercase tracking-wider mb-4">
                        <span>{featuredPost.category}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                        <span className="text-stone-400 font-normal">{featuredPost.date}</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6 leading-tight group-hover:text-accent transition-colors">
                        {featuredPost.title}
                     </h2>
                     <p className="text-stone-500 font-light leading-relaxed mb-8 text-lg line-clamp-3">
                        {featuredPost.excerpt}
                     </p>
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                        Read Full Article <ArrowRight size={14} />
                     </div>
                  </div>
               </div>
            </Link>
         </Reveal>

         {/* Regular Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {regularPosts.map((post, idx) => (
               <Reveal key={post.id} delay={idx * 100}>
                  <Link to={`/blog/${post.id}`} className="group block h-full flex flex-col bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                     <div className="aspect-[16/10] overflow-hidden relative">
                        <img 
                           src={post.image} 
                           alt={post.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                           {post.category}
                        </div>
                     </div>
                     <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-xs text-stone-400 mb-4 uppercase tracking-wider">
                           <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                           <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        <h2 className="text-2xl font-serif text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                           {post.title}
                        </h2>
                        <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                           {post.excerpt}
                        </p>
                        <div className="mt-auto pt-6 border-t border-stone-100 flex justify-between items-center">
                           <span className="flex items-center gap-1 text-xs text-stone-400"><User size={12} /> {post.author}</span>
                           <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                              Read <ArrowRight size={14} />
                           </span>
                        </div>
                     </div>
                  </Link>
               </Reveal>
            ))}
         </div>

         {/* Newsletter CTA */}
         <div className="mt-24 bg-primary text-white p-12 md:p-20 text-center relative overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <Reveal>
               <h2 className="text-3xl md:text-4xl font-serif mb-6 relative z-10">Subscribe to The Chronicles</h2>
               <p className="text-stone-300 mb-8 max-w-xl mx-auto font-light relative z-10">
                  Get the latest stories, styling tips, and heritage insights delivered straight to your inbox.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                  <input type="email" placeholder="Your email address" className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-stone-400 px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
                  <button className="bg-white text-primary px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-colors">
                     Subscribe
                  </button>
               </div>
            </Reveal>
         </div>
      </div>
    </div>
  );
};

export default Blog;