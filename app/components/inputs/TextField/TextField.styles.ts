import { tv } from 'tailwind-variants';

export const textFieldStyles = tv({
  slots: {
    base: 'flex flex-col gap-1',
    label: 'text-sm font-medium',
    input: 'rounded border border-gray-300 p-2',
    error: 'text-xs text-red-700',
  },
  variants: {
    hasError: {
      true: {
        input: 'focus:outline-red-700',
      },
      false: {
        input: 'focus:outline-green-700',
      },
    },
  },
});
