import PropTypes from 'prop-types';

const Button = ({ borderColor, textColor, onClick, label }) => {
  const borderVariant = `border border-solid rounded-12 border-${borderColor}`;
  const textVariant = `test-12 text-${textColor} font-semibold`;
  return (
    <button
      className={`w-full h-45 flex justify-center items-center ${borderVariant}`}
      onClick={onClick}
    >
      <span className={`${textVariant} `}>{label}</span>
    </button>
  );
};
export default Button;

Button.propTypes = {
  borderColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
