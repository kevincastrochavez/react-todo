import React from 'react';
import { render } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  test('renders unchecked checkbox', () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector('button[role="checkbox"]');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('renders checked checkbox', () => {
    const { container } = render(<Checkbox defaultChecked />);
    const checkbox = container.querySelector('button[role="checkbox"]');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });
});
