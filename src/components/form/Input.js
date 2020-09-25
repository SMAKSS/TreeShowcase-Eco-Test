import React from 'react';

import './Input.scss';

/**
 *
 * @param {String} title - title of the input
 * @param {String} label - label of input
 * @param {HTMLElement} icon - main icon
 * @param {HTMLElement} secondaryIcon - secondary icon
 * @param {Function} secondaryIconOnClick - secondary icon handler
 * @param {String} id - input id
 * @param {String} type - input type
 * @param {String} value - input value
 * @param {Function} onChange - input onchange handler
 * This function is responsible for Input component.
 */
function Input({
  label = '',
  icon = null,
  secondaryIcon = null,
  secondaryIconOnClick = null,
  id = null,
  type = 'text',
  value = '',
  onChange = () => console.log('Please add onchange event!'),
  ...props
}) {
  return (
    <div className='form-group form-container'>
      {icon && <span className='icon'>{icon}</span>}
      <input id={id} type={type} value={value} onChange={onChange} {...props} />
      {label && <label htmlFor={id}>{label}</label>}
      {secondaryIcon && (
        <span
          className='secondary-icon'
          onClick={secondaryIconOnClick}
          style={
            value
              ? { opacity: 1, visibility: 'inherit', transition: 0.2 }
              : { opacity: 0, visibility: 'hidden', transition: 0.2 }
          }
        >
          {secondaryIcon}
        </span>
      )}
    </div>
  );
}

export { Input };
