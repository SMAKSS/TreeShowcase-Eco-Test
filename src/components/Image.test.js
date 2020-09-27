// Here lies the test case for Image.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import Image from './Image';

afterEach(cleanup);

delete global.window.location;
global.window = Object.create(window);
global.window.location = {
  protocol: 'http:',
  hostname: 'localhost'
};

test('Create an image', () => {
  render(
    <Image
      src='./image.png'
      alt='test-image'
      className='test-class'
      data-testid='test-image'
    />
  );
  const image = screen.getByTestId(/test-image/i);

  expect(image).toBeInTheDocument();
  expect(image.src).toBe(
    `${global.window.location.protocol}//${global.window.location.hostname}/image.png`
  );
  expect(image.alt).toBe('test-image');
  expect(image.classList[0]).toBe('test-class');
});
