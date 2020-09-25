// This is a simple utility function wrote by SMAKSS to produce UUID

/**
 * @returns {String} - a unique id
 */
function UUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16);
  });
}

export default UUID;