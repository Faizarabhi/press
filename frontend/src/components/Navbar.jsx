import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white fixed right-0 z-50 w-4/5 border-b shadow px-6 py-4 flex items-center justify-end ">

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center space-x-2 focus:outline-none">
          <img
            /* src={user?.photoUrl} */
            src="/images/images.jpeg"
            alt="User avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-gray-700">{user?.name}</span>
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/profile"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Mon Profil
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } w-full text-left px-4 py-2 text-sm text-red-600`}
                  >
                    Se déconnecter
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  )
}

export default Navbar


