import { useState } from 'react'
import { addCategory, deleteCategory } from '../../utils/supabase'
import { Trash2 } from 'lucide-react'

function CategoryForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await addCategory(formData)
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label htmlFor="name">Category Name *</label>
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
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          rows="3"
          placeholder="Optional description"
        />
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
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </div>
    </form>
  )
}

// Category List Component
CategoryForm.List = function CategoryList({ categories, onUpdate }) {
  const [deleting, setDeleting] = useState(null)

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? Products in this category will be uncategorized.')) {
      return
    }

    setDeleting(id)
    try {
      await deleteCategory(id)
      onUpdate()
    } catch (err) {
      alert('Failed to delete category: ' + err.message)
    } finally {
      setDeleting(null)
    }
  }

  if (categories.length === 0) {
    return <p className="empty-message">No categories yet. Add your first category!</p>
  }

  return (
    <div className="admin-list">
      {categories.map(category => (
        <div key={category.id} className="admin-list-item">
          <div className="admin-list-info">
            <h3>{category.name}</h3>
            {category.description && <p>{category.description}</p>}
          </div>
          <button
            onClick={() => handleDelete(category.id)}
            className="btn btn-danger btn-icon-small"
            disabled={deleting === category.id}
            title="Delete category"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CategoryForm

