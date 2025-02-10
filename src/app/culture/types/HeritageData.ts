export interface HeritageData {
  // 국가유산 기본 정보
  ccbaKdcd: string;  // 종목코드
  ccbaAsno: string;  // 관리번호
  ccbaCtcd: string;  // 시도코드
  ccbaMnm1: string;  // 국가유산명(국문)
  ccbaMnm2?: string; // 국가유산명(한자)
  ccbaCtcdNm: string;  // 시도명
  ccsiName: string;  // 시군구명
  ccbaAdmin?: string;  // 관리자
  ccbaPoss?: string;  // 소유자
  ccbaCpno?: string;  // 국가유산연계번호
  ccbaCncl?: string;  // 지정해제여부
  longitude?: string; // 경도 (위치 정보 없음: '0')
  latitude?: string;  // 위도 (위치 정보 없음: '0')
  regDt: string;  // 최종수정일시

  // 상세 정보
  ccmaName: string;  // 국가유산종목
  gcodeName?: string;  // 국가유산분류
  bcodeName?: string;  // 국가유산분류2
  mcodeName?: string;  // 국가유산분류3
  scodeName?: string;  // 국가유산분류4
  ccbaQuan?: string;  // 수량
  ccbaAsdt?: string;  // 지정(등록일)
  ccbaLcad?: string;  // 소재지 상세
  ccceName?: string;  // 시대
  content?: string;  // 내용

  // 이미지 정보
  imageUrl?: string;  // 메인노출이미지URL
  imageNuri?: string;  // 공공누리 유형
  ccimDesc?: string;  // 이미지설명
}

export interface PaginationInfo {
  totalCnt: number;
  pageUnit: number;
  pageIndex: number;
  searchTerm?: string; // 검색어 상태 추가
}


export interface PaginationProps {
  currentPage: number;  // 현재 페이지
  totalCnt: number;  // 총 데이터 수
  pageUnit: number;  // 페이지당 데이터 수
  onPageChange: (newPage: number) => void;
}