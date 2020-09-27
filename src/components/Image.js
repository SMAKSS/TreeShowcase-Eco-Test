import React from 'react';

import './Image.scss';

/**
 * @param {String} src - image source
 * @param {String} alt - image alt attribute
 * @param {String} className - active class(es) for <img>
 * @param {any} props - other props like data attributes
 *
 * @returns {HTMLImageElement} - This will return an <img>
 *
 * This component is responsible for producing an image tag.
 */
function Image({ src = 'image', alt = 'image', className = null, ...props }) {
  return <img src={src} alt={alt} className={className} {...props} />;
}

export default Image;
