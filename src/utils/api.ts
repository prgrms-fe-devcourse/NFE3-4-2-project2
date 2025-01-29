import { TourImg, TourDetailInfo } from "@/types/types";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


// 인터페이스 정의
interface HistoricalTourItem {
   title: string; // 관광지 이름
   addr1: string; // 주소
   firstimage?: string; // 대표 이미지 URL
   mapx?: number; // X 좌표 (경도)
   mapy?: number; // Y 좌표 (위도)
   contentid: number; // 콘텐츠 ID
   contenttypeid: number; // 콘텐츠 타입 ID
}

export default class APIConnect {
   static serviceName: string = "GangwonGo";
   private static _tourDefaultURL: string = "http://apis.data.go.kr/B551011/KorService1/";
   private static _backDefaultURL: string = "http://13.209.75.182:5003/";
   private static _tourKey: string = process.env.NEXT_PUBLIC_TOUR_SERVICE_KEY || "";

   private static _tourDefaultOption = {
      MobileOS: "ETC",
      MobileApp: this.serviceName,
      serviceKey: this._tourKey,
      numOfRows: 12,
      _type: "json",
   };

   /**
    * TourAPI에서 지역별 List를 가지고오는 메서드입니다.
    * @param {string} code - 시군구 코드
    * @param {number} page - 불러올 페이지. 기본값은 1입니다.
    * @returns {Array} 인덱스 이미지, 시군구 정보, 제목으로 구성된 12개의 정보 리스트를 반환합니다.
    */
   static async getTourAreaList(code: string, page: number = 1): Promise<string> {
      try {
         const response = await axios.get(this._tourDefaultURL + "areaBasedList1", {
            params: {
               ...this._tourDefaultOption,
               pageNo: page,
               areaCode: 32,
               sigunguCode: code,
               listYN: "Y",
            },
         });
         if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`);
         }
         return response.data.response.body.items.item;
      } catch (err) {
         throw new Error(`Axios 요청이 실패했습니다: ${err}`);
      }
   }
   /**
    * TourAPI에서 지역별 상세정보를 가지고오는 메서드입니다.
    * @param {string} contentId - 콘텐츠 고유 ID
    * @param {number} contentTypeId - 콘텐츠의 Type ID
    * @returns {object} detailCommon, detailIntro, detailInfo 세 가지 오퍼레이션에서 가지고 온 정보를 객체로 묶어 반환합니다.
    */
   static async getTourAreaInfo(contentId: number|string, contentTypeId: number|string = 12): Promise<TourDetailInfo> {
      try {
         const responseCommon = await axios.get(this._tourDefaultURL + "detailCommon1", {
            params: {
               ...this._tourDefaultOption,
               contentId: contentId,
               defaultYN: "Y",
               firstImageYN: "Y",
               areacodeYN: "Y",
               catcodeYN: "Y",
               addrinfoYN: "Y",
               mapinfoYN: "Y",
               overviewYN: "Y",
            },
         });
         const responseIntro = await axios.get(this._tourDefaultURL + "detailIntro1", {
            params: {
               ...this._tourDefaultOption,
               contentId: contentId,
               contentTypeId: contentTypeId,
            },
         });
         const responseInfo = await axios.get(this._tourDefaultURL + "detailInfo1", {
            params: {
               ...this._tourDefaultOption,
               contentId: contentId,
               contentTypeId: contentTypeId,
            },
         });
         if (responseCommon.status !== 200 || responseIntro.status !== 200 || responseInfo.status !== 200) {
            throw new Error(
               `HTTP Error: ${
                  responseCommon.status || responseIntro.status || responseInfo.status
               } - 데이터를 불러오지 못했습니다.`,
            );
         }

         const commonData = responseCommon.data.response.body.items.item[0];
         const introData = responseIntro.data.response.body.items.item[0];
         const infoData = responseInfo.data.response.body.items.item || {};

         return {
            contentid : commonData.contentid,
            cat3 : commonData.cat3, 
            title : commonData.title,
            overview : commonData.overview,
            homepage:commonData.homepage || '',
            firstimage:commonData.firstimage || '',
            firstimage2:commonData.firstimage2 || '',
            infocenter:introData.infocenter || '',
            entranceFee:infoData.infotext || '',
            restdate:introData.restdate || '',
            useseason:introData.useseason || '',
            usetime:introData.usetime || '',
            //편의시설
            chkbabycarriage:introData.chkbabycarriage || '', 
            parking:introData.parking,
            extraInfo:infoData,
            //위치
            addr: commonData.addr1,
            mapx:commonData.mapx,
            mapy:commonData.mapy,
         };
      } catch (err) {
         throw new Error(`Axios 요청이 실패했습니다: ${err}`);
      }
   }
   static getTourNatureList() {}
   /**
    * TourAPI에서 축제 정보를 가져오는 메서드입니다.
    * @param {string} eventStartDate - 축제 시작일 (YYYYMMDD 형식, 기본값: '20240101').
    * @param {string} eventEndDate - 축제 종료일 (YYYYMMDD 형식, 기본값: 없음).
    * @param {number} page - 불러올 페이지 (기본값: 1).
    * @param {string} sigunguCode - 시군구 코드 (선택, 기본값: '').
    * @returns {Promise<object[]>} 축제 정보 리스트를 반환합니다.
    */
   static async getFestivalList(
      eventStartDate: string = "20240101",
      eventEndDate?: string,
      page: number = 1,
      sigunguCode: string = "",
   ): Promise<object[]> {
      try {
         // 요청 보내기
         const response = await axios.get(this._tourDefaultURL + "searchFestival1", {
            params: {
               ...this._tourDefaultOption, // 기본 옵션
               eventStartDate,
               eventEndDate,
               pageNo: page,
               areaCode: 32, // 강원도 지역 코드
               sigunguCode,
               listYN: "Y", // 목록 구분
            },
         });

         // 응답 상태 확인
         if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`);
         }

         // 축제 데이터 반환
         return response.data.response.body.items.item || [];
      } catch (err) {
         // 에러 처리
         console.error("getFestivalList 요청 실패:", err);
         throw new Error(`Axios 요청이 실패했습니다: ${err}`);
      }
   }
   /**
    * TourAPI에서 상세 이미지를 가지고 오는 메서드입니다. 음식점 타입의 경우  메뉴 이미지를 불러옵니다.
    * @param {string} contentId - 콘텐츠 고유 ID
    * @returns {Array} 이미지 정보가 담긴 배열을 반환합니다.
    */
   static async getTourImg(contentId: number): Promise<TourImg[]> {
      try {
         const response = await axios.get(this._tourDefaultURL + "detailImage1", {
            params: {
               ...this._tourDefaultOption,
               contentId: contentId,
               imageYN: "Y",
               subImageYN: "Y",
            },
         });
         if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`);
         }
         return response.data.response.body.items.item;
      } catch (err) {
         throw new Error(`Axios 요청이 실패했습니다: ${err}`);
      }
   }

   /**
    * TourAPI에서 역사 관광지 리스트를 가져오는 메서드입니다.
    *
    * @param {number} page - 불러올 페이지 번호. 기본값은 1입니다.
    * @returns {Promise<HistoricalTourItem[]>} - API에서 반환한 역사 관광지 리스트를 반환합니다.
    */
   static async getHistoricalTourList(page: number = 1): Promise<HistoricalTourItem[]> {
    try {
       const response = await axios.get(this._tourDefaultURL + "areaBasedList1", {
          params: {
             ...this._tourDefaultOption,
             pageNo: page,
             areaCode: 32,
             listYN: "Y",
             cat1: "A02", // 대분류: 문화관광
             cat2: "A0201", // 중분류: 역사관광
          },
       });
 
       // 응답 상태 체크
       if (response.status !== 200) {
          throw new Error(`HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`);
       }
 
       // 응답 데이터가 예상대로 구성되어 있는지 확인
       const items: HistoricalTourItem[] = response.data?.response?.body?.items?.item || [];
 
       // 만약 items가 없으면 경고를 출력하고 빈 배열을 반환
       if (!items.length) {
          console.warn("API 응답에 데이터가 없습니다.");
       }
 
       return items;
    } catch (err: unknown) {
       // 에러 처리
       if (axios.isAxiosError(err)) {
          throw new Error(`Axios 요청이 실패했습니다: ${err.message}`);
       } else if (err instanceof Error) {
          throw new Error(`오류가 발생했습니다: ${err.message}`);
       } else {
          throw new Error(`알 수 없는 오류가 발생했습니다.`);
       }
    }
 }
 
}
