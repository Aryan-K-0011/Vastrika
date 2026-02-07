import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { Navigate } from 'react-router-dom';
import { Reveal } from '../components/UI/Reveal';
import { Button } from '../components/UI/Button';
import { 
  LayoutDashboard, ShoppingBag, Package, Tag, Trash2, Edit, Plus, 
  Check, X, TrendingUp, Users, DollarSign, Search, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Product, Order } from '../types';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'discounts';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { products, orders, coupons, addProduct, updateProduct, deleteProduct, updateOrderStatus, addCoupon, deleteCoupon } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({});

  // Coupon Form State
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [couponForm, setCouponForm] = useState<{
    code: string;
    discountType: 'percentage' | 'fixed';
    value: string;
  }>({ code: '', discountType: 'percentage', value: '' });

  // Auth Check (Simple email check for demo)
  if (!user || !user.email.includes('admin')) {
     return <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
            <h2 className="text-2xl font-serif text-primary mb-4">Access Denied</h2>
            <p className="text-stone-500">You do not have permission to view this page. <br/>(Hint: Login with email containing 'admin')</p>
        </div>
     </div>;
  }

  // --- Handlers ---

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const newProduct: Product = {
      id: productForm.id || Date.now().toString(),
      name: productForm.name,
      price: Number(productForm.price),
      salePrice: productForm.salePrice ? Number(productForm.salePrice) : undefined,
      category: productForm.category || 'sarees',
      image: productForm.image || 'https://via.placeholder.com/800x1000',
      description: productForm.description || '',
      features: productForm.features || ['Premium Quality'],
    };

    if (productForm.id) {
      updateProduct(newProduct);
    } else {
      addProduct(newProduct);
    }
    setIsEditingProduct(false);
    setProductForm({});
  };

  const handleEditClick = (product: Product) => {
    setProductForm(product);
    setIsEditingProduct(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id: string) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.value) return;

    addCoupon({
      code: couponForm.code.toUpperCase(),
      discountType: couponForm.discountType,
      value: Number(couponForm.value),
      isActive: true
    });
    setIsAddingCoupon(false);
    setCouponForm({ code: '', discountType: 'percentage', value: '' });
  };

  // --- Statistics ---
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Processing').length;

  return (
    <div className="min-h-screen bg-stone-50 pt-28 pb-12 flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-stone-200 lg:min-h-[calc(100vh-7rem)]">
        <div className="p-6">
           <h2 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
              <LayoutDashboard className="text-accent" /> Admin Panel
           </h2>
        </div>
        <nav className="mt-4">
           <button 
             onClick={() => setActiveTab('dashboard')} 
             className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'}`}
           >
              <TrendingUp size={18} /> Dashboard
           </button>
           <button 
             onClick={() => setActiveTab('products')} 
             className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-colors ${activeTab === 'products' ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'}`}
           >
              <ShoppingBag size={18} /> Products
           </button>
           <button 
             onClick={() => setActiveTab('orders')} 
             className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'}`}
           >
              <Package size={18} /> Orders
              {pendingOrders > 0 && <span className="ml-auto bg-accent text-white text-[10px] px-2 py-0.5 rounded-full">{pendingOrders}</span>}
           </button>
           <button 
             onClick={() => setActiveTab('discounts')} 
             className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-colors ${activeTab === 'discounts' ? 'bg-primary text-white' : 'text-stone-600 hover:bg-stone-100'}`}
           >
              <Tag size={18} /> Discounts
           </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
         <Reveal width="100%">
            
            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
               <div className="space-y-8">
                  <h1 className="text-3xl font-serif text-primary">Overview</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-accent">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <p className="text-stone-500 text-xs uppercase tracking-widest">Total Revenue</p>
                              <h3 className="text-3xl font-serif text-primary mt-1">₹{totalRevenue.toLocaleString()}</h3>
                           </div>
                           <div className="p-3 bg-stone-50 rounded-full text-accent"><DollarSign size={24} /></div>
                        </div>
                        <p className="text-green-600 text-xs font-bold flex items-center gap-1"><TrendingUp size={12} /> +12% from last month</p>
                     </div>

                     <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-primary">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <p className="text-stone-500 text-xs uppercase tracking-widest">Total Orders</p>
                              <h3 className="text-3xl font-serif text-primary mt-1">{orders.length}</h3>
                           </div>
                           <div className="p-3 bg-stone-50 rounded-full text-primary"><Package size={24} /></div>
                        </div>
                        <p className="text-stone-400 text-xs">{pendingOrders} pending processing</p>
                     </div>

                     <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-stone-300">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <p className="text-stone-500 text-xs uppercase tracking-widest">Products</p>
                              <h3 className="text-3xl font-serif text-primary mt-1">{products.length}</h3>
                           </div>
                           <div className="p-3 bg-stone-50 rounded-full text-stone-400"><ShoppingBag size={24} /></div>
                        </div>
                        <p className="text-stone-400 text-xs">In 5 categories</p>
                     </div>
                  </div>

                  <div className="bg-white p-8 rounded-sm shadow-sm">
                     <h3 className="font-serif text-xl text-primary mb-6">Recent Activity</h3>
                     <div className="space-y-4">
                        {orders.slice(0, 5).map(order => (
                           <div key={order.id} className="flex items-center justify-between border-b border-stone-100 pb-4">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-primary font-bold">
                                    {order.customerName.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="font-bold text-primary text-sm">{order.customerName} placed an order</p>
                                    <p className="text-stone-400 text-xs">{order.date} • ₹{order.total.toLocaleString()}</p>
                                 </div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                 {order.status}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* PRODUCTS */}
            {activeTab === 'products' && (
               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                     <h1 className="text-3xl font-serif text-primary">Product Management</h1>
                     <Button onClick={() => { setIsEditingProduct(true); setProductForm({}); }} className="gap-2">
                        <Plus size={18} /> Add Product
                     </Button>
                  </div>

                  {/* Add/Edit Form */}
                  {isEditingProduct && (
                     <div className="bg-white p-8 border border-accent/20 rounded-sm shadow-lg mb-8 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-serif text-xl text-primary">{productForm.id ? 'Edit Product' : 'Add New Product'}</h3>
                           <button onClick={() => setIsEditingProduct(false)}><X size={20} className="text-stone-400 hover:text-red-500" /></button>
                        </div>
                        <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="md:col-span-2">
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Product Name</label>
                              <input required type="text" value={productForm.name || ''} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Price (₹)</label>
                              <input required type="number" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Sale Price (Optional)</label>
                              <input type="number" value={productForm.salePrice || ''} onChange={e => setProductForm({...productForm, salePrice: Number(e.target.value)})} className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none" placeholder="Leave empty if no discount" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Category</label>
                              <select value={productForm.category || 'sarees'} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none">
                                 <option value="sarees">Sarees</option>
                                 <option value="lehengas">Lehengas</option>
                                 <option value="suits">Suits</option>
                                 <option value="kurtis">Kurtis</option>
                                 <option value="wedding">Wedding</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Image URL</label>
                              <input type="text" value={productForm.image || ''} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none" placeholder="https://..." />
                           </div>
                           <div className="md:col-span-2">
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Description</label>
                              <textarea rows={3} value={productForm.description || ''} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none" />
                           </div>
                           <div className="md:col-span-2 flex justify-end gap-4">
                              <Button type="button" variant="outline" onClick={() => setIsEditingProduct(false)}>Cancel</Button>
                              <Button type="submit">Save Product</Button>
                           </div>
                        </form>
                     </div>
                  )}

                  {/* Product List */}
                  <div className="bg-white shadow-sm overflow-hidden">
                     <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-200">
                           <tr>
                              <th className="p-4 text-xs font-bold uppercase text-stone-500">Image</th>
                              <th className="p-4 text-xs font-bold uppercase text-stone-500">Name</th>
                              <th className="p-4 text-xs font-bold uppercase text-stone-500">Category</th>
                              <th className="p-4 text-xs font-bold uppercase text-stone-500">Price</th>
                              <th className="p-4 text-xs font-bold uppercase text-stone-500 text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                           {products.map(product => (
                              <tr key={product.id} className="hover:bg-stone-50/50">
                                 <td className="p-4"><img src={product.image} alt="" className="w-12 h-16 object-cover rounded-sm" /></td>
                                 <td className="p-4 font-medium text-primary">
                                    {product.name}
                                    {product.salePrice && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Sale</span>}
                                 </td>
                                 <td className="p-4 text-sm text-stone-500 capitalize">{product.category}</td>
                                 <td className="p-4 text-sm font-bold">
                                    {product.salePrice ? (
                                       <>
                                          <span className="text-red-500 mr-2">₹{product.salePrice.toLocaleString()}</span>
                                          <span className="text-stone-400 line-through text-xs">₹{product.price.toLocaleString()}</span>
                                       </>
                                    ) : (
                                       <span>₹{product.price.toLocaleString()}</span>
                                    )}
                                 </td>
                                 <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                       <button onClick={() => handleEditClick(product)} className="p-2 text-stone-400 hover:text-accent hover:bg-stone-100 rounded-full"><Edit size={16} /></button>
                                       <button onClick={() => handleDeleteClick(product.id)} className="p-2 text-stone-400 hover:text-red-500 hover:bg-stone-100 rounded-full"><Trash2 size={16} /></button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* ORDERS */}
            {activeTab === 'orders' && (
               <div className="space-y-8">
                  <h1 className="text-3xl font-serif text-primary">Order Management</h1>
                  
                  <div className="space-y-6">
                     {orders.map(order => (
                        <div key={order.id} className="bg-white border border-stone-200 shadow-sm rounded-sm overflow-hidden">
                           <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
                              <div>
                                 <h3 className="font-bold text-primary">Order #{order.id}</h3>
                                 <p className="text-xs text-stone-500">{order.date} • {order.customerName} ({order.customerEmail})</p>
                              </div>
                              <div className="flex items-center gap-4">
                                 <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase text-stone-500">Status:</span>
                                    <select 
                                       value={order.status}
                                       onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                       className="bg-white border border-stone-300 text-sm rounded-sm px-2 py-1 focus:border-accent outline-none cursor-pointer"
                                    >
                                       <option value="Processing">Processing</option>
                                       <option value="Shipped">Shipped</option>
                                       <option value="Delivered">Delivered</option>
                                       <option value="Cancelled">Cancelled</option>
                                    </select>
                                 </div>
                                 <span className="font-bold text-lg text-primary">₹{order.total.toLocaleString()}</span>
                              </div>
                           </div>
                           <div className="p-6">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Items</h4>
                              <div className="space-y-4">
                                 {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                       <img src={item.image} alt="" className="w-12 h-16 object-cover bg-stone-100" />
                                       <div className="flex-1">
                                          <p className="font-medium text-sm text-primary">{item.name}</p>
                                          <p className="text-xs text-stone-500">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                                       </div>
                                       <p className="font-medium text-sm">₹{item.price.toLocaleString()}</p>
                                    </div>
                                 ))}
                              </div>
                              <div className="mt-6 pt-6 border-t border-stone-100">
                                 <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Shipping Address</h4>
                                 <p className="text-sm text-stone-600">{order.shippingAddress}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* DISCOUNTS */}
            {activeTab === 'discounts' && (
               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                     <h1 className="text-3xl font-serif text-primary">Discounts & Coupons</h1>
                     <Button onClick={() => setIsAddingCoupon(true)} className="gap-2">
                        <Plus size={18} /> Add Coupon
                     </Button>
                  </div>
                  
                  {isAddingCoupon && (
                     <div className="bg-white p-8 border border-accent/20 rounded-sm shadow-lg mb-8 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-serif text-xl text-primary">Create New Coupon</h3>
                           <button onClick={() => setIsAddingCoupon(false)}><X size={20} className="text-stone-400 hover:text-red-500" /></button>
                        </div>
                        <form onSubmit={handleSaveCoupon} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Coupon Code</label>
                              <input 
                                 required 
                                 type="text" 
                                 value={couponForm.code} 
                                 onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} 
                                 className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none uppercase" 
                                 placeholder="SUMMER20"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Discount Type</label>
                              <select 
                                 value={couponForm.discountType} 
                                 onChange={e => setCouponForm({...couponForm, discountType: e.target.value as 'percentage' | 'fixed'})} 
                                 className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none"
                              >
                                 <option value="percentage">Percentage (%)</option>
                                 <option value="fixed">Fixed Amount (₹)</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Value</label>
                              <input 
                                 required 
                                 type="number" 
                                 value={couponForm.value} 
                                 onChange={e => setCouponForm({...couponForm, value: e.target.value})} 
                                 className="w-full bg-stone-50 border border-stone-200 p-3 focus:border-accent outline-none" 
                                 placeholder={couponForm.discountType === 'percentage' ? "10" : "500"}
                                 min="0"
                              />
                           </div>
                           <div className="md:col-span-3 flex justify-end gap-4 mt-2">
                              <Button type="button" variant="outline" onClick={() => setIsAddingCoupon(false)}>Cancel</Button>
                              <Button type="submit">Create Coupon</Button>
                           </div>
                        </form>
                     </div>
                  )}

                  <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200">
                     <h3 className="font-serif text-xl text-primary mb-6">Active Coupons</h3>
                     {coupons.length === 0 ? (
                        <p className="text-stone-500 italic">No active coupons found. Create one to get started.</p>
                     ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {coupons.map((coupon, idx) => (
                              <div key={idx} className="border border-dashed border-accent bg-accent/5 p-6 rounded-sm flex justify-between items-center">
                                 <div>
                                    <p className="font-bold text-2xl text-primary tracking-widest">{coupon.code}</p>
                                    <p className="text-sm text-stone-600 font-medium mt-1">
                                       {coupon.discountType === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value.toLocaleString()} FLAT OFF`}
                                    </p>
                                    <p className="text-xs text-green-600 mt-1 uppercase tracking-wide font-bold">Active</p>
                                 </div>
                                 <button onClick={() => deleteCoupon(coupon.code)} className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-full transition-colors" title="Delete Coupon"><Trash2 size={20} /></button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            )}

         </Reveal>
      </main>
    </div>
  );
};

export default Admin;