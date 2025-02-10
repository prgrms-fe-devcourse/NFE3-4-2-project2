const PinnedItem = ({ label }) => {
  return (
    <div className="flex ">
      <div className="mr-15">
        <div className="w-2 h-full bg-gray-5 relative ">
          <div className="w-10 h-10 rounded-full  bg-sub-accent-2 absolute top-0 -left-4"></div>
        </div>
      </div>
      <div className="w-255 h-25 flex items-center mb-15 font-semibold text-15 text-gray-8 ">
        {label}
      </div>
    </div>
  );
};
export default PinnedItem;
