/**
 * 현재 시간을 기준으로 상대적인 시간을 나타냅니다.
 * ex: "방금 전", "3시간 전", "2일 전"
 *
 * @param {string | Date} postTime - 생성 및 업데이트 시간 (Date 객체)
 * @returns {string} (예: "방금 전", "5시간 전")
 */

const timeFormatter = postTime => {
  const currentTime = new Date();
  const postData = new Date(postTime);
  const timeDifference = currentTime - postData;
  const minuteDifference = Math.floor(timeDifference / (1000 * 60));
  const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const dayDifference = Math.floor(hourDifference / 24);

  if (minuteDifference < 1) return '방금 전';
  if (minuteDifference < 60) return `${minuteDifference}분 전`;
  if (hourDifference < 24) return `${hourDifference}시간 전`;
  if (dayDifference === 1) return '하루 전';
  return `${dayDifference}일 전`;
};

export default timeFormatter;
