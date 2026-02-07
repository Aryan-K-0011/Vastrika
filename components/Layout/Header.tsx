import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Truck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const { itemCount, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define pages that have a transparent header initially (Home and About)
  const isTransparentNav = location.pathname === '/' || location.pathname === '/about';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
     if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
     } else {
        document.body.style.overflow = 'unset';
     }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Collection', path: '/shop' },
    { name: 'The Atelier', path: '/about' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const headerBgClass = isTransparentNav && !isScrolled 
    ? 'bg-transparent border-transparent text-white' 
    : 'bg-white/95 backdrop-blur-md border-b border-stone-100 text-primary shadow-sm';

  const linkClass = (path: string) => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    const baseColor = isTransparentNav && !isScrolled ? 'text-white/80 hover:text-white' : 'text-stone-500 hover:text-primary';
    const activeColor = isTransparentNav && !isScrolled ? 'text-white font-medium border-b border-white' : 'text-primary font-medium border-b border-primary';
    
    return `text-xs uppercase tracking-[0.2em] transition-all duration-300 py-1 ${isActive ? activeColor : baseColor}`;
  };

  const iconClass = isTransparentNav && !isScrolled ? 'text-white hover:text-white/80' : 'text-stone-600 hover:text-primary';

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-700 ease-in-out ${headerBgClass} ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden z-50 relative">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${isMobileMenuOpen ? 'text-primary' : iconClass}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="group">
              <span className={`font-serif text-2xl md:text-3xl font-bold tracking-widest transition-colors duration-500 ${isTransparentNav && !isScrolled ? 'text-white' : 'text-primary'}`}>
                VASTRIKA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12 items-center justify-center flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={linkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link to="/track-order" className={`${iconClass} transition-colors hidden sm:block group`} title="Track Order">
              <Truck size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            </Link>

            <button className={`${iconClass} transition-colors hidden sm:block group`}>
              <Search size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="relative flex items-center gap-2" ref={userMenuRef}>
               {user && (
                 <span className={`text-[10px] uppercase tracking-wider font-bold hidden xl:block cursor-default ${isTransparentNav && !isScrolled ? 'text-white' : 'text-primary'}`}>
                    Hi, {user.name}
                 </span>
               )}
               
               {user ? (
                 <div className="relative">
                   <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`${iconClass} transition-colors hidden sm:flex items-center gap-1 group`}
                      title="User Menu"
                   >
                     <User size={20} strokeWidth={1.5} />
                     <ChevronDown size={12} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {/* User Dropdown */}
                   {isUserMenuOpen && (
                     <div className="absolute right-0 mt-3 w-48 bg-white rounded-sm shadow-xl border border-stone-100 py-2 animate-in fade-in slide-in-from-top-2 text-stone-600 z-50">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 hover:text-primary text-sm transition-colors" 
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} /> My Profile
                        </Link>
                        {user.email.includes('admin') && (
                           <Link 
                              to="/admin" 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 hover:text-primary text-sm transition-colors" 
                              onClick={() => setIsUserMenuOpen(false)}
                           >
                              <LayoutDashboard size={16} /> Admin Panel
                           </Link>
                        )}
                        <div className="border-t border-stone-100 my-1"></div>
                        <button 
                           onClick={handleLogout}
                           className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 text-sm transition-colors"
                        >
                           <LogOut size={16} /> Log Out
                        </button>
                     </div>
                   )}
                 </div>
               ) : (
                 <button 
                    onClick={() => navigate('/login')}
                    className={`${iconClass} transition-colors hidden sm:block group`}
                    title="Login"
                 >
                   <User size={20} strokeWidth={1.5} />
                 </button>
               )}
            </div>

            <button 
              className={`${iconClass} transition-colors relative group`}
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden pt-24 px-6 overflow-y-auto`}>
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-stone-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-stone-100 pb-4"
              >
                Track Order
              </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-stone-100 pb-4"
                >
                  My Profile
                </Link>
                {user.email.includes('admin') && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-stone-100 pb-4"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                   onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      navigate('/');
                   }}
                   className="text-2xl font-serif text-red-500 hover:text-red-600 transition-colors border-b border-stone-100 pb-4 text-left"
                >
                   Log Out
                </button>
              </>
            ) : (
               <button 
                 onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                 }}
                 className="text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-stone-100 pb-4 text-left"
              >
                 Login / Register
              </button>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;