import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, MapPin, CreditCard, ShoppingBag, Check } from 'lucide-react';

const STEPS = ['MY BAG', 'ADDRESS', 'PAYMENT'];

const Checkout = ({ cartItems, onClose, onRemoveFromCart, onOrderPlaced }) => {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({ name: '', phone: '', pincode: '', city: '', state: '', street: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = Math.round(cartTotal * 0.05);
  const shipping = cartTotal > 999 ? 0 : 99;

  const handlePlaceOrder = () => {
    if (onOrderPlaced) onOrderPlaced(cartItems);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-overlay">
        <div className="checkout-modal">
          <motion.div
            className="order-success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="success-icon"><Check size={40} /></div>
            <h2>Order Placed!</h2>
            <p>Your order has been placed successfully. You'll receive a confirmation soon.</p>
            <button className="btn-primary" onClick={onClose}>CONTINUE SHOPPING</button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay">
      <motion.div
        className="checkout-modal"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        {/* Header */}
        <div className="checkout-header">
          <h2>CHECKOUT</h2>
          <button className="close-btn" onClick={onClose}><X size={22} /></button>
        </div>

        {/* Steps */}
        <div className="checkout-steps">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="step-circle">{i < step ? <Check size={14} /> : i + 1}</div>
                <span>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="checkout-body">
          <AnimatePresence mode="wait">

            {/* STEP 1: MY BAG */}
            {step === 0 && (
              <motion.div key="bag" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="co-items">
                  {cartItems.map((item, i) => (
                    <div key={i} className="co-item">
                      <img src={item.image} alt={item.name} />
                      <div className="co-item-info">
                        <p className="co-item-name">{item.name}</p>
                        <p className="co-item-meta">{item.category}</p>
                        <div className="co-item-tags">
                          <span>Size: UK {item.size}</span>
                          <span>Qty: {item.qty}</span>
                        </div>
                      </div>
                      <div className="co-item-price">
                        <p>₹ {(item.price * item.qty).toLocaleString('en-IN')}</p>
                        <span>MRP incl. of all taxes</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="co-billing">
                  <h4>BILLING DETAILS</h4>
                  <div className="billing-row"><span>Cart Total <small>(Incl. of all taxes)</small></span><span>₹ {cartTotal.toLocaleString('en-IN')}</span></div>
                  <div className="billing-row"><span>Shipping Charges</span><span className="free-ship">{shipping === 0 ? 'FREE' : `₹ ${shipping}`}</span></div>
                  <div className="billing-row total-row"><span>Total Amount <small>(Incl. of ₹{gst} GST)</small></span><span>₹ {(cartTotal + shipping).toLocaleString('en-IN')}</span></div>
                </div>
                <button className="btn-primary co-next-btn" onClick={() => setStep(1)}>
                  PROCEED TO ADDRESS <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {/* STEP 2: ADDRESS */}
            {step === 1 && (
              <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="co-address-form">
                  <h4><MapPin size={16} /> DELIVERY ADDRESS</h4>
                  <div className="form-row-2">
                    <input placeholder="Full Name *" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                    <input placeholder="Phone Number *" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                  </div>
                  <input placeholder="Street Address *" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                  <div className="form-row-3">
                    <input placeholder="Pincode *" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                    <input placeholder="City *" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                    <input placeholder="State *" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                  </div>
                </div>
                <div className="co-btn-row">
                  <button className="btn-outline co-back-btn" onClick={() => setStep(0)}>BACK</button>
                  <button
                    className="btn-primary co-next-btn"
                    onClick={() => {
                      if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
                        alert('Please fill all required fields');
                        return;
                      }
                      setStep(2);
                    }}
                  >
                    PROCEED TO PAYMENT <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="co-payment">
                  <h4><CreditCard size={16} /> PAYMENT METHOD</h4>
                  <div className="payment-options">
                    {[
                      { id: 'cod', label: 'Cash on Delivery' },
                      { id: 'upi', label: 'UPI / GPay / PhonePe' },
                      { id: 'card', label: 'Credit / Debit Card' },
                    ].map(opt => (
                      <label key={opt.id} className={`payment-option ${paymentMethod === opt.id ? 'selected' : ''}`}>
                        <input type="radio" name="payment" value={opt.id} checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="co-billing">
                    <h4>ORDER SUMMARY</h4>
                    <div className="billing-row"><span>Cart Total</span><span>₹ {cartTotal.toLocaleString('en-IN')}</span></div>
                    <div className="billing-row"><span>Shipping</span><span className="free-ship">{shipping === 0 ? 'FREE' : `₹ ${shipping}`}</span></div>
                    <div className="billing-row total-row"><span>Total Amount</span><span>₹ {(cartTotal + shipping).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
                <div className="co-btn-row">
                  <button className="btn-outline co-back-btn" onClick={() => setStep(1)}>BACK</button>
                  <button className="btn-primary co-next-btn place-order-btn" onClick={handlePlaceOrder}>
                    PLACE ORDER
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
