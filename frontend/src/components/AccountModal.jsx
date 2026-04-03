import React from 'react';
import { motion } from 'framer-motion';
import { X, Package, LogOut, User } from 'lucide-react';

const AccountModal = ({ user, onClose, onLogout, orders }) => {
  return (
    <div className="overlay-system">
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="overlay-header">
          <h3>MY ACCOUNT</h3>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="account-body">
          {/* Profile Card */}
          <div className="account-profile-card">
            <img src={user.picture} alt={user.name} className="account-avatar" />
            <div>
              <p className="account-name">{user.name}</p>
              <p className="account-email">{user.email}</p>
            </div>
          </div>

          {/* My Orders */}
          <div className="account-section">
            <h4 className="account-section-title"><Package size={16} /> MY ORDERS</h4>
            {orders && orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order, i) => (
                  <div key={i} className="order-item">
                    <img src={order.image} alt={order.name} />
                    <div className="order-info">
                      <p className="order-name">{order.name}</p>
                      <p className="order-meta">Size: UK {order.size} · Qty: {order.qty}</p>
                      <p className="order-price">₹ {(order.price * order.qty).toLocaleString('en-IN')}</p>
                    </div>
                    <span className="order-status">Placed</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="orders-empty">
                <Package size={36} />
                <p>No orders yet</p>
                <span>Your placed orders will appear here</span>
              </div>
            )}
          </div>

          {/* Logout */}
          <button className="account-logout-btn" onClick={() => { onLogout(); onClose(); }}>
            <LogOut size={16} /> LOGOUT
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountModal;
