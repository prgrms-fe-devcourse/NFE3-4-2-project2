const PlanPreviewListWrapper = ({ children, header }) => {
  return (
    <div className="w-300 h-410 border-solid  border-r-2 border-l-2 border-gray-4  flex justify-center px-20">
      <div className="w-300">
        <div className="font-semibold text-15 text-gray-9 mb-40 pl-20">{header}</div>
        {children}
      </div>
    </div>
  );
};
export default PlanPreviewListWrapper;
