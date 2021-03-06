import React from 'react';

/**
 * @param {any} props - props like data attribute
 *
 * @returns {SVGAElement} - it will return clear icon svg
 *
 * This function is responsible for clear icon svg
 */
function Clear(props) {
  const { fill, ...restProps } = props;

  return (
    <svg
      version='1.1'
      fill={fill || '#a1a3a8'}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 512.001 512.001'
      {...restProps}
    >
      <path
        d='M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z'
      />
    </svg>
  );
}

export default Clear;
