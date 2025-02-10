import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const MyPageHeader = ({ title }) => {
  const { userFullName } = useSelector(state => state.user);

  return (
    <div className="mb-30">
      <h2 className="text-24 text-gray-13 font-semibold">
        <strong className="text-primary-0">{userFullName}</strong> 님의 {title}
      </h2>
    </div>
  );
};

export default MyPageHeader;

MyPageHeader.propTypes = {
  title: PropTypes.string,
};
