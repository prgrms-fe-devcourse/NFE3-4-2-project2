/** ✅ 쿠키 설정 함수 */
export const setCookie = (name: string, value: string, days = 30) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

/** ✅ 쿠키 가져오기 함수 */
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
     const [key, value] = cookie.split("=");
     if (key === name) return decodeURIComponent(value);
  }
  return null;
};

/** ✅ 쿠키 삭제 함수 */
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
