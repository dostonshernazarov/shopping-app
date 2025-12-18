import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple password check (for MVP - in production, use Supabase Auth)
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      onLogin()
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="container">
      <div className="admin-login">
        <div className="admin-login-card">
          <ShieldCheck size={48} className="admin-icon" />
          <h1>Admin Login</h1>
          <p>Enter your password to access the admin panel</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Enter admin password"
                className="form-control"
                autoFocus
              />
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-large">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

