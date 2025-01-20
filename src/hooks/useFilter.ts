// // 필터링 로직(예: 여행지 목록을 지역별로 필터링)을 처리합니다. 
// // 예를 들어, 선택한 필터 옵션에 따라 데이터를 정렬하거나 필터링합니다.

// import { useState } from "react";

// export const useFilter = (data: any[], filterOptions: any) => {
//     const [filteredData, setFilteredData] = useState(data);

//     const applyFilter = () => {
//         const result = data.filter(item => item.region === filterOptions.region);
//         setFilteredData(result);
//     };

//     return { filteredData, applyFilter };
// };
