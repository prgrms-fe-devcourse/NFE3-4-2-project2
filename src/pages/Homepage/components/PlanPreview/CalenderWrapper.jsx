import PropTypes from 'prop-types';

const CalenderWrapper = ({ children }) => {
  return (
    <div className="min-w-380">
      <div className="flex flex-col justify-center items-center">
        <div className="font-semibold text-15 w-350 text-gray-9 mb-20 flex justify-start">
          🗓️ 날짜를 선택해 주세요
        </div>
        {children}
      </div>
    </div>
  );
};

CalenderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CalenderWrapper;
