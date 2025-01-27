import { tv } from 'tailwind-variants';

export const tabsStyle = tv({
  slots: {
    base: 'flex flex-col',
    items: 'flex gap-2',
  },
});

export const tabPanelStyle = tv({
  base: 'p-4',
});

export const tabStyle = tv({
  base: 'rounded px-4 py-2 transition-colors hover:cursor-pointer focus:outline-hidden',
  variants: {
    isSelected: {
      true: 'bg-emerald-50 text-emerald-700 [text-shadow:0_0_0.5px_var(--color-emerald-700)]',
      false: 'text-slate-600 hover:text-emerald-700',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});
