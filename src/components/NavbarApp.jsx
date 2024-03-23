import { Link } from 'react-router-dom';
import logo from '../assets/logo black svg.svg';
import home from '../assets/home.svg';
import profile from '../assets/profile.svg';
import logout from '../assets/logout.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function NavbarApp() {
  const { logoutUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
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

        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-6'>
          <Link to='/user' className='flex flex-col justify-center'>
            <img className='h-[30px]' src={home} alt='home icon' />
            <p>Home</p>
          </Link>
          <Link to='/profile' className='flex flex-col justify-center'>
            <img className='h-[30px]' src={profile} alt='profile icon' />
            <p>Profile</p>
          </Link>
          <Link onClick={logoutUser} className='flex flex-col justify-center'>
            <img className='h-[30px]' src={logout} alt='logout icon' />
            <p>Logout</p>
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
                  Home
                </Link>
                <Link
                  href='/profile'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Profile
                </Link>
                <Link
                  onClick={logoutUser}
                  href='/profile'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default NavbarApp;
