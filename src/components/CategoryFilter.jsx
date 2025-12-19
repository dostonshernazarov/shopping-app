import { Grid } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  const { t } = useLanguage()
  
  return (
    <div className="category-filter">
      <button
        className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        <Grid size={20} />
        {t('home.allProducts')}
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter

