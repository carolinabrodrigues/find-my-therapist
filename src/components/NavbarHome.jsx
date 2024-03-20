import { Link } from 'react-router-dom';
import logo from '../assets/logo black svg.svg';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showLoggedIn = isLoggedIn => {
    if (isLoggedIn) {
      return (
        <>
          <nav
            className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
            aria-label='Global'
          >
            <div className='flex lg:flex-1'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Find My Therapist</span>
                <img className='h-8 w-auto' src={logo} alt='' />
              </a>
            </div>
            <div className='flex lg:hidden'>
              <button
                type='button'
                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>

            <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
              <Link
                to='/user'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-white text-sm font-semibold leading-2'
              >
                My Account <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
          </nav>
          <Dialog
            as='div'
            className='lg:hidden'
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className='fixed inset-0 z-50' />
            <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
              <div className='flex items-center justify-between'>
                <a href='#' className='-m-1.5 p-1.5'>
                  <span className='sr-only'>Find My Therapist</span>
                  <img className='h-8 w-auto' src={logo} alt='' />
                </a>
                <button
                  type='button'
                  className='-m-2.5 rounded-md p-2.5 text-gray-700'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='sr-only'>Close menu</span>
                  <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='mt-6 flow-root'>
                <div className='-my-6 divide-y divide-gray-500/10'>
                  <div className='space-y-2 py-6'>
                    <Link
                      href='/user'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      My Account
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </>
      );
    } else {
      return (
        <>
          <nav
            className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
            aria-label='Global'
          >
            <div className='flex lg:flex-1'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Find My Therapist</span>
                <img className='h-8 w-auto' src={logo} alt='' />
              </a>
            </div>
            <div className='flex lg:hidden'>
              <button
                type='button'
                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='flex flex-row'>
              <div className='hidden lg:flex lg:flex-1 lg:justify-end w-56'>
                <Link
                  to='/login'
                  className='text-sm font-semibold leading-6 text-gray-900 pt-2 hover:text-indigo-700'
                >
                  Have an account?
                </Link>
              </div>
              <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
                <Link
                  to='/signup'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-white text-sm font-semibold leading-2'
                >
                  Register <span aria-hidden='true'>&rarr;</span>
                </Link>
              </div>
            </div>
          </nav>
          <Dialog
            as='div'
            className='lg:hidden'
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className='fixed inset-0 z-50' />
            <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
              <div className='flex items-center justify-between'>
                <a href='#' className='-m-1.5 p-1.5'>
                  <span className='sr-only'>Find My Therapist</span>
                  <img className='h-8 w-auto' src={logo} alt='' />
                </a>
                <button
                  type='button'
                  className='-m-2.5 rounded-md p-2.5 text-gray-700'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='sr-only'>Close menu</span>
                  <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='mt-6 flow-root'>
                <div className='-my-6 divide-y divide-gray-500/10'>
                  <div className='space-y-2 py-6'>
                    <Link
                      href='/login'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      Have an account?
                    </Link>
                    <Link
                      to='/signup'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </>
      );
    }
  };

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      {showLoggedIn(isLoggedIn)}
    </header>
  );
}

export default Navbar;
