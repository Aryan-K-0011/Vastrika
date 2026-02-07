import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/UI/Button';
import { Reveal } from '../components/UI/Reveal';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    
    register(email, name);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-white pt-28">
      {/* Left: Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden order-2">
        <img 
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200" 
          alt="Signup Heritage" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative order-1">
         <Reveal width="100%">
            <div className="max-w-md mx-auto w-full">
               <h1 className="text-4xl md:text-5xl font-serif text-primary mb-2">Join Vastrika</h1>
               <p className="text-stone-500 mb-10">Become a member to unlock exclusive benefits and personalized styling.</p>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Full Name</label>
                     <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-sm px-4 py-3 text-lg focus:outline-none focus:border-primary transition-colors"
                        placeholder="Priya Sharma"
                        required
                     />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                     <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-sm px-4 py-3 text-lg focus:outline-none focus:border-primary transition-colors"
                        placeholder="you@example.com"
                        required
                     />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Password</label>
                     <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-sm px-4 py-3 text-lg focus:outline-none focus:border-primary transition-colors"
                        placeholder="Create a strong password"
                        required
                     />
                  </div>

                  <Button type="submit" size="lg" className="w-full py-4 mt-6 shadow-xl">
                     Create Account
                  </Button>
               </form>

               <div className="mt-12 text-center text-stone-600">
                  <p>Already a member?</p>
                  <Link to="/login" className="text-primary font-bold hover:text-accent transition-colors uppercase tracking-widest text-sm mt-2 inline-block border-b border-primary pb-1">
                     Sign In
                  </Link>
               </div>
            </div>
         </Reveal>
      </div>
    </div>
  );
};

export default Signup;