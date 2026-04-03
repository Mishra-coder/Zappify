import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const cart = await AsyncStorage.getItem('zappify_cart');
      const wishlist = await AsyncStorage.getItem('zappify_wishlist');
      const savedUser = await AsyncStorage.getItem('zappify_user');
      if (cart) setCartItems(JSON.parse(cart));
      if (wishlist) setWishlistItems(JSON.parse(wishlist));
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setUser(u);
        const userOrders = await AsyncStorage.getItem(`zappify_orders_${u.email}`);
        if (userOrders) setOrders(JSON.parse(userOrders));
      }
    };
    load();
  }, []);

  const addToCart = (product, size) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size);
      const updated = exists
        ? prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, size, qty: 1 }];
      AsyncStorage.setItem('zappify_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => {
      const updated = prev.filter(i => !(i.id === id && i.size === size));
      AsyncStorage.setItem('zappify_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const updated = prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product];
      AsyncStorage.setItem('zappify_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isWishlisted = (id) => wishlistItems.some(i => i.id === id);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('zappify_user', JSON.stringify(userData));
    const userOrders = await AsyncStorage.getItem(`zappify_orders_${userData.email}`);
    setOrders(userOrders ? JSON.parse(userOrders) : []);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('zappify_user');
    setOrders([]);
  };

  const placeOrder = async (items) => {
    const newOrders = items.map(item => ({
      ...item,
      orderId: Math.floor(10000000 + Math.random() * 90000000).toString(),
      placedAt: new Date().toISOString(),
      status: 'Placed',
    }));
    const updated = [...orders, ...newOrders];
    setOrders(updated);
    await AsyncStorage.setItem(`zappify_orders_${user.email}`, JSON.stringify(updated));
    setCartItems([]);
    await AsyncStorage.removeItem('zappify_cart');
  };

  const cancelOrder = async (orderId) => {
    const updated = orders.map(o => o.orderId === orderId ? { ...o, status: 'Cancelled' } : o);
    setOrders(updated);
    await AsyncStorage.setItem(`zappify_orders_${user.email}`, JSON.stringify(updated));
  };

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{
      cartItems, wishlistItems, user, orders,
      addToCart, removeFromCart, toggleWishlist, isWishlisted,
      login, logout, placeOrder, cancelOrder,
      cartTotal, cartCount,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
