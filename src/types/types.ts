export interface ListProps {
   imageUrl: string;
   title: string;
   area: string;
   contentId: number;
   contentTypeId: number;
}

export interface HistoricalTourItem {
   addr1: string;
   firstimage?: string;
   firstimage2?: string;
   title: string;
   contentid: number;
   contenttypeid: number;
}

export interface TourDetailInfo{
   //분류 및 기본정보
   contentid : string,
   cat3 : string, 
   title : string,
   overview : string
   homepage?:string,
   //이미지 정보
   firstimage? :string,
   firstimage2? :string,
   //이용 안내
   infocenter?:string,
   entranceFee?:string,
   restdate?:string,
   useseason?:string,
   usetime?:string,
   //편의시설
   chkbabycarriage? : string,
   parking?:string,
   extraInfo : Array<TourExtraInfo>
   //위치
   mapx:string,
   mapy:string,
   addr:string,
}
export interface TourExtraInfo{
   contentid:string,
   contenttypeid:string,
   serialnum:string,
   infoname:string,
   infotext:string,
}

export interface TourImg {
   contentid:string,
   cpyrhtDivCd:string,
   imgname:string
   originimgurl:string,
   serialnum:string,
   smallimageurl:string,
}

export interface CatList {
   [key:string] : {
      cat1:string,
      cat2:string,
      cat3:string
   }
}

export interface RestaurantDetailInfo {
   contentid: string;
   cat2: string;
   cat3: string;
   title: string;
   addr: string;
   firstimage?: string;
   homepage?: string;
   infocenterfood?: string;  // 문의처
   opentimefood?: string;     // 운영 시간
   restdatefood?: string;     // 휴무일
   parkingfood?: string;      // 주차 가능 여부 및 정보
   firstmenu?: string;        // 대표 메뉴
   treatmenu?: string;        // 제공 메뉴
   overview?: string;         // 음식점 소개
   mapx?: string;             // 경도 (위치 정보)
   mapy?: string;             // 위도 (위치 정보)
   chkcreditcardfood?: string; // 신용카드 사용 여부
   reservationfood?: string;   // 예약 가능 여부
   packing?: string;           // 포장 가능 여부
   kidsfacility?: string;      // 어린이 시설 여부
   smoking?: string;           // 흡연 가능 여부
   scalefood?: string;         // 규모
   lcnsno?: string;            // 사업자 등록번호
   extraInfo?: TourExtraInfo[]; // 추가 정보 (예: 화장실 여부 등)
}

