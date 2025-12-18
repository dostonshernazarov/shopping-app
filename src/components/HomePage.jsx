import { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../utils/supabase'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import { Loader } from 'lucide-react'

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [selectedCategory])

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async () => {
    try {
      const data = await getProducts(selectedCategory)
      setProducts(data)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={48} />
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={loadData} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>Fresh Food Delivered to Your Door</h1>
        <p>Shop from our selection of premium quality food products</p>
      </section>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage

