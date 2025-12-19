import { Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const languages = [
  { code: 'uz-lat', name: 'Oʻzbek (Lotin)', flag: '🇺🇿' },
  { code: 'uz-cyr', name: 'Ўзбек (Кирилл)', flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
]

function LanguageSelector() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div className="language-selector">
      <Globe size={18} />
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector

