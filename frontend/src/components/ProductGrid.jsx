import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="main-content">
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
          <p>Try adjusting your categories.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
