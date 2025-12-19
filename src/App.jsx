import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShoppingCart, Store, ShieldCheck } from 'lucide-react'
import HomePage from './components/HomePage'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import AdminLogin from './components/Admin/AdminLogin'
import AdminPanel from './components/Admin/AdminPanel'
import ContactFooter from './components/ContactFooter'
import ToastContainer from './components/ToastContainer'
import LanguageSelector from './components/LanguageSelector'
import { useLanguage } from './contexts/LanguageContext'
import { initTelegramApp, isTelegramApp } from './utils/telegram'

function App() {
  const { t } = useLanguage()
  const [cart, setCart] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTelegram, setIsTelegram] = useState(false)
  const [toasts, setToasts] = useState([])

  // Toast notification helper
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Initialize Telegram Mini App
  useEffect(() => {
    const tg = initTelegramApp()
    if (tg) {
      setIsTelegram(true)
      console.log('Telegram Mini App initialized')
      
      // Add telegram class to body for specific styling
      document.body.classList.add('telegram-app')
    }
  }, [])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        showToast(`${product.name} ${t('product.quantityUpdated')}`, 'success')
        return updatedCart
      }
      showToast(`${product.name} ${t('product.addedToCart')}`, 'success')
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <Link to="/" className="logo">
              <Store size={32} />
              <span>{t('app.name')}</span>
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                {t('common.home')}
              </Link>
              <Link to="/cart" className="nav-link cart-link">
                <ShoppingCart size={20} />
                <span>{t('common.cart')}</span>
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </Link>
              <Link to="/admin" className="nav-link admin-link">
                <ShieldCheck size={20} />
                <span>{t('common.admin')}</span>
              </Link>
              <LanguageSelector />
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route
              path="/product/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminPanel onLogout={() => setIsAdmin(false)} />
                ) : (
                  <AdminLogin onLogin={() => setIsAdmin(true)} />
                )
              }
            />
          </Routes>
        </main>

        {!isTelegram && (
          <footer className="footer">
            <div className="container">
              <p>{t('footer.copyright')}</p>
            </div>
          </footer>
        )}
        
        <ContactFooter />
        
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    </Router>
  )
}

export default App

