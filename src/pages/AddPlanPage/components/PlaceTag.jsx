const PlaceTagButton = ({ title, contentId, onNext }) => {
  return (
    <button
      className="w-auto h-39 min-w-178 bg-gray-4 rounded-20 flex justify-center items-center"
      onClick={() => onNext(contentId)}
    >
      <div className="left-12 top-8 text-center mx-20 text-black text-16 font-semibold">
        {title}
      </div>
    </button>
  );
};

export default PlaceTagButton;
