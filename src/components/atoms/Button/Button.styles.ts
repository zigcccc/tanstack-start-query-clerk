import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'flex items-center gap-2 rounded px-4 py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    intent: {
      primary: `[--faded-hover:var(--color-emerald-200)] [--faded:var(--color-emerald-100)] [--hover:var(--color-emerald-600)] [--main:var(--color-emerald-500)] [--outline-hover:var(--color-emerald-50)]`,
      info: `[--faded-hover:var(--color-blue-200)] [--faded:var(--color-blue-100)] [--hover:var(--color-blue-600)] [--main:var(--color-blue-500)] [--outline-hover:var(--color-blue-50)]`,
      error: `[--faded-hover:var(--color-red-200)] [--faded:var(--color-red-100)] [--hover:var(--color-red-600)] [--main:var(--color-red-500)] [--outline-hover:var(--color-red-50)]`,
      warning: `[--faded-hover:var(--color-yellow-200)] [--faded:var(--color-yellow-100)] [--hover:var(--color-yellow-600)] [--main:var(--color-yellow-500)] [--outline-hover:var(--color-yellow-50)]`,
      strong: `[--faded-hover:var(--color-gray-200)] [--faded:var(--color-gray-100)] [--hover:var(--color-gray-800)] [--main:var(--color-gray-700)] [--outline-hover:var(--color-gray-50)]`,
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    variant: {
      filled: 'border border-(--main) bg-(--main) text-white hover:border-(--hover) hover:bg-(--hover)',
      outlined:
        'border border-(--main) bg-transparent text-(--main) hover:border-(--hover) hover:bg-(--outline-hover) hover:text-(--hover)',
      ghost: 'border border-transparent bg-transparent text-(--main) hover:bg-(--outline-hover) hover:text-(--hover)',
      faded: 'border border-(--faded) bg-(--faded) text-(--main) hover:border-(--faded-hover) hover:bg-(--faded-hover)',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    variant: 'filled',
  },
});
