import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Reveal } from '../components/UI/Reveal';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/UI/Button';

const TrackOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [orderId, setOrderId] = useState(initialId);
  const { orders } = useStore();
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [error, setError] = useState('');

  // Auto search if ID provided in URL
  useEffect(() => {
    if (initialId) {
      handleSearch();
    }
  }, [initialId, orders]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    
    if (!orderId.trim()) {
       setError('Please enter a valid Order ID');
       return;
    }

    const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    
    if (order) {
      setSearchedOrder(order);
    } else {
      setSearchedOrder(null);
      setError('Order not found. Please check your Order ID.');
    }
  };

  const steps = ['Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = searchedOrder ? steps.indexOf(searchedOrder.status) : 0;
  const isCancelled = searchedOrder?.status === 'Cancelled';

  return (
    <div className="min-h-screen bg-secondary pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
             <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Logistics</span>
             <h1 className="text-4xl md:text-5xl font-serif text-primary">Track Your Order</h1>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-xl rounded-sm border-t-4 border-primary">
             <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="flex-1 relative">
                   <input 
                      type="text" 
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Enter Order ID (e.g., VAS-7721)"
                      className="w-full border border-stone-300 px-4 py-4 pl-12 focus:outline-none focus:border-accent text-lg"
                   />
                   <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>
                <Button size="lg" className="px-10">Track</Button>
             </form>

             {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-sm text-center mb-6 border border-red-100">
                   {error}
                </div>
             )}

             {searchedOrder && (
                <div className="animate-fade-in-up">
                   <div className="flex justify-between items-start border-b border-stone-100 pb-6 mb-8">
                      <div>
                         <h3 className="text-2xl font-serif text-primary mb-1">Order #{searchedOrder.id}</h3>
                         <p className="text-stone-500">Placed on {searchedOrder.date}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs uppercase text-stone-400 font-bold tracking-widest mb-1">Total Amount</p>
                         <p className="text-xl font-bold text-primary">₹{searchedOrder.total.toLocaleString()}</p>
                      </div>
                   </div>

                   {/* Progress Bar */}
                   {isCancelled ? (
                      <div className="bg-red-50 p-6 text-center border border-red-200 rounded-sm mb-10">
                         <h3 className="text-red-600 font-bold text-xl mb-2">Order Cancelled</h3>
                         <p className="text-red-500">This order has been cancelled. Please contact support for assistance.</p>
                      </div>
                   ) : (
                      <div className="mb-12 relative px-4">
                         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-100 -translate-y-1/2 z-0"></div>
                         <div 
                            className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 z-0 transition-all duration-1000"
                            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                         ></div>
                         
                         <div className="relative z-10 flex justify-between w-full">
                            {steps.map((step, idx) => {
                               const isCompleted = idx <= currentStepIndex;
                               const isCurrent = idx === currentStepIndex;
                               
                               return (
                                  <div key={step} className="flex flex-col items-center gap-3">
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 bg-white ${isCompleted ? 'border-accent text-accent' : 'border-stone-200 text-stone-300'}`}>
                                        {step === 'Processing' && <Clock size={18} />}
                                        {step === 'Shipped' && <Truck size={18} />}
                                        {step === 'Delivered' && <CheckCircle size={18} />}
                                     </div>
                                     <p className={`text-xs font-bold uppercase tracking-wider ${isCompleted ? 'text-primary' : 'text-stone-300'}`}>{step}</p>
                                  </div>
                               );
                            })}
                         </div>
                      </div>
                   )}

                   {/* Details */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-50 p-6 rounded-sm">
                      <div>
                         <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Shipping Address</h4>
                         <p className="text-stone-700 leading-relaxed font-light">{searchedOrder.shippingAddress}</p>
                         <p className="text-stone-700 font-bold mt-2">{searchedOrder.customerName}</p>
                      </div>
                      <div>
                         <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Order Items</h4>
                         <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                            {searchedOrder.items.map((item: any, idx: number) => (
                               <div key={idx} className="flex items-center gap-3">
                                  <div className="w-10 h-12 bg-stone-200 rounded-sm overflow-hidden">
                                     <img src={item.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                     <p className="text-sm font-medium text-primary line-clamp-1">{item.name}</p>
                                     <p className="text-xs text-stone-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                </div>
             )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default TrackOrder;