import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import MenuDropdown from '@/components/blocks/menu-dropdown'
import type { NavigationSection } from '@/components/blocks/menu-navigation'
import MenuNavigation from '@/components/blocks/menu-navigation'
import ThemeToggle from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b bg-background transition-all duration-300',
        {
          'shadow-md': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <a href='/#home' className='flex items-center gap-3'>
          <img src='/logo.png' alt='YOKESH' className='h-10 w-auto' />
          <span className='font-semibold text-[20px] text-primary'>YOKESH</span>
        </a>

        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          className='max-lg:hidden [&_[data-slot="navigation-menu-list"]]:gap-1'
        />

        {/* Actions */}
        <div className='flex items-center'>
          <ThemeToggle />
          <Button
            className='group relative ml-4 w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[length:250%_250%,100%_100%] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 max-sm:hidden dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
            asChild
          >
            <a href='https://www.yokesh.in/yokesh-ai-engineer.pdf' target='_blank' rel='noopener noreferrer'>
              View Resume
            </a>
          </Button>

          {/* Mobile View Resume button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='ml-4 rounded-full sm:hidden' asChild>
                <a href='https://www.yokesh.in/yokesh-ai-engineer.pdf' target='_blank' rel='noopener noreferrer'>
                  View Resume
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Resume</TooltipContent>
          </Tooltip>

          {/* Mobile menu button */}
          <MenuDropdown
            align='end'
            navigationData={navigationData}
            trigger={
              <Button variant='outline' size='icon' className='ml-3 rounded-full lg:hidden'>
                <MenuIcon />
                <span className='sr-only'>Menu</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
