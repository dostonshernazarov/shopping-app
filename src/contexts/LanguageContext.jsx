import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to Uzbek Latin
    const saved = localStorage.getItem('app_language')
    return saved || 'uz-lat'
  })

  const [translations, setTranslations] = useState({})

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.json`)
        setTranslations(translationModule.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // Fallback to Uzbek Latin if translation fails
        if (language !== 'uz-lat') {
          const fallback = await import('../translations/uz-lat.json')
          setTranslations(fallback.default)
        }
      }
    }

    loadTranslations()
  }, [language])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('app_language', lang)
  }

  const t = (key, params = {}) => {
    const keys = key.split('.')
    let value = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    // Replace placeholders like {phone} with actual values
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match
      })
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

