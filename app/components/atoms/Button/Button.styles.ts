import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'flex items-center gap-2 rounded px-4 py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    intent: {
      primary: `[--faded-hover:theme('colors.emerald.200')] [--faded:theme('colors.emerald.100')] [--hover:theme('colors.emerald.600')] [--main:theme('colors.emerald.500')] [--outline-hover:theme('colors.emerald.50')]`,
      info: `[--faded-hover:theme('colors.blue.200')] [--faded:theme('colors.blue.100')] [--hover:theme('colors.blue.600')] [--main:theme('colors.blue.500')] [--outline-hover:theme('colors.blue.50')]`,
      error: `[--faded-hover:theme('colors.red.200')] [--faded:theme('colors.red.100')] [--hover:theme('colors.red.600')] [--main:theme('colors.red.500')] [--outline-hover:theme('colors.red.50')]`,
      warning: `[--faded-hover:theme('colors.yellow.200')] [--faded:theme('colors.yellow.100')] [--hover:theme('colors.yellow.600')] [--main:theme('colors.yellow.500')] [--outline-hover:theme('colors.yellow.50')]`,
      strong: `[--faded-hover:theme('colors.gray.200')] [--faded:theme('colors.gray.100')] [--hover:theme('colors.gray.800')] [--main:theme('colors.gray.700')] [--outline-hover:theme('colors.gray.50')]`,
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    variant: {
      filled: 'border border-[--main] bg-[--main] text-white hover:border-[--hover] hover:bg-[--hover]',
      outlined:
        'border border-[--main] bg-transparent text-[--main] hover:border-[--hover] hover:bg-[--outline-hover] hover:text-[--hover]',
      ghost: 'border border-transparent bg-transparent text-[--main] hover:bg-[--outline-hover] hover:text-[--hover]',
      faded: 'border border-[--faded] bg-[--faded] text-[--main] hover:border-[--faded-hover] hover:bg-[--faded-hover]',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    variant: 'filled',
  },
});
