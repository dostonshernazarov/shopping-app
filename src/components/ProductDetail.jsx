import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../utils/supabase'
import { useLanguage } from '../contexts/LanguageContext'
import { ArrowLeft, ShoppingCart, Check, Loader } from 'lucide-react'

function ProductDetail({ addToCart }) {
  const { t } = useLanguage()
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
        <p>{t('common.loading')}</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>{t('common.error')}</h2>
        <p>{error || t('common.error')}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          {t('common.home')}
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-back">
        <ArrowLeft size={20} />
        {t('product.back')}
      </button>

      <div className="product-detail">
        <div className="product-detail-images">
          <div className="product-detail-main-image">
            <img
              src={product.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={product.name}
            />
          </div>
          
          {product.additional_images && product.additional_images.length > 0 && (
            <div className="product-additional-images">
              {product.additional_images.map((imageUrl, index) => (
                <div key={index} className="product-additional-image">
                  <img
                    src={imageUrl}
                    alt={`${product.name} - Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
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
            <h2>{t('product.description')}</h2>
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
                {t('product.addedToCart')}
              </>
            ) : (
              <>
                <ShoppingCart size={24} />
                {t('product.addToCart')}
              </>
            )}
          </button>

          {!product.in_stock && (
            <p className="out-of-stock">{t('product.outOfStock')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

