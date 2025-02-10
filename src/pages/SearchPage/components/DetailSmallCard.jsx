import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import WishListButton from './WishListButton';

const DetailSmallCard = ({ onClick, title, city, street, description, category, contentid }) => {
  const [color, setColor] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const categoryMap = {
    c1: { color: 'bg-[#2481EC]', name: '관광지' },
    c2: { color: 'bg-[#FBBA06]', name: '쇼핑' },
    c3: { color: 'bg-[#25B801]', name: '숙박' },
    c4: { color: 'bg-[#F64F4F]', name: '음식' },
    c5: { color: 'bg-[#6458D4]', name: '축제행사' },
    c6: { color: 'bg-[#24C7EC]', name: '테마여행' }, // 중복 처리
  };

  useEffect(() => {
    const { color, name } = categoryMap[category] || { color: '', name: '' };
    setColor(color);
    setCategoryName(name);
  }, [category]);

  return (
    <>
      <table className="w-full table-fixed">
        <colgroup>
          <col style={{ width: '7%' }}></col>
          <col style={{ width: '20%' }}></col>
          <col style={{ width: '15%' }}></col>
          <col style={{ width: '53%' }}></col>
          <col style={{ width: '5%' }}></col>
        </colgroup>
        <tr onClick={onClick} className="border-b  border-solid border-[#EEEEEE] cursor-pointer">
          <td className="py-14 px-8">
            <div
              className={`rounded-6 flex justify-center items-center  w-48 h-22 text-12 text-white line-clamp-1 ${color}`}
            >
              {categoryName}
            </div>
          </td>
          <td className="text-16 font-medium  px-8 line-clamp-1 text-left">{title}</td>
          <td className="text-14 text-gray-7 py-14 px-8 text-left">{`${city} > ${street}`}</td>
          <td className=" px-8 line-clamp-1 text-left">{description}</td>
          <td className="py-14 px-8">
            {' '}
            <WishListButton placeInfo={contentid} />
          </td>
        </tr>
      </table>
    </>
  );
};

export default DetailSmallCard;

DetailSmallCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contentid: PropTypes.object.isRequired,
};
