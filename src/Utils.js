// Here lies simple utilities for general purposes

/**
 * @returns {String} - a unique id
 *
 * This function will produce a UUID
 */
function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 *
 * @param {String} searchText - string to search for in array
 * @param {Array} array - array of items
 *
 * @returns {Array} - filtered array by the searchText
 *
 * This function will filter input array based on the search text.
 */
function SearchArrays({
  searchText = '',
  array = [],
  keys = [],
  include = true
}) {
  const filtered = [];
  const regex = new RegExp(searchText, 'i');

  array.forEach((arr) => {
    if (
      typeof arr !== 'object' &&
      arr.toString().match(regex) &&
      !filtered.some((el) => el.id === arr.id)
    )
      filtered.push(arr);
    Object.keys(arr).forEach((key) => {
      const includes = include ? keys.includes(key) : !keys.includes(key);
      if (
        includes &&
        arr[key].toString().match(regex) &&
        !filtered.some((el) => el.id === arr.id)
      ) {
        filtered.push(arr);
      }
    });
  });

  return filtered;
}

export { UUID, SearchArrays };
