import PropTypes from 'prop-types';
import timeFormatter from '@/utils/timeDifferenceFormat';

const Comment = ({ commentData, deleteEvent }) => {
  return (
    <div className="w-full py-30 px-20 relative">
      <div className="flex justify-between">
        <p className="text-16 text-gray-7 mb-16">{timeFormatter(commentData.createdAt)}</p>
        <div className="cursor-pointer w-14" onClick={() => deleteEvent()}>
          <img src="/icons/delete.svg" alt="삭제 아이콘" className="w-full" />
        </div>
      </div>
      <p className="w-[90%] line-clamp-2 text-14 text-gray-8 leading-[18px] tracking-[1.01px]">
        {commentData.comment}
      </p>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  commentData: PropTypes.shape({
    createdAt: PropTypes.string,
    comment: PropTypes.string,
    _id: PropTypes.string,
  }),
  deleteEvent: PropTypes.func,
};
