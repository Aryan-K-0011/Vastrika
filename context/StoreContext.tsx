import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Order, Coupon } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  getDiscountedPrice: (product: Product) => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with static data, but allow modification via state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vastrika_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vastrika_orders');
    return saved ? JSON.parse(saved) : [
       // Mock Orders for Admin Demo
       {
         id: 'ORD-7721',
         customerName: 'Priya Sharma',
         customerEmail: 'priya@example.com',
         date: '2024-10-24',
         total: 12500,
         status: 'Delivered',
         items: [{...INITIAL_PRODUCTS[0], quantity: 1, selectedSize: 'M'}],
         shippingAddress: '123, Heritage Residency, Jaipur'
       },
       {
         id: 'ORD-9932',
         customerName: 'Rahul Verma',
         customerEmail: 'rahul@example.com',
         date: '2024-11-02',
         total: 3500,
         status: 'Processing',
         items: [{...INITIAL_PRODUCTS[3], quantity: 1, selectedSize: 'L'}],
         shippingAddress: '45, MG Road, Bangalore'
       }
    ];
  });

  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: 'WELCOME10', discountType: 'percentage', value: 10, isActive: true }
  ]);

  // Persist to Local Storage
  useEffect(() => {
    localStorage.setItem('vastrika_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vastrika_orders', JSON.stringify(orders));
  }, [orders]);

  // --- Actions ---

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev, coupon]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  const getDiscountedPrice = (product: Product) => {
    return product.salePrice || product.price;
  };

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      coupons,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      addCoupon,
      deleteCoupon,
      getDiscountedPrice
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};