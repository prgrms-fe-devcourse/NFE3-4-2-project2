import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const bgColorVariants = {
  orange: 'bg-orange-300 hover:bg-orange-400 text-white', // TODO : primary로 변경
};

const roundedVariants = {
  base: 'rounded-4', // antd default
  full: 'rounded-full',
  sm: 'rounded-sm',
  md: 'rounded-md',
};

const Button = ({
  type,
  label,
  onClick,
  isDisabled = false,
  rounded = 'base',
  color = 'orange',
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${bgColorVariants[color]}
        ${roundedVariants[rounded]} text-14 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  rounded: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};
