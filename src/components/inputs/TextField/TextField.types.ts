import { type HTMLProps } from 'react';
import { type FieldError, type ChangeHandler } from 'react-hook-form';

export type TextFieldProps = HTMLProps<HTMLInputElement> & {
  className?: string;
  onChange: ChangeHandler;
  value?: string;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
};
