import PropTypes from 'prop-types';

const SkeletonLayout = ({ layout, itemList }) => {
  return (
    <>
      {layout == 'large-layout' && (
        <div>
          {Array(itemList)
            .fill()
            .map((_, index) => (
              <div key={index} className="p-20 rounded-8 flex mb-13 bg-gray-4">
                <div className="flex-1 content-center">
                  <div className="">
                    <div className="w-350 h-25 bg-[#dddddd] mb-7"></div>
                    <div className="w-250 h-25 bg-[#dddddd] mb-7"></div>
                  </div>
                  <div className="w-500 h-15 mt-35 bg-[#dddddd]"></div>
                  <div className="w-500 h-15 mt-7 bg-[#dddddd]"></div>
                </div>
                <div className="rounded-10 w-344 h-171 ml-40 bg-[#dddddd]"></div>
              </div>
            ))}
        </div>
      )}
      {layout == 'medium-layout' && (
        <div className="flex flex-wrap">
          {Array(itemList)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-4 rounded-8 mb-32 w-313 mr-10 overflow-hidden [&:nth-child(3n)]:mr-0"
              >
                <div className="h-209 w-full bg-[#dddddd]"></div>
                <div className="p-20">
                  <div className="w-150 mb-13 h-25 bg-[#dddddd]"></div>
                  <div className="w-full h-15 mt-7 bg-[#dddddd]"></div>
                </div>
              </div>
            ))}
        </div>
      )}
      {layout == 'small-layout' && (
        <div>
          {Array(itemList)
            .fill()
            .map((_, index) => (
              <table key={index} className="w-full ">
                <colgroup>
                  <col style={{ width: '5%' }}></col>
                  <col style={{ width: '20%' }}></col>
                  <col style={{ width: '15%' }}></col>
                  <col style={{ width: '55%' }}></col>
                  <col style={{ width: '5%' }}></col>
                </colgroup>
                <tr className="border-b  border-solid border-[#EEEEEE]">
                  <td className="py-14 px-8">
                    <div
                      className={`rounded-6 flex justify-center items-center  w-48 h-22 bg-[#EEEEEE]`}
                    ></div>
                  </td>
                  <td className=" px-8 ">
                    <div className="w-full h-15 bg-[#dddddd]"></div>
                  </td>
                  <td className=" py-14 px-8">
                    <div className="w-full h-15 bg-[#dddddd]"></div>
                  </td>
                  <td className=" px-8 ">
                    <div className="w-full h-15 bg-[#dddddd]"></div>
                  </td>
                  <td className="py-14 px-8">
                    <div className="w-full h-15 bg-[#dddddd]"></div>
                  </td>
                </tr>
              </table>
            ))}
        </div>
      )}
    </>
  );
};

export default SkeletonLayout;

SkeletonLayout.propTypes = {
  layout: PropTypes.string.isRequired,
  itemList: PropTypes.number.isRequired,
};
