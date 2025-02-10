import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

const Category = ({ title, category }) => {
  const location = useLocation();
  const path = location.pathname;
  const queryParams = new URLSearchParams(location.search);

  const isActivePath = path === '/search' && !queryParams.has('category');
  const isCategoryActive = queryParams.has('category') && queryParams.get('category') === category;

  const activeStyle = 'text-black';

  const getNavLinkClass = () => {
    if (isActivePath && category === '') {
      return `text-base font-semibold text-left px-7 ${activeStyle}`;
    }
    return `text-base font-semibold text-left px-7  ${isCategoryActive ? activeStyle : 'text-gray-6'}`;
  };

  return (
    <>
      <div className={getNavLinkClass()}>{title}</div>
      {isActivePath && category === '' ? (
        <div className="w-full h-4 bg-primary-0"></div>
      ) : (
        isCategoryActive && <div className="w-full h-4 bg-primary-0"></div>
      )}
    </>
  );
};

export default Category;

Category.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
