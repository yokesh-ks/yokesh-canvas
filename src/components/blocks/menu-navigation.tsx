import type { ReactNode } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'

// Inline scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)

  if (element) {
    const headerHeight = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

export type NavigationItem = {
  title: string
  href: string
}

export type NavigationSection = {
  title: string
  icon?: ReactNode
} & (
  | {
      items: NavigationItem[]
      href?: never
    }
  | {
      items?: never
      href: string
    }
)

type MenuNavigationProps = {
  navigationData: NavigationSection[]
  activeSection?: string
  className?: string
}

const MenuNavigation = ({ navigationData, activeSection, className }: MenuNavigationProps) => {
  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className='flex-wrap justify-start gap-0'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            const isAnchor = navItem.href.startsWith('#')
            const sectionId = navItem.href.replace('#', '')
            const isActive = isAnchor && activeSection === sectionId && activeSection !== ''

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  onClick={
                    isAnchor
                      ? e => {
                          e.preventDefault()
                          scrollToSection(sectionId)
                        }
                      : undefined
                  }
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'rounded-full bg-transparent px-3 py-1.5 font-normal text-base! transition-colors duration-200',
                    'hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10',
                    'focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/10',
                    isActive ? 'bg-primary/5 text-primary dark:bg-primary/10' : 'text-muted-foreground'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='bg-transparent px-3 py-1.5 text-base text-muted-foreground hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary data-[state=open]:bg-primary/5 data-[state=open]:text-primary data-[state=open]:hover:bg-primary/5 dark:data-[state=open]:bg-primary/10 dark:focus:bg-primary/10 dark:hover:bg-primary/10 dark:data-[state=open]:hover:bg-primary/10 [&>svg]:size-4'>
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                <ul className='grid w-38 gap-4'>
                  <li>
                    {navItem.items?.map(item => (
                      <NavigationMenuLink key={item.title} href={item.href}>
                        {item.title}
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuNavigation
