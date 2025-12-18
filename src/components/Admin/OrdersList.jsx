import { useState } from 'react'
import { Phone, Calendar, CheckCircle, Clock } from 'lucide-react'
import { updateOrderStatus } from '../../utils/supabase'

function OrdersList({ orders, onUpdate }) {
  const [updating, setUpdating] = useState(null)

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      onUpdate() // Refresh orders list
    } catch (err) {
      alert('Failed to update order status: ' + err.message)
    } finally {
      setUpdating(null)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="admin-tab-content">
        <h2>Orders</h2>
        <p className="empty-message">No orders yet.</p>
      </div>
    )
  }

  return (
    <div className="admin-tab-content">
      <h2>Recent Orders</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">Order #{order.id}</div>
              <div className={`order-status status-${order.status}`}>
                {order.status === 'pending' ? (
                  <>
                    <Clock size={14} />
                    <span>Pending</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} />
                    <span>Done</span>
                  </>
                )}
              </div>
            </div>

            <div className="order-info">
              <div className="order-info-item">
                <Phone size={16} />
                <span>{order.phone_number}</span>
              </div>
              <div className="order-info-item">
                <Calendar size={16} />
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </div>
            </div>

            <div className="order-items">
              <h4>Items:</h4>
              {order.order_items && order.order_items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <span>{item.product_name} x {item.quantity}</span>
                  <span>${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <strong>Total: ${order.total_amount.toFixed(2)}</strong>
              </div>
              
              {order.status === 'pending' && (
                <button
                  onClick={() => handleStatusChange(order.id, 'done')}
                  className="btn btn-success btn-icon"
                  disabled={updating === order.id}
                >
                  <CheckCircle size={18} />
                  {updating === order.id ? 'Updating...' : 'Mark as Done'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersList

