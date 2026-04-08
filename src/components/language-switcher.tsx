import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="relative flex items-center gap-1">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="bg-transparent text-sm text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none appearance-none pr-4"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-card text-foreground">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
