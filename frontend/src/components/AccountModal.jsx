import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, LogOut, ArrowLeft, ChevronRight } from 'lucide-react';

const CANCEL_REASONS = [
  'Changed my mind',
  'Ordered by mistake',
  'Found a better price elsewhere',
  'Delivery time is too long',
  'Product no longer needed',
  'Other',
];

const TRACKING_STEPS = ['Order Placed', 'Shipped', 'In-Transit', 'Out For Delivery', 'Delivered'];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getEstDelivery = (dateStr) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const AccountModal = ({ user, onClose, onLogout, orders, onCancelOrder }) => {
  const [view, setView] = useState('main'); // main | detail | cancel | cancelled
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleCancelConfirm = () => {
    if (!cancelReason) { alert('Please select a reason'); return; }
    setShowConfirmPopup(true);
  };

  const handleContinueAfterCancel = () => {
    onCancelOrder(selectedOrder.orderId);
    setShowConfirmPopup(false);
    setView('main');
    setSelectedOrder(null);
    setCancelReason('');
    setRemarks('');
  };

  return (
    <div className="overlay-system">
      <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>

        <div className="overlay-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {view !== 'main' && (
              <button className="close-btn" onClick={() => setView(view === 'cancel' ? 'detail' : 'main')}>
                <ArrowLeft size={20} />
              </button>
            )}
            <h3>
              {view === 'main' && 'MY ACCOUNT'}
              {view === 'detail' && 'ORDER DETAILS'}
              {view === 'cancel' && 'CANCEL ORDER'}
            </h3>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="account-body">

          {/* ── MAIN VIEW ── */}
          {view === 'main' && (
            <>
              <div className="account-profile-card">
                <img src={user.picture} alt={user.name} className="account-avatar" />
                <div>
                  <p className="account-name">{user.name}</p>
                  <p className="account-email">{user.email}</p>
                </div>
              </div>

              <div className="account-section">
                <h4 className="account-section-title"><Package size={16} /> MY ORDERS</h4>
                {orders && orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map((order, i) => (
                      <div key={i} className="order-item" onClick={() => { setSelectedOrder(order); setView('detail'); }} style={{ cursor: 'pointer' }}>
                        <img src={order.image} alt={order.name} />
                        <div className="order-info">
                          <p className="order-name">{order.name}</p>
                          <p className="order-meta">Size: UK {order.size} · Qty: {order.qty}</p>
                          <p className="order-price">₹ {(order.price * order.qty).toLocaleString('en-IN')}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                          <span className={`order-status ${order.status === 'Cancelled' ? 'cancelled' : ''}`}>
                            {order.status || 'Placed'}
                          </span>
                          <ChevronRight size={16} color="#aaa" />
                        </div>
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

              <button className="account-logout-btn" onClick={() => { onLogout(); onClose(); }}>
                <LogOut size={16} /> LOGOUT
              </button>
            </>
          )}

          {/* ── ORDER DETAIL VIEW ── */}
          {view === 'detail' && selectedOrder && (
            <div className="order-detail-view">
              <div className="od-header">
                <div><span className="od-label">Order ID :</span> <span className="od-value">{selectedOrder.orderId}</span></div>
                <div><span className="od-label">Date :</span> <span className="od-value">{formatDate(selectedOrder.placedAt)}</span></div>
              </div>

              <div className="od-item">
                <img src={selectedOrder.image} alt={selectedOrder.name} />
                <div className="od-item-info">
                  <p className="od-item-name">{selectedOrder.name}</p>
                  <p className="od-item-meta">{selectedOrder.category}</p>
                  <p className="od-item-meta">Size: UK {selectedOrder.size} · Qty: {selectedOrder.qty}</p>
                  <p className="od-item-price">₹ {(selectedOrder.price * selectedOrder.qty).toLocaleString('en-IN')}</p>
                  {selectedOrder.status !== 'Cancelled' && (
                    <button className="od-cancel-btn" onClick={() => setView('cancel')}>Cancel</button>
                  )}
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.status !== 'Cancelled' ? (
                <div className="od-tracking">
                  {TRACKING_STEPS.map((step, i) => (
                    <div key={step} className="track-step">
                      <div className={`track-dot ${i === 0 ? 'active' : ''}`} />
                      {i < TRACKING_STEPS.length - 1 && <div className="track-line" />}
                      <div className="track-info">
                        <p className={`track-label ${i === 0 ? 'active' : ''}`}>{step}</p>
                        {i === 0 && <p className="track-date">{formatDate(selectedOrder.placedAt)}</p>}
                        {i === TRACKING_STEPS.length - 1 && <p className="track-date">Est. Delivery by {getEstDelivery(selectedOrder.placedAt)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="od-cancelled-badge">● Order Cancelled</div>
              )}
            </div>
          )}

          {/* ── CANCEL VIEW ── */}
          {view === 'cancel' && selectedOrder && (
            <div className="cancel-view">
              <div className="od-header">
                <div><span className="od-label">Order ID :</span> <span className="od-value">{selectedOrder.orderId}</span></div>
                <div><span className="od-label">Date :</span> <span className="od-value">{formatDate(selectedOrder.placedAt)}</span></div>
              </div>

              <div className="od-item">
                <img src={selectedOrder.image} alt={selectedOrder.name} />
                <div className="od-item-info">
                  <p className="od-item-name">{selectedOrder.name}</p>
                  <p className="od-item-meta">{selectedOrder.category}</p>
                  <p className="od-item-meta">Size: UK {selectedOrder.size} · Qty: {selectedOrder.qty}</p>
                  <p className="od-item-price">₹ {(selectedOrder.price * selectedOrder.qty).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="cancel-form">
                <h4>Reason for Cancellation</h4>
                <p>Please tell us the reason for cancellation as it will help us serve you better in the future.</p>
                <select value={cancelReason} onChange={e => setCancelReason(e.target.value)}>
                  <option value="">Select reason *</option>
                  {CANCEL_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <label>Additional Remarks</label>
                <textarea value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Optional..." rows={3} />
              </div>

              <div className="cancel-btns">
                <button className="btn-outline cancel-back-btn" onClick={() => setView('detail')}>BACK</button>
                <button className="btn-primary cancel-confirm-btn" onClick={handleCancelConfirm}>CONFIRM</button>
              </div>
            </div>
          )}

        </div>

        {/* Confirmation Popup */}
        <AnimatePresence>
          {showConfirmPopup && (
            <motion.div className="cancel-popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="cancel-popup" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <p>Your cancellation request has been received. You will also receive an email regarding the same with further instructions.</p>
                <hr />
                <button className="cancel-popup-btn" onClick={handleContinueAfterCancel}>Continue</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default AccountModal;
