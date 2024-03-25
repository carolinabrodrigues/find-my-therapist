import linkedin from '../assets/linkedin-icon.svg';
import github from '../assets/github-icon.svg';

function Footer() {
  return (
    <div>
      <footer className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 pb-12 md:flex md:items-center md:justify-between lg:px-8'>
          <div className='flex justify-center space-x-6 md:order-2'>
            <a key='LinkedIn' href='https://linkedin.com/in/carolinabrodrigues'>
              <span className='sr-only'>LinkedIn</span>
              <img src={linkedin} className='h-5' />
            </a>
            <a key='Github' href='https://github.com/carolinabrods'>
              <span className='sr-only'>Github</span>
              <img src={github} className='h-5' />
            </a>
          </div>
          <div className='mt-8 md:order-1 md:mt-0'>
            <p className='text-center text-xs leading-5 text-gray-500'>
              &copy; 2024 Find My Therapist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
