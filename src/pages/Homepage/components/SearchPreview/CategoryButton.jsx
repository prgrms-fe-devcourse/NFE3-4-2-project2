import PropTypes from 'prop-types';

const CategoryButton = ({ category, onClick, isClicked }) => {
  return (
    <button onClick={onClick} className={`w-75 h-37 rounded-30 text-15 
      ${isClicked ? "bg-gray-10 text-gray-1" :"bg-gray-4 text-gray-8"}`}>
      {category}
    </button>
  )
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
}

export default CategoryButton;