import PropTypes from 'prop-types';

const DetailCardWrapper = ({ header, guide, children }) => {
  return (
    <div className="max-w-270 flex justify-center border-l-4 ">
      <div className="px-15">
        <div className="font-semibold text-15 text-gray-9 mb-20">{header}</div>
        <span className="font-regular text-12 text-gray-8 block mb-17 ">{guide}</span>
        {children}
      </div>
    </div>
  );
};

DetailCardWrapper.propTypes = {
  header: PropTypes.string.isRequired,
  guide: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DetailCardWrapper;
