import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Reveal } from '../components/UI/Reveal';
import { ArrowLeft, Calendar, User, Clock, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { Button } from '../components/UI/Button';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
     if (navigator.share) {
        navigator.share({
           title: post?.title,
           text: post?.excerpt,
           url: window.location.href,
        }).catch(console.error);
     } else {
        alert("Link copied to clipboard!");
     }
  };

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-3xl font-serif text-primary mb-4">Article Not Found</h2>
        <Link to="/blog"><Button>Return to Journal</Button></Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-20">
       <article>
          {/* Header */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
             <Reveal>
                <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-primary mb-8 transition-colors group">
                   <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-accent font-bold uppercase tracking-widest mb-4">
                   <span className="border border-accent/30 px-3 py-1 rounded-full">{post.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-8 leading-tight">
                   {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500 border-y border-stone-100 py-6 max-w-2xl mx-auto">
                   <span className="flex items-center gap-2"><Calendar size={16} className="text-accent" /> {post.date}</span>
                   <span className="hidden sm:inline text-stone-300">|</span>
                   <span className="flex items-center gap-2"><User size={16} className="text-accent" /> {post.author}</span>
                   <span className="hidden sm:inline text-stone-300">|</span>
                   <span className="flex items-center gap-2"><Clock size={16} className="text-accent" /> {post.readTime}</span>
                </div>
             </Reveal>
          </div>

          {/* Featured Image */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
             <Reveal width="100%">
                <div className="aspect-video w-full overflow-hidden rounded-sm shadow-xl relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
             </Reveal>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
             <Reveal delay={200}>
                {/* Note: 'prose' class requires Tailwind Typography plugin which we added to index.html */}
                <div 
                  className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-img:rounded-sm prose-p:font-light prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
             </Reveal>

             {/* Share & Tags */}
             <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                   <span className="text-sm font-bold uppercase tracking-widest text-primary">Share Article:</span>
                   <div className="flex gap-2">
                     <button onClick={handleShare} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white transition-all"><Facebook size={18} /></button>
                     <button onClick={handleShare} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></button>
                     <button onClick={handleShare} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white transition-all"><Linkedin size={18} /></button>
                     <button onClick={handleShare} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white transition-all"><Share2 size={18} /></button>
                   </div>
                </div>
             </div>
          </div>
       </article>

       {/* Related Articles */}
       <div className="bg-stone-50 mt-24 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex justify-between items-end mb-12">
                <h3 className="text-3xl font-serif text-primary">More Stories</h3>
                <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent border-b border-primary hover:border-accent pb-1 transition-colors">View All</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3).map(related => (
                   <Link key={related.id} to={`/blog/${related.id}`} className="group bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-[3/2] overflow-hidden mb-4 rounded-sm">
                         <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="text-xs text-accent font-bold uppercase tracking-widest mb-2">{related.category}</p>
                      <h4 className="font-serif text-xl text-primary group-hover:text-stone-600 transition-colors leading-tight">{related.title}</h4>
                   </Link>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default BlogPost;