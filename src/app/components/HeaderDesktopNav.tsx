'use client';

import SafeLink from './SafeLink';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { EXPLORE_ITEMS, SUPPORT_ITEMS, type HeaderNavItem } from './headerNavData';

const linkClass =
  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-bg-light hover:text-brand-red-600 focus:bg-neutral-bg-light focus:text-brand-red-600 [&_svg]:transition-colors [&_svg]:hover:text-brand-red-600';

function NavItemContent({ item }: { item: HeaderNavItem }) {
  return (
    <>
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        <item.icon className="h-4 w-4 text-brand-red-600" />
        {item.name}
      </div>
      <p className="line-clamp-2 text-xs leading-snug text-neutral-gray-dark mt-1">
        {item.description}
      </p>
    </>
  );
}

export function HeaderDesktopNav() {
  return (
    <div className="hidden lg:flex items-center gap-2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <SafeLink href="/" className={navigationMenuTriggerStyle()}>
                Home
              </SafeLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <SafeLink href="/about" className={navigationMenuTriggerStyle()}>
                About
              </SafeLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[420px] p-4 md:w-[540px] lg:w-[640px]">
                <ul className="grid gap-1 sm:grid-cols-2">
                  {EXPLORE_ITEMS.map((item) => (
                    <li key={item.id}>
                      <NavigationMenuLink asChild>
                        <SafeLink href={item.path} className={linkClass}>
                          <NavItemContent item={item} />
                        </SafeLink>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <SafeLink href="/impact" className={navigationMenuTriggerStyle()}>
                Impact
              </SafeLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Support</NavigationMenuTrigger>
            <NavigationMenuContent className="left-auto right-0">
              <ul className="grid w-[350px] gap-1 p-4">
                {SUPPORT_ITEMS.map((item) => (
                  <li key={item.id}>
                    <NavigationMenuLink asChild>
                      <SafeLink href={item.path} className={linkClass}>
                        <NavItemContent item={item} />
                      </SafeLink>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <SafeLink href="/contact" className={navigationMenuTriggerStyle()}>
                Contact
              </SafeLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
