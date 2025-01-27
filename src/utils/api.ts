import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default class APIConnect {
  static serviceName: string = "GangwonGo";
  private static _tourDefaultURL: string =
    "http://apis.data.go.kr/B551011/KorService1/";
  private static _backDefaultURL: string = "http://13.209.75.182:5003/";
  private static _tourKey: string =
    process.env.NEXT_PUBLIC_TOUR_SERVICE_KEY || "";

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
  static async getTourAreaList(
    code: string,
    page: number = 1
  ): Promise<string> {
    try {
      const response = await axios.get(
        this._tourDefaultURL + "areaBasedList1",
        {
          params: {
            ...this._tourDefaultOption,
            pageNo: page,
            areaCode: 32,
            sigunguCode: code,
            listYN: "Y",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          `HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`
        );
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
   * @returns {Array} detailCommon, detailIntro, detailInfo 세 가지 오퍼레이션에서 가지고 온 정보를 묶어 반환합니다.
   */
  static async getTourAreaInfo(
    contentId: number,
    contentTypeId: number
  ): Promise<string> {
    try {
      const responseCommon = await axios.get(
        this._tourDefaultURL + "detailCommon1",
        {
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
        }
      );
      const responseIntro = await axios.get(
        this._tourDefaultURL + "detailIntro1",
        {
          params: {
            ...this._tourDefaultOption,
            contentId: contentId,
            contentTypeId: contentTypeId,
          },
        }
      );
      const responseInfo = await axios.get(
        this._tourDefaultURL + "detailInfo1",
        {
          params: {
            ...this._tourDefaultOption,
            contentId: contentId,
            contentTypeId: contentTypeId,
          },
        }
      );
      if (
        responseCommon.status !== 200 ||
        responseIntro.status !== 200 ||
        responseInfo.status !== 200
      ) {
        throw new Error(
          `HTTP Error: ${
            responseCommon.status || responseIntro.status || responseInfo.status
          } - 데이터를 불러오지 못했습니다.`
        );
      }

      const commonData = responseCommon.data.response.body.items.item[0] || {};
      const introData = responseIntro.data.response.body.items.item[0] || {};
      const infoData1 = responseInfo.data.response.body.items.item[0] || {};
      const infoData2 = responseInfo.data.response.body.items.item[1] || {};

      const merged = {
        ...commonData,
        ...introData,
        ...infoData1,
        extraInfo: infoData2, // 추가 정보로 분리
      };
      return merged;
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
    sigunguCode: string = ""
  ): Promise<object[]> {
    try {
      // 요청 보내기
      const response = await axios.get(
        this._tourDefaultURL + "searchFestival1",
        {
          params: {
            ...this._tourDefaultOption, // 기본 옵션
            eventStartDate,
            eventEndDate,
            pageNo: page,
            areaCode: 32, // 강원도 지역 코드
            sigunguCode,
            listYN: "Y", // 목록 구분
          },
        }
      );

      // 응답 상태 확인
      if (response.status !== 200) {
        throw new Error(
          `HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`
        );
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
   * 문화관광지 정보를 가져오는 메서드입니다.
   * @param {string} areaCode - 지역 코드 (예: 32는 강원도)
   * @param {string} contentTypeId - 콘텐츠 타입 ID (예: 12는 문화관광지)
   * @param {string} cat1 - 카테고리 1 코드 (예: A02)
   * @param {string} cat2 - 카테고리 2 코드 (예: A0201)
   * @param {string} cat3 - 카테고리 3 코드 (예: A02010100)
   * @param {number} page - 불러올 페이지 번호 (기본값: 1)
   * @returns {Promise<any[]>} 문화관광지 정보 리스트
   */
  static async getCulturalTourList(
    areaCode: string = "32", // 기본값: 강원도
    contentTypeId: string = "12", // 기본값: 문화관광지
    cat1: string = "A02", // 기본값: 카테고리 1
    cat2: string = "A0201", // 기본값: 카테고리 2
    cat3: string = "A02010100", // 기본값: 카테고리 3
    page: number = 1
  ): Promise<object[]> {
    try {
      const response = await axios.get(
        this._tourDefaultURL + "areaBasedList1",
        {
          params: {
            ...this._tourDefaultOption,
            areaCode: areaCode, // areaCode 값 확인
            contentTypeId: contentTypeId,
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            pageNo: page,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `HTTP Error: ${response.status} - 데이터를 불러오지 못했습니다.`
        );
      }
      return response.data.response.body.items.item || []; // 문화관광지 리스트 반환
    } catch (err) {
      throw new Error(`Axios 요청이 실패했습니다: ${err}`);
    }
  }
}
