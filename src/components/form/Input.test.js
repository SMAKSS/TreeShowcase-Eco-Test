// Here lies a test case for Input.js

import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import { Input } from './index';

afterEach(cleanup);

const onChange = jest.fn();

function renderInput(onChange) {
  render(
    <Input
      id='search'
      type='text'
      label='test-input'
      value='tree'
      icon={<span />}
      secondaryIcon={<span />}
      onChange={onChange}
      data-testid='test-input'
    />
  );
  return screen.getByTestId(/test-input/i);
}

test('Creating input', () => {
  const input = renderInput(onChange);

  expect(input).toBeInTheDocument();
  expect(input.value).toBe('tree');
  expect(input.type).toBe('text');
  expect(input.labels[0].textContent).toBe('test-input');
  expect(input.parentNode.querySelector('.icon')).toBeInTheDocument();
  expect(input.parentNode.querySelector('.secondary-icon')).toBeInTheDocument();
});

test('Input onchange event', () => {
  const input = renderInput(onChange);
  fireEvent.change(input, { target: { value: 'Baobab' } });

  expect(onChange).toHaveBeenCalledTimes(1);
});
