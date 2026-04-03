import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick, sortOption, onSortChange, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="main-content">
      <div className="content-header">
        <div></div>
        <div className="sort-dropdown">
          <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
            <option value="recommended">Select Sorting Options</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={isWishlisted(product.id)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <h3>No products found match the selected filters.</h3>
          <p>Try adjusting your categories or themes.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
