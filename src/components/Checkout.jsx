import { useState } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { createOrder } from '../utils/supabase'
import { sendOrderNotification } from '../utils/telegram'

function Checkout({ cart, total, onBack, onSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const orderData = {
        phone_number: phoneNumber,
        total_amount: total,
        items: cart
      }

      const order = await createOrder(orderData)
      
      // Try to send Telegram notification (optional)
      try {
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
        const adminChatId = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID
        
        if (botToken && adminChatId) {
          await sendOrderNotification(
            { ...order, items: cart },
            botToken,
            adminChatId
          )
        }
      } catch (notifError) {
        console.log('Telegram notification failed:', notifError)
        // Don't fail the order if notification fails
      }
      
      setSuccess(true)
      
      // Clear cart after successful order
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } catch (err) {
      setError('Failed to place order. Please try again.')
      console.error('Order error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container">
        <div className="checkout-success">
          <CheckCircle size={64} className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your order. We will contact you at {phoneNumber} shortly.</p>
          <p className="success-note">
            Our admin team has been notified and will process your order soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <button onClick={onBack} className="btn btn-secondary btn-back">
        <ArrowLeft size={20} />
        Back to Cart
      </button>

      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <span className="order-item-name">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Contact Information</h2>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="form-control"
                required
              />
              <small className="form-hint">
                We'll contact you at this number to confirm your order
              </small>
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout

