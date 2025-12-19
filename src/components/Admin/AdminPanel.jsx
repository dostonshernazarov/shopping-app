import { useState, useEffect } from 'react'
import { getProducts, getCategories, getOrders } from '../../utils/supabase'
import ProductForm from './ProductForm'
import CategoryForm from './CategoryForm'
import OrdersList from './OrdersList'
import { useLanguage } from '../../contexts/LanguageContext'
import { Package, FolderTree, ShoppingBag, LogOut, Plus } from 'lucide-react'

function AdminPanel({ onLogout }) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [productsData, categoriesData, ordersData] = await Promise.all([
        getProducts(),
        getCategories(),
        getOrders()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
      setOrders(ordersData)
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="admin-panel">
        <div className="admin-header">
          <h1>{t('admin.panel')}</h1>
          <button onClick={onLogout} className="btn btn-secondary btn-icon">
            <LogOut size={18} />
            {t('admin.logout')}
          </button>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} />
            {t('admin.products')} ({products.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <FolderTree size={20} />
            {t('admin.categories')} ({categories.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} />
            {t('admin.orders')} ({orders.length})
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              categories={categories}
              onUpdate={loadData}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              onUpdate={loadData}
            />
          )}
          {activeTab === 'orders' && (
            <OrdersList orders={orders} onUpdate={loadData} />
          )}
        </div>
      </div>
    </div>
  )
}

function ProductsTab({ products, categories, onUpdate }) {
  const { t } = useLanguage()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="admin-tab-content">
      <div className="admin-tab-header">
        <h2>{t('admin.manageProducts')}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary btn-icon"
        >
          <Plus size={18} />
          {showForm ? t('admin.cancel') : t('admin.addProduct')}
        </button>
      </div>

      {showForm && (
        <ProductForm
          categories={categories}
          onSuccess={() => {
            setShowForm(false)
            onUpdate()
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ProductForm.List
        products={products}
        categories={categories}
        onUpdate={onUpdate}
      />
    </div>
  )
}

function CategoriesTab({ categories, onUpdate }) {
  const { t } = useLanguage()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="admin-tab-content">
      <div className="admin-tab-header">
        <h2>{t('admin.manageCategories')}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary btn-icon"
        >
          <Plus size={18} />
          {showForm ? t('admin.cancel') : t('admin.addCategory')}
        </button>
      </div>

      {showForm && (
        <CategoryForm
          onSuccess={() => {
            setShowForm(false)
            onUpdate()
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <CategoryForm.List
        categories={categories}
        onUpdate={onUpdate}
      />
    </div>
  )
}

export default AdminPanel

