import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Share2, ShieldCheck, X } from 'lucide-react';

const SIZE_CHART = [
  { uk: '6', us: '7', eu: '39', cm: '24.5' },
  { uk: '7', us: '8', eu: '40', cm: '25.5' },
  { uk: '8', us: '9', eu: '41', cm: '26' },
  { uk: '9', us: '10', eu: '42', cm: '27' },
  { uk: '10', us: '11', eu: '43', cm: '27.5' },
  { uk: '11', us: '12', eu: '44', cm: '28.5' },
];

const ProductDetail = ({ product, onBack, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const sizes = ['7', '8', '9', '10', '11'];

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size first'); return; }
    onAddToCart(product, selectedSize);
    alert(`${product.name} (UK ${selectedSize}) added to cart!`);
  };

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} /> BACK TO STORE
      </button>

      <div className="detail-grid">
        <div className="image-display">
          <motion.img
            src={product.image}
            alt={product.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="info-display">
          <span className="brand-tag">{product.brand}</span>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-cat">{product.category}</p>
          <div className="price-tag">₹ {product.price.toLocaleString('en-IN')}</div>

          <div className="description-box">
            <p>{product.description}</p>
          </div>

          <div className="size-selection">
            <div className="section-head">
              <h3>SELECT SIZE (UK)</h3>
              <span className="size-chart-link" onClick={() => setShowSizeChart(true)}>SIZE CHART</span>
            </div>
            <div className="sizes-grid">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn btn-primary" onClick={handleAddToCart}>
              <ShoppingBag size={20} /> ADD TO CART
            </button>
            <button
              className={`wishlist-btn-large ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={() => onToggleWishlist(product)}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
            </button>
          </div>

          <div className="trust-badges">
            <div className="badge-item"><ShieldCheck size={18} /> 100% Authentic Products</div>
            <div className="badge-item"><Share2 size={18} /> Easy 30-Day Returns</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSizeChart && (
          <div className="size-chart-overlay" onClick={() => setShowSizeChart(false)}>
            <motion.div
              className="size-chart-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="size-chart-header">
                <h3>UK SIZE CHART</h3>
                <button onClick={() => setShowSizeChart(false)}><X size={20} /></button>
              </div>
              <table className="size-table">
                <thead>
                  <tr><th>UK</th><th>US</th><th>EU</th><th>CM</th></tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map(row => (
                    <tr key={row.uk} className={selectedSize === row.uk ? 'highlighted' : ''}>
                      <td>{row.uk}</td><td>{row.us}</td><td>{row.eu}</td><td>{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
