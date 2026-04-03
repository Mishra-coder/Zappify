import React from 'react';
import { Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div 
      className="product-card"
      onClick={() => onClick(product)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        
        {product.isTrending && (
          <div className="badge-trending">
            <TrendingUp size={14} />
            <span>Trending</span>
          </div>
        )}
        
        <button className="wishlist-overlay" aria-label="Add to wishlist">
          <Heart size={20} />
        </button>
        
        <div className="quick-add">
          <button>QUICK ADD</button>
        </div>
      </div>
      
      <div className="card-info">
        <div className="brand">{product.brand}</div>
        <h3 className="name">{product.name}</h3>
        <p className="category">{product.category}</p>
        <div className="price">₹ {product.price}</div>
      </div>

      </motion.div>
  );
};

export default ProductCard;
