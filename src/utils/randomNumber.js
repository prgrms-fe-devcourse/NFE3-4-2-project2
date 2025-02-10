// 0부터 limit-1까지 중 랜덤한 숫자를 반환
const getRandomNumber = limit => {
  return Math.floor(Math.random() * ~~limit);
};

export default getRandomNumber;
