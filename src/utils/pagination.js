// currentPage : 현재 페이지
// itemTotalSize : 페이지 리스트로 나올 item의 전체 길이(전체 count 값)
// itemListLength : 페이지에 보여줄 리스트의 갯수
// pagesLength : 페이지네이션에 보여줄 페이지의 갯수
export function calcPage(currentPage, itemTotalSize, itemListLength, pagesLength) {
  const totalPagesLength = Math.ceil(itemTotalSize / itemListLength); // page가 총몇개인지?
  const startPage = Math.max(1, currentPage - Math.floor(pagesLength / 2)); // [1] 2 3 4 5
  const endPage = Math.min(startPage + pagesLength - 1, totalPagesLength); // 2 3 4 5 [6]
  const startIndex = (currentPage - 1) * itemListLength; // member list를 자를 index
  const endIndex = startIndex + itemListLength; // member list 끝의 index
  return {
    startItemIndex: startIndex,
    endItemIndex: endIndex,
    startPage: startPage,
    endPage: endPage,
  };
}
