import { type LucideIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { type AriaButtonOptions } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { type buttonStyles } from './Button.styles';

export type ButtonProps = PropsWithChildren<
  AriaButtonOptions<'button'> &
    VariantProps<typeof buttonStyles> & {
      className?: string;
      iconBefore?: LucideIcon;
      iconAfter?: LucideIcon;
    }
>;
