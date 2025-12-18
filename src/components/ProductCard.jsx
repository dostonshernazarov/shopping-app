import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault()
    onAddToCart(product)
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img
          src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={product.name}
          loading="lazy"
        />
        {product.categories && (
          <span className="product-category-badge">
            {product.categories.name}
          </span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brief">{product.brief_description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="btn btn-primary btn-icon"
            onClick={handleAddToCart}
            title="Add to cart"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

