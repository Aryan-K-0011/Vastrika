import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/UI/Button';
import { 
  Package, Heart, MapPin, CreditCard, Settings, LogOut, 
  User, ChevronRight, Truck, CheckCircle, X, Plus, Edit2, Download
} from 'lucide-react';
import { Reveal } from '../components/UI/Reveal';
import { Product } from '../types';

type Tab = 'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'payments' | 'settings';

interface Address {
  id: number;
  type: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  default: boolean;
}

interface Card {
  id: number;
  type: string;
  last4: string;
  expiry: string;
  holder: string;
}

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { products } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // --- STATE MANAGEMENT ---
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  
  useEffect(() => {
     if (products.length > 5) {
        setWishlistItems([products[1], products[5]]);
     }
  }, [products]);
  
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, type: 'Home', name: 'Priya Sharma', line1: '123, Heritage Residency', line2: 'Civil Lines', city: 'Jaipur', state: 'Rajasthan', zip: '302006', phone: '+91 98765 43210', default: true },
    { id: 2, type: 'Office', name: 'Priya Sharma', line1: 'Unit 404, Tech Park', line2: 'Cyber Hub', city: 'Gurgaon', state: 'Haryana', zip: '122002', phone: '+91 98765 43210', default: false },
  ]);

  const [cards, setCards] = useState<Card[]>([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', holder: 'PRIYA SHARMA' },
    { id: 2, type: 'Mastercard', last4: '8839', expiry: '09/25', holder: 'PRIYA SHARMA' },
  ]);

  // Modal States
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);

  // Form States
  const [addrForm, setAddrForm] = useState<Partial<Address>>({});
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', holder: '' });

  // Protect the route
  useEffect(() => {
    // We only redirect if we are strictly NOT authenticated.
    // However, if we just clicked logout, we want to go home, not login.
    // The handleLogout function takes care of navigation to home.
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/');
    }
  };

  if (!user) return null;

  // --- HANDLERS ---

  // Invoice
  const handleDownloadInvoice = (orderId: string) => {
    alert(`Downloading Invoice for Order #${orderId}...\n\n(This is a simulated action)`);
  };

  // Wishlist
  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  // Addresses
  const handleEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setAddrForm(addr);
    setShowAddressModal(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setAddrForm({ type: 'Home', default: false });
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (id: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(a => a.id !== id));
    }
  };

  const saveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(prev => prev.map(a => a.id === editingAddress.id ? { ...a, ...addrForm } as Address : a));
    } else {
      const newAddr = { ...addrForm, id: Date.now() } as Address;
      setAddresses(prev => [...prev, newAddr]);
    }
    setShowAddressModal(false);
  };

  // Cards
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: Card = {
      id: Date.now(),
      type: 'Visa',
      last4: cardForm.number.slice(-4),
      expiry: cardForm.expiry,
      holder: cardForm.holder.toUpperCase()
    };
    setCards(prev => [...prev, newCard]);
    setShowCardModal(false);
    setCardForm({ number: '', expiry: '', holder: '' });
  };

  const handleDeleteCard = (id: number) => {
    if (window.confirm('Remove this card?')) {
      setCards(prev => prev.filter(c => c.id !== id));
    }
  };

  // Mock Orders Data (Using static products for now to avoid complexity in this file)
  const fallbackProduct: Product = {
    id: '0',
    name: 'Product Unavailable',
    price: 0,
    category: 'Uncategorized',
    image: 'https://via.placeholder.com/150',
    description: 'Product details are not available',
    features: []
  };

  const orders = [
    { id: 'VAS-8821', date: 'Oct 24, 2024', total: 12500, status: 'Delivered', items: [products[0] || fallbackProduct] },
    { id: 'VAS-9932', date: 'Nov 02, 2024', total: 3500, status: 'In Transit', items: [products[3] || fallbackProduct] },
  ];

  // --- COMPONENTS ---

  const TabButton = ({ id, label, icon: Icon }: { id: Tab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-300 border-l-2 ${
        activeTab === id 
          ? 'bg-primary/5 border-primary text-primary' 
          : 'border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-800'
      }`}
    >
      <Icon size={18} />
      <span className="uppercase tracking-widest">{label}</span>
      {activeTab === id && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );

  return (
    <div className="bg-secondary min-h-screen pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-serif text-primary mb-2">My Account</h1>
          <p className="text-stone-500 mb-10">Welcome back, {user.name}</p>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4 bg-white shadow-sm rounded-sm overflow-hidden sticky top-28">
            <div className="p-6 border-b border-stone-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                  <User size={24} />
               </div>
               <div>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">Signed in as</p>
                  <p className="text-primary font-bold truncate max-w-[150px]">{user.email}</p>
               </div>
            </div>
            <nav className="py-2">
              <TabButton id="dashboard" label="Overview" icon={User} />
              <TabButton id="orders" label="My Orders" icon={Package} />
              <TabButton id="wishlist" label="Wishlist" icon={Heart} />
              <TabButton id="addresses" label="Addresses" icon={MapPin} />
              <TabButton id="payments" label="Payments" icon={CreditCard} />
              <TabButton id="settings" label="Settings" icon={Settings} />
              <div className="my-2 border-t border-stone-100"></div>
              <button 
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                <span className="uppercase tracking-widest">Log Out</span>
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
             <Reveal delay={200} width="100%">
                
                {/* DASHBOARD */}
                {activeTab === 'dashboard' && (
                   <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="bg-white p-6 shadow-sm border-t-4 border-primary">
                            <h3 className="text-stone-500 text-xs uppercase tracking-widest mb-2">Total Orders</h3>
                            <p className="text-3xl font-serif text-primary">12</p>
                         </div>
                         <div className="bg-white p-6 shadow-sm border-t-4 border-accent">
                            <h3 className="text-stone-500 text-xs uppercase tracking-widest mb-2">Wishlist Items</h3>
                            <p className="text-3xl font-serif text-primary">{wishlistItems.length}</p>
                         </div>
                         <div className="bg-white p-6 shadow-sm border-t-4 border-stone-300">
                            <h3 className="text-stone-500 text-xs uppercase tracking-widest mb-2">Membership</h3>
                            <p className="text-xl font-serif text-primary">Gold Tier</p>
                         </div>
                      </div>

                      <div className="bg-white p-8 shadow-sm">
                         <h3 className="font-serif text-xl text-primary mb-6">Recent Order</h3>
                         <div className="flex flex-col md:flex-row gap-6 border border-stone-100 p-4 bg-stone-50/50">
                            <div className="w-24 h-32 flex-shrink-0 bg-stone-200">
                               <img src={orders[0].items[0].image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between mb-2">
                                  <span className="text-sm font-bold text-primary">{orders[0].items[0].name}</span>
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">{orders[0].status}</span>
                               </div>
                               <p className="text-xs text-stone-500 mb-4">Order #{orders[0].id} • Placed on {orders[0].date}</p>
                               <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>Track Order</Button>
                            </div>
                         </div>
                      </div>
                   </div>
                )}
                
                {/* ... other tabs remain same ... */}

                {/* ORDERS */}
                {activeTab === 'orders' && (
                   <div className="space-y-6">
                      <h2 className="font-serif text-2xl text-primary mb-6">Order History</h2>
                      {orders.map(order => (
                         <div key={order.id} className="bg-white border border-stone-200 shadow-sm overflow-hidden">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                               <div className="flex gap-8 text-sm text-stone-600">
                                  <div>
                                     <span className="block text-xs uppercase text-stone-400">Order Placed</span>
                                     <span className="font-medium text-primary">{order.date}</span>
                                  </div>
                                  <div>
                                     <span className="block text-xs uppercase text-stone-400">Total</span>
                                     <span className="font-medium text-primary">₹{order.total.toLocaleString()}</span>
                                  </div>
                                  <div>
                                     <span className="block text-xs uppercase text-stone-400">Order #</span>
                                     <span className="font-medium text-primary">{order.id}</span>
                                  </div>
                               </div>
                               <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="py-2 text-xs gap-2"
                                  onClick={() => handleDownloadInvoice(order.id)}
                                >
                                  <Download size={14} /> Invoice
                                </Button>
                            </div>
                            <div className="p-6">
                               <div className="flex flex-col sm:flex-row gap-6">
                                  <img src={order.items[0].image} alt={order.items[0].name} className="w-24 h-32 object-cover bg-stone-100" />
                                  <div className="flex-1">
                                     <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">{order.items[0].name}</h4>
                                            <p className="text-sm text-stone-500 mb-4">Qty: 1</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary">₹{order.items[0].price?.toLocaleString() || 0}</p>
                                        </div>
                                     </div>
                                     
                                     {/* Tracking Bar */}
                                     <div className="mt-4">
                                        <div className="flex items-center gap-2 mb-2">
                                           {order.status === 'Delivered' ? (
                                              <CheckCircle size={16} className="text-green-600" />
                                           ) : (
                                              <Truck size={16} className="text-accent" />
                                           )}
                                           <span className="text-sm font-medium text-primary">{order.status === 'Delivered' ? 'Delivered on Oct 28' : 'Arriving by Nov 05'}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                           <div 
                                              className={`h-full ${order.status === 'Delivered' ? 'bg-green-500 w-full' : 'bg-accent w-2/3'}`}
                                           ></div>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                )}

                {/* WISHLIST */}
                {activeTab === 'wishlist' && (
                   <div>
                      <h2 className="font-serif text-2xl text-primary mb-6">My Wishlist</h2>
                      {wishlistItems.length === 0 ? (
                        <p className="text-stone-500">Your wishlist is empty.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           {wishlistItems.map(item => (
                              <div key={item.id} className="group relative bg-white border border-stone-100 shadow-sm">
                                 <div className="aspect-[3/4] overflow-hidden relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <button 
                                      onClick={() => removeFromWishlist(item.id)}
                                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-stone-50 transition-colors"
                                      title="Remove from Wishlist"
                                    >
                                       <X size={16} />
                                    </button>
                                 </div>
                                 <div className="p-4 text-center">
                                    <h3 className="font-serif text-primary text-lg truncate">{item.name}</h3>
                                    <p className="text-stone-500 mb-4">₹{item.price.toLocaleString()}</p>
                                    <Button className="w-full py-3 text-xs uppercase">Add to Bag</Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                      )}
                   </div>
                )}

                {/* ADDRESSES */}
                {activeTab === 'addresses' && (
                   <div>
                      <div className="flex justify-between items-center mb-6">
                         <h2 className="font-serif text-2xl text-primary">Saved Addresses</h2>
                         <Button size="sm" variant="outline" className="text-xs gap-2" onClick={handleAddNewAddress}>
                            <Plus size={14} /> Add New
                         </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {addresses.map(addr => (
                            <div key={addr.id} className={`bg-white p-6 border ${addr.default ? 'border-primary' : 'border-stone-200'} shadow-sm relative group`}>
                               {addr.default && (
                                  <span className="absolute top-0 right-0 bg-primary text-white text-[10px] uppercase font-bold px-2 py-1">Default</span>
                               )}
                               <div className="flex items-center gap-2 mb-3">
                                  <MapPin size={16} className="text-accent" />
                                  <span className="font-bold text-sm uppercase tracking-wider">{addr.type}</span>
                               </div>
                               <p className="font-bold text-primary mb-1">{addr.name}</p>
                               <div className="text-sm text-stone-500 space-y-0.5 mb-4">
                                  <p>{addr.line1}</p>
                                  <p>{addr.line2}</p>
                                  <p>{addr.city}, {addr.state} - {addr.zip}</p>
                                  <p className="pt-2 text-stone-800">Phone: {addr.phone}</p>
                               </div>
                               <div className="flex gap-4 pt-4 border-t border-stone-100">
                                  <button onClick={() => handleEditAddress(addr)} className="text-xs uppercase font-bold text-primary hover:text-accent flex items-center gap-1">
                                    <Edit2 size={12} /> Edit
                                  </button>
                                  {!addr.default && (
                                    <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs uppercase font-bold text-red-500 hover:text-red-600 flex items-center gap-1">
                                       <X size={12} /> Remove
                                    </button>
                                  )}
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                {/* PAYMENTS */}
                {activeTab === 'payments' && (
                   <div>
                      <div className="flex justify-between items-center mb-6">
                         <h2 className="font-serif text-2xl text-primary">Payment Methods</h2>
                         <Button size="sm" variant="outline" className="text-xs gap-2" onClick={() => setShowCardModal(true)}>
                            <Plus size={14} /> Add Card
                         </Button>
                      </div>
                      <div className="space-y-4">
                         {cards.map(card => (
                            <div key={card.id} className="bg-white p-6 border border-stone-200 flex items-center justify-between">
                               <div className="flex items-center gap-6">
                                  <div className="w-12 h-8 bg-stone-800 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                                     {card.type}
                                  </div>
                                  <div>
                                     <p className="font-serif text-primary text-lg tracking-widest">•••• •••• •••• {card.last4}</p>
                                     <p className="text-xs text-stone-500 uppercase mt-1">Expires {card.expiry} • {card.holder}</p>
                                  </div>
                               </div>
                               <button onClick={() => handleDeleteCard(card.id)} className="text-stone-400 hover:text-red-500 transition-colors" title="Remove Card">
                                  <X size={20} />
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                {/* SETTINGS */}
                {activeTab === 'settings' && (
                   <div className="max-w-xl">
                      <h2 className="font-serif text-2xl text-primary mb-6">Account Settings</h2>
                      
                      <div className="bg-white p-8 border border-stone-200 space-y-6">
                         <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Display Name</label>
                            <input type="text" defaultValue={user.name} className="w-full bg-white border border-stone-300 px-3 py-2 text-primary focus:outline-none focus:border-accent" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                            <input type="email" defaultValue={user.email} disabled className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-stone-400 cursor-not-allowed" />
                         </div>
                         
                         <div className="pt-6 border-t border-stone-100">
                            <h3 className="font-bold text-primary mb-4">Change Password</h3>
                            <div className="space-y-4">
                               <input type="password" placeholder="Current Password" className="w-full bg-white border border-stone-300 px-3 py-2 text-primary focus:outline-none focus:border-accent" />
                               <input type="password" placeholder="New Password" className="w-full bg-white border border-stone-300 px-3 py-2 text-primary focus:outline-none focus:border-accent" />
                            </div>
                         </div>

                         <div className="pt-6 border-t border-stone-100">
                            <h3 className="font-bold text-primary mb-4">Notifications</h3>
                            <div className="space-y-3">
                               <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                                  <span className="text-sm text-stone-600">Email me about new collections & exclusive offers</span>
                               </label>
                               <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                                  <span className="text-sm text-stone-600">Email me about order status updates</span>
                               </label>
                            </div>
                         </div>

                         <div className="pt-6">
                            <Button className="w-full">Save Changes</Button>
                         </div>
                      </div>
                   </div>
                )}

             </Reveal>
          </div>
        </div>

        {/* MODALS */}
        
        {/* Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)} />
            <div className="relative bg-white w-full max-w-lg p-8 shadow-2xl rounded-sm animate-fade-in-up">
              <h3 className="font-serif text-2xl text-primary mb-6">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
              <form onSubmit={saveAddress} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase">Type</label>
                    <select 
                      value={addrForm.type} 
                      onChange={e => setAddrForm({...addrForm, type: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                    >
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase">Name</label>
                    <input 
                      type="text" 
                      value={addrForm.name || ''} 
                      onChange={e => setAddrForm({...addrForm, name: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-500 uppercase">Address Line 1</label>
                  <input 
                    type="text" 
                    value={addrForm.line1 || ''} 
                    onChange={e => setAddrForm({...addrForm, line1: e.target.value})}
                    className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-500 uppercase">Address Line 2</label>
                  <input 
                    type="text" 
                    value={addrForm.line2 || ''} 
                    onChange={e => setAddrForm({...addrForm, line2: e.target.value})}
                    className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase">City</label>
                    <input 
                      type="text" 
                      value={addrForm.city || ''} 
                      onChange={e => setAddrForm({...addrForm, city: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase">State</label>
                    <input 
                      type="text" 
                      value={addrForm.state || ''} 
                      onChange={e => setAddrForm({...addrForm, state: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="text-xs font-bold text-stone-500 uppercase">Zip Code</label>
                    <input 
                      type="text" 
                      value={addrForm.zip || ''} 
                      onChange={e => setAddrForm({...addrForm, zip: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase">Phone</label>
                    <input 
                      type="text" 
                      value={addrForm.phone || ''} 
                      onChange={e => setAddrForm({...addrForm, phone: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddressModal(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Save Address</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Card Modal */}
        {showCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCardModal(false)} />
            <div className="relative bg-white w-full max-w-md p-8 shadow-2xl rounded-sm animate-fade-in-up">
              <h3 className="font-serif text-2xl text-primary mb-6">Add New Card</h3>
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                   <label className="text-xs font-bold text-stone-500 uppercase">Card Number</label>
                   <input 
                      type="text" 
                      value={cardForm.number} 
                      onChange={e => setCardForm({...cardForm, number: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      placeholder="0000 0000 0000 0000"
                      required
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-stone-500 uppercase">Card Holder Name</label>
                   <input 
                      type="text" 
                      value={cardForm.holder} 
                      onChange={e => setCardForm({...cardForm, holder: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      required
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-stone-500 uppercase">Expiry Date (MM/YY)</label>
                   <input 
                      type="text" 
                      value={cardForm.expiry} 
                      onChange={e => setCardForm({...cardForm, expiry: e.target.value})}
                      className="w-full bg-white border border-stone-300 p-2 mt-1 focus:border-accent focus:outline-none"
                      placeholder="MM/YY"
                      required
                   />
                </div>
                 <div className="flex gap-4 mt-6">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCardModal(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Add Card</Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;