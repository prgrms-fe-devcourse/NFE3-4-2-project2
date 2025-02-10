import PropTypes from 'prop-types';

const PlanPreviewItem = ({ children }) => {
  return (
    <div className="flex">
      <div className="mr-15">
        <div className="w-2 h-full bg-gray-5 relative ">
          <div className="w-15 h-15 rounded-full border-4 border-solid border-sub-accent-2 bg-white absolute top-17 -left-7"></div>
        </div>
      </div>
      {children}
    </div>
  );
};

PlanPreviewItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanPreviewItem;
