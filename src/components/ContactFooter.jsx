import { Instagram, Phone, Send } from 'lucide-react'
import { isTelegramApp } from '../utils/telegram'

function ContactFooter() {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE

  // Only show in Telegram Mini App
  if (!isTelegramApp()) {
    return null
  }

  return (
    <footer className="contact-footer">
      <div className="container">
        <div className="contact-footer-content">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
          )}

          {telegramUrl && (
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Send size={20} />
              <span>Telegram</span>
            </a>
          )}

          {contactPhone && (
            <a
              href={`tel:${contactPhone.replace(/\s/g, '')}`}
              className="contact-link"
            >
              <Phone size={20} />
              <span>{contactPhone}</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

export default ContactFooter

