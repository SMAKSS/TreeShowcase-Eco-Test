import React from 'react';

import './Image.scss';

/**
 * @param {String} src - image source
 * @param {String} alt - image alt attribute
 * @param {String} className - active class(es) for <img>
 *
 * This component is responsible for producing an image tag.
 */
function Image({ src = 'image', alt = 'image', className = null }) {
  return <img src={src} alt={alt} className={className} />;
}

export default Image;
