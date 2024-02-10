import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import ApplicationIcon from '@/Components/ApplicationIcon';

export default function Authenticated({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationIcon className="block h-11 w-auto fill-current text-gray-800" />
                  {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" /> */}
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route('dashboard')}
                  active={route().current('dashboard')}
                >
                  ダッシュボード
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {user.name}

                        <svg
                          className="ms-2 -me-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')}>
                      プロフィール
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route('logout')}
                      method="post"
                      as="button"
                    >
                      ログアウト
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(previousState => !previousState)
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'
          }
        >
          <Transition
            as="div"
            show={showingNavigationDropdown}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 translate-x-2 scale-95"
            enterTo="opacity-100 translate-x-0 scale-100"
            leave="transition ease-in duration-200 transform"
            leaveFrom="opacity-100 translate-x-0 scale-100"
            leaveTo="opacity-0 translate-x-2 scale-95"
          >
            {/* <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                ダッシュボード
                            </ResponsiveNavLink>
                        </div> */}
            {/* 家計簿管理 */}
            <div className="pt-1 pb-1">
              <div className="px-4 flex items-center">
                <img
                  src={user.picture_url}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="font-medium text-base text-gray-800">
                  {user.name}
                </div>
              </div>
            </div>
            {/* 家計簿管理 */}
            <div className="pt-4 pb-1 ">
              <div className="px-4">
                <div className="font-medium text-sm text-gray-500">
                  家計簿管理
                </div>
              </div>
              <div className="mt-1 pl-4 space-y-1">
                <ResponsiveNavLink href={route('dashboard')}>
                  今月の収支まとめ
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('transactions.index')}>
                  収支一覧
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('categories.index')}>
                  カテゴリ一覧
                </ResponsiveNavLink>
              </div>
            </div>
            <div className="pt-4 pb-1 border-t border-gray-200">
              {/* ユーザー管理 */}
              <div className="px-4">
                <div className="font-medium text-sm text-gray-500">
                  ユーザー管理
                </div>
              </div>
              <div className="mt-1 pl-4 space-y-1">
                <ResponsiveNavLink href={route('profile.edit')}>
                  プロフィール
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  method="post"
                  href={route('logout')}
                  as="button"
                >
                  ログアウト
                </ResponsiveNavLink>
              </div>
            </div>
            <div className="pt-4 pb-1 border-t border-gray-200">
              {/* その他 */}
              <div className="px-4">
                <div className="font-medium text-sm text-gray-500">その他</div>
              </div>
              <div className="mt-1 pl-4 space-y-1">
                <ResponsiveNavLink href={route('welcome')}>
                  使い方・ウェルカムページ
                </ResponsiveNavLink>
              </div>
            </div>
          </Transition>
        </div>
      </nav>

      {header && (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
