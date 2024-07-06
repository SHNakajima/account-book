import ApplicationIcon from '@/Components/ApplicationIcon';
import {
  ArrowRightEndOnRectangleIcon,
  BanknotesIcon,
  ChartPieIcon,
  RocketLaunchIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  cn,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Authenticated({ user, header, pageTitle, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    console.log(route().current());
    console.log(route('categories.index'));

    const navElement = document.getElementById('main-nav');
    if (navElement) {
      setNavHeight(navElement.offsetHeight);
    }
  }, []);

  const iconClasses =
    'h-5 w-5 text-default-500 pointer-events-none flex-shrink-0';

  const menuItems = [
    {
      name: '収支一覧',
      routeName: 'transactions.index',
      iconDom: <BanknotesIcon className={iconClasses} />,
    },
    {
      name: '収支サマリー',
      routeName: 'dashboard',
      iconDom: <ChartPieIcon className={iconClasses} />,
    },
    {
      name: 'カテゴリ一覧',
      routeName: 'categories.index',
      iconDom: <TagIcon className={iconClasses} />,
    },
    {
      name: 'プロフィール',
      routeName: 'profile.edit',
      iconDom: <UserCircleIcon className={iconClasses} />,
    },
    {
      name: '使い方・ウェルカムページ',
      routeName: 'welcome',
      iconDom: <RocketLaunchIcon className={iconClasses} />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Head title={pageTitle} />
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

        <NavbarContent justify="center">
          <NavbarItem className="font-semibold text-xl text-gray-800 leading-tight">
            {pageTitle}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={user.name}
                size="sm"
                src={user.picture_url}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              disabledKeys={[route().current()]}
            >
              <DropdownItem key="profile">
                <p className="font-semibold">{user.name} でログイン中</p>
              </DropdownItem>

              <DropdownSection showDivider>
                {menuItems.map(item => (
                  <DropdownItem
                    key={item.routeName}
                    href={route(item.routeName)}
                    startContent={item.iconDom}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownSection>
              <DropdownItem
                size="small"
                className="text-red-500"
                startContent={
                  <ArrowRightEndOnRectangleIcon
                    className={cn(iconClasses, 'text-red-500')}
                  />
                }
              >
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
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  );
}
