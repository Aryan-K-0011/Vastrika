import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { X, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, CreditCard, Wallet, Truck, Check, Copy } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, isOpen, setIsOpen, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useStore();
  
  const [step, setStep] = useState<'cart' | 'checkout' | 'payment' | 'success'>('cart');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form State
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    pincode: ''
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardDetails({ ...cardDetails, number: value });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2);
    setCardDetails({ ...cardDetails, expiry: value });
  };

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Generate Order ID
    const newOrderId = `VAS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);

    // Create Order Object
    const newOrder = {
      id: newOrderId,
      customerName: shippingDetails.fullName || user?.name || 'Guest',
      customerEmail: shippingDetails.email || user?.email || 'guest@example.com',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: cartTotal,
      status: 'Processing' as const,
      items: [...items],
      shippingAddress: `${shippingDetails.address}, ${shippingDetails.city} - ${shippingDetails.pincode}`
    };

    // Simulate API delay then sync
    setTimeout(() => {
        placeOrder(newOrder); // Update Global Store (Syncs with Admin)
        clearCart(); // Clear local cart
        setLoading(false);
        setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset to cart if closed on success
    if (step === 'success') {
      setTimeout(() => setStep('cart'), 500); 
    }
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied!');
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
        onClick={handleClose} 
      />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl transform transition-transform duration-300 animate-in slide-in-from-right flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center bg-white z-10">
          <h2 className="text-xl font-serif font-bold text-primary tracking-wide">
            {step === 'cart' ? 'Your Bag' : step === 'checkout' ? 'Shipping Address' : step === 'payment' ? 'Payment Method' : 'Order Confirmed'}
          </h2>
          <button onClick={handleClose} className="text-stone-400 hover:text-primary transition-colors p-2 hover:bg-stone-50 rounded-full">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50/50">
          
          {step === 'cart' && (
            items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-300">
                    <ShoppingBag size={32} />
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">Your bag is empty</h3>
                <p className="text-stone-500 mb-8 font-light">Looks like you haven't added any treasures yet.</p>
                <Button variant="secondary" onClick={handleClose}>Start Shopping</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 bg-white p-4 rounded-sm shadow-sm border border-stone-100">
                    <div className="w-20 h-24 bg-stone-100 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-bold text-primary line-clamp-2 leading-snug">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize)} 
                            className="text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Size: {item.selectedSize}</p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-3">
                        <div className="flex items-center border border-stone-200 rounded-sm bg-stone-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-1.5 hover:bg-white hover:text-primary text-stone-500 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-medium w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="p-1.5 hover:bg-white hover:text-primary text-stone-500 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {step === 'checkout' && (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-100">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      Contact Details
                   </h3>
                   <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">Full Name</label>
                          <input 
                            required 
                            type="text" 
                            value={shippingDetails.fullName}
                            onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                            className="block w-full bg-white border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-accent text-sm" 
                            placeholder="Enter your full name" 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">Email</label>
                          <input 
                            required 
                            type="email" 
                            value={shippingDetails.email}
                            onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                            className="block w-full bg-white border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-accent text-sm" 
                            placeholder="Enter your email" 
                          />
                      </div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-100">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      Shipping Address
                   </h3>
                   <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">Address Line 1</label>
                          <input 
                            required 
                            type="text" 
                            value={shippingDetails.address}
                            onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                            className="block w-full bg-white border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-accent text-sm" 
                            placeholder="House/Flat No, Building, Street" 
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">City</label>
                              <input 
                                required 
                                type="text" 
                                value={shippingDetails.city}
                                onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                                className="block w-full bg-white border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-accent text-sm" 
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-medium text-stone-500 mb-1 uppercase tracking-wide">Pincode</label>
                              <input 
                                required 
                                type="text" 
                                value={shippingDetails.pincode}
                                onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value})}
                                className="block w-full bg-white border border-stone-200 rounded-sm py-2 px-3 focus:outline-none focus:border-accent text-sm" 
                              />
                          </div>
                      </div>
                   </div>
                </div>
             </div>
          )}
          
          {step === 'payment' && (
            <form id="payment-form" onSubmit={handlePlaceOrder} className="space-y-6 animate-in slide-in-from-right duration-300">
               
               {/* Payment Options */}
               <div className="bg-white p-2 rounded-sm shadow-sm border border-stone-100 flex gap-2 mb-6">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 rounded-sm text-sm transition-colors ${paymentMethod === 'card' ? 'bg-primary text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}>
                     <CreditCard size={16} /> Card
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('upi')} className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 rounded-sm text-sm transition-colors ${paymentMethod === 'upi' ? 'bg-primary text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}>
                     <Wallet size={16} /> UPI
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('cod')} className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 rounded-sm text-sm transition-colors ${paymentMethod === 'cod' ? 'bg-primary text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}>
                     <Truck size={16} /> COD
                  </button>
               </div>

               {paymentMethod === 'card' && (
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-100">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Card Details</h3>
                        <div className="flex gap-1 opacity-60">
                           <div className="w-8 h-5 bg-stone-200 rounded-sm"></div>
                           <div className="w-8 h-5 bg-stone-200 rounded-sm"></div>
                        </div>
                     </div>
                     
                     <div className="space-y-5">
                        <div className="relative">
                            <label className="block text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-wider">Card Number</label>
                            <div className="relative">
                               <input 
                                 type="text" 
                                 placeholder="0000 0000 0000 0000" 
                                 className="block w-full bg-white border border-stone-200 rounded-sm py-3 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm tracking-widest"
                                 value={cardDetails.number}
                                 onChange={handleCardNumberChange}
                                 maxLength={19}
                                 required
                               />
                               <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-wider">Cardholder Name</label>
                            <input 
                              type="text" 
                              placeholder="Name on Card" 
                              className="block w-full bg-white border border-stone-200 rounded-sm py-3 px-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm" 
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                              required
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-wider">Expiry Date</label>
                               <input 
                                 type="text" 
                                 placeholder="MM/YY" 
                                 className="block w-full bg-white border border-stone-200 rounded-sm py-3 px-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm tracking-widest" 
                                 value={cardDetails.expiry}
                                 onChange={handleExpiryChange}
                                 maxLength={5}
                                 required
                               />
                           </div>
                           <div>
                               <label className="block text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-wider">CVV</label>
                               <input 
                                 type="password" 
                                 placeholder="123" 
                                 className="block w-full bg-white border border-stone-200 rounded-sm py-3 px-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm tracking-widest" 
                                 value={cardDetails.cvc}
                                 onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value.replace(/\D/g, '').substring(0, 4)})}
                                 maxLength={4}
                                 required
                               />
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {paymentMethod === 'upi' && (
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-100 text-center py-10">
                     <p className="text-stone-500 text-sm mb-4">Enter your UPI ID to verify payment.</p>
                     <input type="text" placeholder="username@upi" className="w-full bg-white border-b border-stone-300 py-2 text-center focus:outline-none focus:border-accent" />
                  </div>
               )}

               {paymentMethod === 'cod' && (
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-100 flex items-center gap-4">
                     <div className="bg-green-50 text-green-600 p-3 rounded-full">
                        <Truck size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold text-primary text-sm">Cash on Delivery</h4>
                        <p className="text-xs text-stone-500 mt-1">Pay with cash upon delivery. Additional ₹50 handling fee may apply.</p>
                     </div>
                  </div>
               )}

               <div className="flex items-center gap-2 text-stone-500 text-[10px] justify-center mt-4">
                  <ShieldCheck size={12} className="text-green-600" />
                  Payments are SSL encrypted and secured.
               </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-in zoom-in duration-500">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">Order Confirmed</h3>
              <p className="text-stone-500 mb-6 max-w-xs mx-auto leading-relaxed text-sm">
                 Thank you, <span className="text-primary font-bold">{shippingDetails.fullName}</span>! Your order has been placed successfully.
              </p>
              
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-sm mb-8 w-full">
                 <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Order ID</p>
                 <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-mono text-primary font-bold">{orderId}</span>
                    <button onClick={copyOrderId} className="text-stone-400 hover:text-accent"><Copy size={16} /></button>
                 </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                 <Link 
                    to={`/track-order?id=${orderId}`}
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-primary text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2"
                 >
                    Track Order <Truck size={16} />
                 </Link>
                 <Button variant="outline" onClick={() => { setIsOpen(false); setStep('cart'); }} className="w-full">Continue Shopping</Button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        {items.length > 0 && step !== 'success' && (
          <div className="border-t border-stone-100 p-6 bg-white z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between mb-2 text-stone-500 text-sm">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
             <div className="flex justify-between mb-4 text-stone-500 text-sm">
              <span>Shipping</span>
              <span className="text-green-600 uppercase text-xs font-bold tracking-wide">Free</span>
            </div>
            <div className="flex justify-between mb-6 text-xl font-serif font-bold text-primary">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            
            {step === 'cart' ? (
              <Button onClick={() => setStep('checkout')} className="w-full py-4 text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                 Proceed to Checkout
              </Button>
            ) : step === 'checkout' ? (
               <div className="flex gap-3">
                 <Button variant="outline" onClick={() => setStep('cart')} className="flex-1 py-4 text-xs uppercase tracking-widest">Back</Button>
                 <Button 
                    onClick={() => {
                        if(shippingDetails.fullName && shippingDetails.address && shippingDetails.city && shippingDetails.pincode) {
                            setStep('payment');
                        } else {
                            alert('Please fill in all shipping details.');
                        }
                    }} 
                    className="flex-[2] py-4 text-xs uppercase tracking-widest shadow-lg"
                 >
                    Proceed to Pay
                 </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                 <Button variant="outline" onClick={() => setStep('checkout')} disabled={loading} className="flex-1 py-4 text-xs uppercase tracking-widest">Back</Button>
                 <Button 
                     type="submit" 
                     form="payment-form" 
                     className="flex-[2] py-4 text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                     disabled={loading}
                 >
                     {loading ? (
                        <>Processing...</>
                     ) : (
                        <>Pay ₹{cartTotal.toLocaleString()}</>
                     )}
                 </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;