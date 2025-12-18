import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShoppingCart, Store, ShieldCheck } from 'lucide-react'
import HomePage from './components/HomePage'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import AdminLogin from './components/Admin/AdminLogin'
import AdminPanel from './components/Admin/AdminPanel'
import { initTelegramApp, isTelegramApp } from './utils/telegram'

function App() {
  const [cart, setCart] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTelegram, setIsTelegram] = useState(false)

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
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
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
              <span>FoodMarket</span>
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/cart" className="nav-link cart-link">
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </Link>
              <Link to="/admin" className="nav-link admin-link">
                <ShieldCheck size={20} />
                <span>Admin</span>
              </Link>
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

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 FoodMarket. Fresh products delivered to your door.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

