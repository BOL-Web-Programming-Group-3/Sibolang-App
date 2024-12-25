import React from 'react';
import { Button } from '@/Components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/Components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, MenuIcon, Mountain } from 'lucide-react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/react';

const Header = () => {
  const { url } = usePage();

  const links = [
    {
      href: '/admin/cultures',
      label: 'Culture',
      isActive: url?.includes('cultures'),
    },
    {
      href: '/admin/forums',
      label: 'Forum',
      isActive: url?.includes('forums'),
    },
    { href: '/admin/users', label: 'Users', isActive: url?.includes('users') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/admin/cultures" className="flex items-center gap-2">
          <Mountain className="h-6 w-6" />
          <span className="text-md font-medium">SiBolang</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {/* Map over the links for desktop navigation */}
          {links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-md ${link.isActive ? 'text-gray-900 dark:text-gray-50' : ''}`} // Apply active style
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Administrator</AvatarFallback>
                </Avatar>
                <p className="text-md font-medium">Administrator</p>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                {/* Map over the links for mobile navigation */}
                {links.map((link) => {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${link.isActive ? 'text-gray-900 dark:text-gray-50' : ''}`} // Apply active style
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
