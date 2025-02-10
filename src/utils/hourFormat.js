/**
 * @returns
 * [{
 *    label: '09:00',
 *    time: '09:00:00',
 *    section : '오전'
 * }, ...]
 */

export const TIME_BOUNDARY = Object.freeze({
  12: '아침', // timeBoundary, timeZone
  18: '낮',
  25: '저녁',
});

export const generateTimeArray = () => {
  const timeArray = [];
  let hour = 9; // 시작 시간 : 9시
  let minute = 0; // 시작 분  : 0분

  // 24시까지 포함
  while (hour < 25) {
    // 09:00
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const boundary = Object.entries(TIME_BOUNDARY);
    const section = boundary.find(([timeBoundary, _]) => hour < Number(timeBoundary))[1];
    timeArray.push({
      label: timeString,
      time: `${timeString}:00`,
      section,
    });

    minute += 30;

    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return timeArray;
};
