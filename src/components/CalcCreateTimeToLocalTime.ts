export default function CalcCreateTimeToLocalTime(isoDate: string): string {
  const inputDate = new Date(isoDate);
  const currentDate = new Date();

  const diffInMilliseconds = inputDate.getTime() - currentDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if(~diffInDays > 0) {
    return `${~diffInDays}일 전`;
  } else if(~(diffInHours % 24) > 0){
    return `${~diffInHours % 24}시간 전`
  } else if(~(diffInMinutes % 60) > 0){
    return `${~diffInMinutes % 60}분 전`
  } else {
    return `${~diffInSeconds % 1000}초 전`
  }
}