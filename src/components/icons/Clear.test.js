// Here lies the test case for Clear.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Clear from './Clear';

afterEach(cleanup);

test('Creating clear icon', () => {
  render(<Clear data-testid='test-clear' />);
  const clear = screen.getByTestId(/test-clear/i);

  expect(clear).toBeInTheDocument();
});
