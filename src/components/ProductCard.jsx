import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Check } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

function ProductCard({ product, onAddToCart }) {
  const { t } = useLanguage()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
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
            className={`btn btn-primary btn-icon ${added ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
            title={added ? t('product.addedToCart') : t('product.addToCart')}
            disabled={added}
          >
            {added ? (
              <>
                <Check size={18} />
                {t('product.added')}
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                {t('product.addToCart')}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

