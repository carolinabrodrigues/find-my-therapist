import NavbarHome from '../components/NavbarHome';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import hero from '../assets/happy-therapy.jpg';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <NavbarHome />
      <div className='relative isolate overflow-hidden pt-14'>
        <div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
            <h1 className='max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto'>
              NO MORE SETBACKS, JUST THERAPY BLISS{' '}
            </h1>
            <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
              <p className='text-lg leading-8 text-gray-600'>
                Say goodbye to endless searching and hello to personalized
                matches tailored just for you. We connect individuals with the
                perfect therapist while empowering therapists to grow their
                practice with precision and ease. Discover the future of therapy
                matchmaking and embark on your journey to a happier, healthier
                you.
              </p>

              <div className='mt-10 flex items-center gap-x-6'>
                <Link
                  to={isLoggedIn ? '/user' : '/signup'}
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                >
                  Get started
                </Link>
              </div>
            </div>
            <img
              src={hero}
              alt=''
              className='mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-1 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
            />
          </div>
        </div>
        <div className='absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32' />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
