import { useRef } from 'react';
import { useButton } from 'react-aria';

import { buttonStyles } from './Button.styles';
import { type ButtonProps } from './Button.types';

const buttonSizeToIconSizeMap = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

export function Button({
  children,
  className,
  iconAfter: IconAfter,
  iconBefore: IconBefore,
  size = 'md',
  intent = 'primary',
  variant = 'filled',
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const iconSize = buttonSizeToIconSizeMap[size];

  return (
    <button ref={ref} {...buttonProps} className={buttonStyles({ className, variant, intent, size })}>
      {!!IconBefore && <IconBefore size={iconSize} />}
      {children}
      {!!IconAfter && <IconAfter size={iconSize} />}
    </button>
  );
}
