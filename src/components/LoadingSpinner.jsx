import { Spinner } from '@nextui-org/react';

function LoadingSpinner() {
  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <Spinner label='Default' color='default' labelColor='foreground' />
      </div>
    </div>
  );
}

export default LoadingSpinner;
