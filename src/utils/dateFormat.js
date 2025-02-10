// Date 객체에서 문자열 'YYYY년 MM월 DD일'로 변환
export const formatDateKo = date => {
  const year = date.getFullYear(); // 연도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일

  return `${year}년 ${month}월 ${day}일`;
};

export const formatTime = timeString => {
  // 시간 문자열을 ':'로 분리
  const [hours, minutes] = timeString.split(':').map(Number);

  // 오후/오전 구분
  const isPM = hours >= 12;
  const formattedHours = isPM ? hours - 12 : hours;

  // 12시인 경우는 '12'로 표시
  const displayHours = formattedHours === 0 ? 12 : formattedHours;

  // 오전/오후 표시
  const period = isPM ? '오후' : '오전';

  // 분이 0이 아닐 경우 "시"와 "분" 모두 표시
  return minutes > 0 ? `${period} ${displayHours}시 ${minutes}분` : `${period} ${displayHours}시`;
};

// date string에서 'yyyy-mm-dd'로 전환
export const dateToString = day => {
  const date = new Date(day);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더하기
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDate = dateString => {
  // 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // YYYY-MM-DD 형식으로 반환
  return `${year}-${month}-${day}`;
};
