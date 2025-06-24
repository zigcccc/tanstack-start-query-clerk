import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button.component';

describe('<Button />', () => {
  it('should trigger onPress on button click', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Click me!</Button>);

    expect(screen.queryByRole('button', { name: 'Click me!' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Click me!' }));

    expect(onPress).toHaveBeenCalled();
  });

  it('should render with icons if passed', () => {
    const onPress = vi.fn();
    const { rerender } = render(
      <Button iconAfter={ArrowRightIcon} iconBefore={ArrowLeftIcon} onPress={onPress}>
        I have two icons
      </Button>
    );

    expect(
      within(screen.getByRole('button', { name: 'I have two icons' })).queryByTestId('button--icon--before')
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('button', { name: 'I have two icons' })).queryByTestId('button--icon--after')
    ).toBeInTheDocument();

    rerender(
      <Button iconBefore={ArrowLeftIcon} onPress={onPress}>
        I have one icon (before)
      </Button>
    );
    expect(
      within(screen.getByRole('button', { name: 'I have one icon (before)' })).queryByTestId('button--icon--before')
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('button', { name: 'I have one icon (before)' })).queryByTestId('button--icon--after')
    ).not.toBeInTheDocument();

    rerender(
      <Button iconAfter={ArrowLeftIcon} onPress={onPress}>
        I have one icon (after)
      </Button>
    );
    expect(
      within(screen.getByRole('button', { name: 'I have one icon (after)' })).queryByTestId('button--icon--before')
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole('button', { name: 'I have one icon (after)' })).queryByTestId('button--icon--after')
    ).toBeInTheDocument();
  });
});
