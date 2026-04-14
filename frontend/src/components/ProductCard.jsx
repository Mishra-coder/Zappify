import { Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick, onToggleWishlist, isWishlisted }) => {
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

        <button
          className={`wishlist-overlay ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label="Toggle wishlist"
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <div className="quick-add">
          <button onClick={(e) => { e.stopPropagation(); onClick(product); }}>QUICK ADD</button>
        </div>
      </div>

      <div className="card-info">
        <div className="brand">{product.brand}</div>
        <h3 className="name">{product.name}</h3>
        <p className="category">{product.category}</p>
        <div className="price">₹ {product.price.toLocaleString('en-IN')}</div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
