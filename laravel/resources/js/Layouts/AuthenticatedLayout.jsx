import ApplicationIcon from '@/Components/ApplicationIcon';
import { Link } from '@inertiajs/react';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Authenticated({ user, header, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const navElement = document.getElementById('main-nav');
    if (navElement) {
      setNavHeight(navElement.offsetHeight);
    }
  }, []);

  const menuItems = [
    { name: '今月の収支まとめ', href: route('dashboard') },
    { name: '収支一覧', href: route('transactions.index') },
    { name: 'カテゴリ一覧', href: route('categories.index') },
    { name: 'プロフィール', href: route('profile.edit') },
    { name: '使い方・ウェルカムページ', href: route('welcome') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">
              <ApplicationIcon className="h-11 w-auto" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={route().current('dashboard')}>
            <Link href={route('dashboard')} color="foreground">
              ダッシュボード
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user.name}
                size="sm"
                src={user.picture_url}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                <p className="font-semibold">{user.name}</p>
                <p className="font-semibold">でログイン中</p>
              </DropdownItem>
              {menuItems.map((item, index) => (
                <DropdownItem
                  key={`${item.name}-${index}`}
                  color={
                    route().current() === item.href ? 'primary' : 'foreground'
                  }
                  href={item.href}
                >
                  {item.name}
                </DropdownItem>
              ))}
              <DropdownItem size="small" className="text-red-500">
                <Link href={route('logout')} method="post">
                  ログアウト
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div style={{ paddingTop: `${navHeight}px` }}>
        {header && (
          <header className="bg-white shadow sticky top-0 z-40">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  );
}
