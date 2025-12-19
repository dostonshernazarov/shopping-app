import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import Checkout from './Checkout'

function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  const { t } = useLanguage()
  const [showCheckout, setShowCheckout] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (showCheckout) {
    return (
      <Checkout
        cart={cart}
        total={total}
        onBack={() => setShowCheckout(false)}
        onSuccess={clearCart}
      />
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <ShoppingBag size={64} />
          <h2>{t('cart.empty')}</h2>
          <p>{t('cart.emptyMessage')}</p>
          <a href="/" className="btn btn-primary">
            {t('cart.continueShopping')}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="cart-container">
        <h1>{t('cart.title')}</h1>
        
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image_url || 'https://via.placeholder.com/100'}
                alt={item.name}
                className="cart-item-image"
              />
              
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="btn btn-icon-small"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="btn btn-icon-small"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger btn-icon-small"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <span>{t('cart.total')}:</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="btn btn-primary btn-large"
          >
            {t('cart.checkout')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

