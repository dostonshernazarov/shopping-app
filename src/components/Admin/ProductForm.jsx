import { useState } from 'react'
import { addProduct, deleteProduct } from '../../utils/supabase'
import { useLanguage } from '../../contexts/LanguageContext'
import { Trash2, Plus, X } from 'lucide-react'

function ProductForm({ categories, onSuccess, onCancel }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brief_description: '',
    full_description: '',
    image_url: '',
    additional_images: [],
    category_id: '',
    in_stock: true
  })
  const [additionalImageUrl, setAdditionalImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addAdditionalImage = () => {
    if (additionalImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        additional_images: [...prev.additional_images, additionalImageUrl.trim()]
      }))
      setAdditionalImageUrl('')
    }
  }

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id) || null
      }
      
      await addProduct(productData)
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category_id">Category</label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="brief_description">Brief Description</label>
        <input
          type="text"
          id="brief_description"
          name="brief_description"
          value={formData.brief_description}
          onChange={handleChange}
          className="form-control"
          placeholder="Short description for product cards"
        />
      </div>

      <div className="form-group">
        <label htmlFor="full_description">Full Description</label>
        <textarea
          id="full_description"
          name="full_description"
          value={formData.full_description}
          onChange={handleChange}
          className="form-control"
          rows="4"
          placeholder="Detailed product description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image_url">{t('admin.imageUrl')} *</label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="form-control"
          placeholder={t('admin.imageUrl')}
          required
        />
        <small className="form-hint">
          {t('admin.imageHint')}
        </small>
      </div>

      <div className="form-group">
        <label>{t('admin.additionalImages')}</label>
        <div className="additional-images-input">
          <input
            type="url"
            value={additionalImageUrl}
            onChange={(e) => setAdditionalImageUrl(e.target.value)}
            className="form-control"
            placeholder={t('admin.imageUrl')}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addAdditionalImage()
              }
            }}
          />
          <button
            type="button"
            onClick={addAdditionalImage}
            className="btn btn-primary btn-icon"
            title={t('admin.addImage')}
          >
            <Plus size={18} />
            {t('admin.add')}
          </button>
        </div>
        <small className="form-hint">
          {t('admin.additionalImagesHint')}
        </small>
        
        {formData.additional_images.length > 0 && (
          <div className="additional-images-list">
            {formData.additional_images.map((url, index) => (
              <div key={index} className="additional-image-item">
                <img src={url} alt={`${t('admin.additionalImages')} ${index + 1}`} className="preview-image" />
                <span className="image-url">{url}</span>
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="btn btn-danger btn-icon-small"
                  title={t('admin.removeImage')}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="in_stock"
            checked={formData.in_stock}
            onChange={handleChange}
          />
          <span>In Stock</span>
        </label>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </form>
  )
}

// Product List Component
ProductForm.List = function ProductList({ products, categories, onUpdate }) {
  const [deleting, setDeleting] = useState(null)

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    setDeleting(id)
    try {
      await deleteProduct(id)
      onUpdate()
    } catch (err) {
      alert('Failed to delete product: ' + err.message)
    } finally {
      setDeleting(null)
    }
  }

  if (products.length === 0) {
    return <p className="empty-message">No products yet. Add your first product!</p>
  }

  return (
    <div className="admin-list">
      {products.map(product => (
        <div key={product.id} className="admin-list-item">
          <img
            src={product.image_url || 'https://via.placeholder.com/80'}
            alt={product.name}
            className="admin-list-image"
          />
          <div className="admin-list-info">
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            {product.categories && (
              <span className="badge">{product.categories.name}</span>
            )}
          </div>
          <button
            onClick={() => handleDelete(product.id)}
            className="btn btn-danger btn-icon-small"
            disabled={deleting === product.id}
            title="Delete product"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductForm

