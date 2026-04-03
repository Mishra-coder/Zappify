import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Share2, ShieldCheck } from 'lucide-react';

const ProductDetail = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ['7', '8', '9', '10', '11'];

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
          
          <div className="price-tag">₹ {product.price}</div>
          
          <div className="description-box">
             <p>{product.description}</p>
          </div>

          <div className="size-selection">
            <div className="section-head">
              <h3>SELECT SIZE (UK)</h3>
              <span>SIZE CHART</span>
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
            <button className="add-to-cart-btn btn-primary" onClick={() => alert('Added to cart!')}>
              <ShoppingBag size={20} /> ADD TO CART
            </button>
            <button className="wishlist-btn-large">
              <Heart size={20} /> WISHLIST
            </button>
          </div>

          <div className="trust-badges">
            <div className="badge-item"><ShieldCheck size={18} /> 100% Authentic Products</div>
            <div className="badge-item"><Share2 size={18} /> Easy 30-Day Returns</div>
          </div>
        </div>
      </div>

      </div>
  );
};

export default ProductDetail;
