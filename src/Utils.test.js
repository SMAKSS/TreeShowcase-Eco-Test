// Here lies the test case for UUID.js

import { cleanup } from '@testing-library/react';

import { UUID, SearchArrays } from './Utils';

afterEach(cleanup);

test('Generate UUID', () => {
  const UUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const uuid = UUID();

  expect(uuid).toMatch(UUIDRegex);
});

test('Search in array', () => {
  const array = [
    'test',
    { id: '99-33', name: 'test-name' },
    { id: '33-99', name: 'name' },
    'name'
  ];

  expect(
    SearchArrays({
      searchText: 'test',
      array,
      keys: ['id'],
      include: false
    })
  ).toEqual(['test', { id: '99-33', name: 'test-name' }]);
  expect(
    SearchArrays({
      searchText: 'name',
      array,
      keys: ['id'],
      include: true
    })
  ).toEqual(['name']);
});
