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