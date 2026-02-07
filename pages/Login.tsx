import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/UI/Button';
import { Reveal } from '../components/UI/Reveal';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to where the user came from, or home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Simulate API call
    login(email, 'Priya'); // Mocking a user name
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-white pt-28">
      {/* Left: Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img 
          src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png" 
          alt="Login Heritage" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
           <div className="text-center text-white p-12 border border-white/30 backdrop-blur-sm max-w-lg">
              <h2 className="text-4xl font-serif mb-4">Welcome Back</h2>
              <p className="font-light tracking-wide">Enter the world of timeless elegance and exclusive collections.</p>
           </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
         <Reveal width="100%">
            <div className="max-w-md mx-auto w-full">
               <h1 className="text-4xl md:text-5xl font-serif text-primary mb-2">Sign In</h1>
               <p className="text-stone-500 mb-10">Access your account to manage orders and wishlist.</p>

               <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="••••••••"
                        required
                     />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                     <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="mr-2 accent-primary" />
                        <span className="text-stone-500">Remember me</span>
                     </label>
                     <a href="#" className="text-primary hover:text-accent transition-colors underline underline-offset-4">Forgot Password?</a>
                  </div>

                  <Button type="submit" size="lg" className="w-full py-4 mt-4 shadow-xl">
                     Sign In
                  </Button>
               </form>

               <div className="mt-12 text-center text-stone-600">
                  <p>Don't have an account?</p>
                  <Link to="/signup" className="text-primary font-bold hover:text-accent transition-colors uppercase tracking-widest text-sm mt-2 inline-block border-b border-primary pb-1">
                     Create an Account
                  </Link>
               </div>
            </div>
         </Reveal>
      </div>
    </div>
  );
};

export default Login;