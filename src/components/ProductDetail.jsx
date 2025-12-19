import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../utils/supabase'
import { ArrowLeft, ShoppingCart, Check, Loader } from 'lucide-react'

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={48} />
        <p>Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-back">
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={product.name}
          />
        </div>

        <div className="product-detail-info">
          {product.categories && (
            <span className="product-category-badge large">
              {product.categories.name}
            </span>
          )}
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="product-detail-description">
            <h2>Description</h2>
            <p>{product.full_description || product.brief_description}</p>
          </div>

          <button
            className={`btn btn-primary btn-large btn-icon ${added ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? (
              <>
                <Check size={24} />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={24} />
                Add to Cart
              </>
            )}
          </button>

          {!product.in_stock && (
            <p className="out-of-stock">Currently out of stock</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

