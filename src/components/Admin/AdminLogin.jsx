import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

function AdminLogin({ onLogin }) {
  const { t } = useLanguage()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple password check (for MVP - in production, use Supabase Auth)
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      onLogin()
    } else {
      setError(t('admin.invalidPassword'))
    }
  }

  return (
    <div className="container">
      <div className="admin-login">
        <div className="admin-login-card">
          <ShieldCheck size={48} className="admin-icon" />
          <h1>{t('admin.login')}</h1>
          <p>{t('admin.loginPrompt')}</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">{t('admin.password')}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder={t('admin.passwordPlaceholder')}
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
              {t('admin.login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

