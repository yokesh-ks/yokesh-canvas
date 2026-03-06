import { MoonStarIcon, SunIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'

function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')

      if (stored === 'light' || stored === 'dark') {
        return stored
      }

      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }

    return 'light'
  })

  React.useEffect(() => {
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark')

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return (
    <Button
      variant='outline'
      size='icon'
      className='relative rounded-full'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <MoonStarIcon className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <SunIcon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
