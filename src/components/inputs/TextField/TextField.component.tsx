import { forwardRef } from 'react';

import { textFieldStyles } from './TextField.styles';
import { type TextFieldProps } from './TextField.types';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextFieldInner(
  { className, name, label, onChange, placeholder, value, error, ...rest },
  ref
) {
  const hasError = !!error;
  const styles = textFieldStyles({ hasError });

  return (
    <div className={styles.base({ className })}>
      <label className={styles.label()} htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        className={styles.input()}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {hasError && <span className={styles.error()}>{error.message}</span>}
    </div>
  );
});
