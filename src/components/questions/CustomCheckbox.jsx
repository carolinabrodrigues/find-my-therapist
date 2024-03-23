/* eslint-disable react/prop-types */
import { useCheckbox, Chip, VisuallyHidden, tv } from '@nextui-org/react';

export const CustomCheckbox = props => {
  const { padding } = props;
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const checkbox = tv({
    slots: {
      base: `flex items-center justify-center rounded-md py-${
        padding ? padding : '6'
      } px-3 sm:flex-1 bg-white max-w-full text-center`,
      content: 'text-md',
    },
    variants: {
      isSelected: {
        true: {
          base: 'bg-indigo-600 hover:bg-indigo-500 ring-2 ring-indigo-600 ring-offset-2',
          content: 'text-white pl-1',
        },
      },
      isFocusVisible: {
        true: {
          base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
        },
      },
    },
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()} className='flex justify-center'>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        variant='faded'
        {...getLabelProps()}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  );
};
