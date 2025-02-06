export interface ListProps {
   imageUrl: string;
   title: string;
   area: string;
   contentId: number;
   contentTypeId: number;
   cat3?:string;
}

export interface TourItem {
   addr1: string;
   firstimage?: string;
   firstimage2?: string;
   title: string;
   contentid: number;
   contenttypeid: number;
}

export interface TourItemRegion {
   totalLength: string;
   items: TourItem[];
}

export interface TourDetailInfo {
   //분류 및 기본정보
   contentid: string;
   cat1: string;
   cat2: string;
   cat3: string;
   title: string;
   overview: string;
   homepage?: string;
   //이미지 정보
   firstimage?: string;
   firstimage2?: string;
   //이용 안내
   infocenter?: string;
   entranceFee?: string;
   restdate?: string;
   useseason?: string;
   usetime?: string;
   //편의시설
   chkbabycarriage?: string;
   parking?: string;
   extraInfo: Array<TourExtraInfo>;
   //위치
   mapx: string;
   mapy: string;
   addr: string;
}
export interface TourExtraInfo {
   contentid: string;
   contenttypeid: string;
   serialnum: string;
   infoname: string;
   infotext: string;
}

export interface TourImg {
   contentid: string;
   cpyrhtDivCd: string;
   imgname: string;
   originimgurl: string;
   serialnum: string;
   smallimageurl: string;
}

export interface CatList {
   [key: string]: {
      cat1: string;
      cat2: string;
      cat3: string;
   };
}

export interface PlaceItem{
   addr1:string;
   firstimage?: string;
   firstimage2?: string;
   title: string;
   contentid: number;
   contenttypeid: number;
   cat3:string;
}

export interface RestaurantDetailInfo {
   contentid: string;
   cat2: string;
   cat3: string;
   title: string;
   addr: string;
   firstimage?: string;
   homepage?: string;
   infocenterfood?: string; // 문의처
   opentimefood?: string; // 운영 시간
   restdatefood?: string; // 휴무일
   parkingfood?: string; // 주차 가능 여부 및 정보
   firstmenu?: string; // 대표 메뉴
   treatmenu?: string; // 제공 메뉴
   overview?: string; // 음식점 소개
   mapx?: string; // 경도 (위치 정보)
   mapy?: string; // 위도 (위치 정보)
   chkcreditcardfood?: string; // 신용카드 사용 여부
   reservationfood?: string; // 예약 가능 여부
   packing?: string; // 포장 가능 여부
   kidsfacility?: string; // 어린이 시설 여부
   smoking?: string; // 흡연 가능 여부
   scalefood?: string; // 규모
   lcnsno?: string; // 사업자 등록번호
   extraInfo?: TourExtraInfo[]; // 추가 정보 (예: 화장실 여부 등)
}

export interface AccommodationItem {
   cat2: string;
   cat3: string;
   cat3Text?: string | undefined;
   contentid: number;
   title: string;
   addr1: string;
   firstimage?: string;
   firstimage2?: string;
   mapx?: number;
   mapy?: number;
   tel?: string;
}

export interface AccommodationDetailInfo {
   contentid: string;
   cat2: string;
   cat3: string;
   title: string;
   overview: string;
   homepage?: string;
   firstimage?: string;
   firstimage2?: string;
   tel?: string;
   addr: string;
   mapx: string;
   mapy: string;
   checkin?: string;
   checkout?: string;
   parking?: string;
   facilities?: string;
   foodplace?: string;
   scalelodging?: string;
   rooms: AccommodationRoom[];
}

export interface AccommodationRoom {
   roomTitle: string;
   roomSize?: string;
   baseCapacity: number;
   maxCapacity: number;
   priceLow?: string;
   priceHigh?: string;
   amenities: {
      bath: boolean;
      airConditioning: boolean;
      tv: boolean;
      internet: boolean;
      refrigerator: boolean;
      toiletries: boolean;
      hairdryer: boolean;
   };
   images: string[];
}

export type SeasonType = "spring" | "summer" | "autumn" | "winter" | null;

// 식당 데이터 타입
export interface RestaurantInfo {
   contentid: string; // 음식점 고유 ID
   title: string; // 음식점 상호명
   addr1: string; // 주소
   addr2?: string;
   booktour?: string;
   firstimage: string; // 대표 이미지 URL
   areacode: string; // 지역 코드
   cat1: string;
   cat2?: string;
   cat3: string; // 카테고리 (API로 받아온 카테고리 정보)
   cat3Text?: string | undefined; // 텍스트로 수정한 카테고리
   opentimefood?: string; // ✅ 운영 시간 추가
}

export interface RestaurantListResponse {
   totalPages: number;
   restaurants: Restaurant[];
}

//travel 페이지 검색 관련
export interface SelectedParam {
   cat: string | null;
   filter?: string | null;
   page: number;
}

export interface PlaceParam extends SelectedParam{
   detail?:string | null
}

export interface SelectedChildParam {
   selected: SelectedParam;
   changeUrl: (url: SelectedParam) => void;
}

export interface PlaceSelectedChildParam {
   selected: PlaceParam;
   changeUrl: (url: PlaceParam) => void;
}

// 축제 데이터 타입
export interface Festival {
   addr1?: string;
   addr2?: string;
   areacode?: string;
   booktour?: string;
   cat1?: string; // 대분류
   cat2?: string; // 중분류
   cat3?: string; // 소분류
   contentid: string;
   contenttypeid: string;
   cpyrhtDivCd?: string;
   createdtime?: string;
   eventenddate?: string;
   eventstartdate?: string;
   firstimage?: string;
   firstimage2?: string;
   mapx?: string;
   mapy?: string;
   mlevel?: string;
   modifiedtime?: string;
   sigungucode?: string;
   tel?: string;
   title: string;
}

export type Season = "spring" | "summer" | "autumn" | "winter";
export type Culture = "museum" | "historic" | "religion" | "etc";
export type Nature = "ocean" | "mountain" | "river" | "forest";
export type Restaurant = "korean" | "western" | "chinese" | "japanese" | "cafe" | "etc";
export type Accommodtaion = "hotel" | "pension" | "motel" | "inn" | "geusthouse" | "hanok" | "homestay";