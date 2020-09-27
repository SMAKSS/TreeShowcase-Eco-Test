// Here lies the test case for Search.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Search from './Search';

afterEach(cleanup);

test('Creating Search icon', () => {
  render(<Search data-testid='test-search' />);
  const search = screen.getByTestId(/test-search/i);

  expect(search).toBeInTheDocument();
});
