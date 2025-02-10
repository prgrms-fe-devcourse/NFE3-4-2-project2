import { Link } from 'react-router';
import PropTypes from 'prop-types';

const RoundedLink = ({ link, label, width, height, borderColor }) => {
  return (
    <Link
      className={`${width} ${height} flex items-center justify-center rounded-full border-solid border-2 ${borderColor} mx-auto mt-30 text-gray-9 hover:bg-sub-accent-1/10`}
      to={link}
    >
      {label}
    </Link>
  );
};

RoundedLink.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default RoundedLink;
