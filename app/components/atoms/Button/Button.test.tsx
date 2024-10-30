import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});
