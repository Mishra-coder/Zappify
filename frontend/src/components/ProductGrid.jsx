import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick }) => {
  return (
    <div className="main-content">
      <div className="content-header">
        <div className="breadcrumb">
          Home / Men Footwear
          <span className="count"> - {products.length} items</span>
        </div>
        
        <div className="sort-dropdown">
          <select defaultValue="recommended">
            <option value="recommended">Select Sorting Options</option>
            <option value="popular">Price: Low to High</option>
            <option value="newest">Price: High to Low</option>
            <option value="rating">New Arrivals</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onProductClick} />
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
