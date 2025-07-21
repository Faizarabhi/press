import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/auth/authSlice'

function Header() {
  const categories = []
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
          <img className="h-8 w-auto" src="/logopress.png" alt="Magazine Logo" />
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition"
            >
              {cat.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user ? (
            <> <a
                href="/login"
                className="block rounded-full  px-3 py-2 mt-6 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                Login
              </a>
               <a
                href="/register"
                className="block  ml-2 px-3 py-2 mt-6 text-base font-semibold text-white rounded-full  bg-gray-900 hover:bg-gray-100 hover:text-gray-900"
              >
                Register
              </a>
              </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition"
            >
              Logout <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-lg ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
              <img className="h-8 w-auto" src="/logopress.png" alt="Magazine Logo" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                {cat.name}
              </a>
            ))}

            {!user ? (
             <> <a
                href="/login"
                className="block rounded-full px-3 py-2 mt-6 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                Login
              </a>
               <a
                href="/register"
                className="block px-3 py-2 mt-6 text-base font-semibold text-white rounded-full  bg-gray-900 hover:bg-gray-100"
              >
                Register
              </a>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
                className="block rounded-lg px-3 py-2 mt-6 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Header
