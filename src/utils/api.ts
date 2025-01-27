import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export default class APIConnect {

    static serviceName:string = "GangwonGo"
    private static _tourDefaultURL:string = "http://apis.data.go.kr/B551011/KorService1/";
    private static _backDefaultURL:string = "http://13.209.75.182:5003/"
    private static _tourKey:string = process.env.NEXT_PUBLIC_TOUR_SERVICE_KEY || '';
    

    private static _tourDefaultOption = {
        MobileOS:'ETC',
        MobileApp:this.serviceName, 
        serviceKey : this._tourKey,
        numOfRows : 12,
        _type:'json',
    }

    /**
     * TourAPI에서 지역별 List를 가지고오는 메서드입니다.
     * @param {string} code - 시군구 코드
     * @param {number} page - 불러올 페이지. 기본값은 1입니다.
     * @returns {Array} 인덱스 이미지, 시군구 정보, 제목으로 구성된 12개의 정보 리스트를 반환합니다. 
     */
    static async getTourAreaList(code:string, page:number=1):Promise<string>{
        try {
            const response = await axios.get(this._tourDefaultURL + "areaBasedList1", {
              params: {
                ...this._tourDefaultOption,
                pageNo: page,
                areaCode: 32,
                sigunguCode: code,
                listYN: 'Y',
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
     * @returns {Array} detailCommon, detailIntro, detailInfo 세 가지 오퍼레이션에서 가지고 온 정보를 묶어 반환합니다.
     */
    static async getTourAreaInfo(contentId:number, contentTypeId:number):Promise<string>{
      try{
        const responseCommon = await axios.get(this._tourDefaultURL + "detailCommon1",{
          params:{
            ...this._tourDefaultOption,
            contentId : contentId,
            defaultYN : 'Y',
            firstImageYN : 'Y',
            areacodeYN : 'Y',
            catcodeYN : 'Y',
            addrinfoYN : 'Y',
            mapinfoYN : 'Y',
            overviewYN : 'Y',
          }
        })
        const responseIntro = await axios.get(this._tourDefaultURL + "detailIntro1",{
          params:{
            ...this._tourDefaultOption,
            contentId : contentId,
            contentTypeId : contentTypeId
          }
        })
        const responseInfo = await axios.get(this._tourDefaultURL + "detailInfo1",{
          params:{
            ...this._tourDefaultOption,
            contentId : contentId,
            contentTypeId : contentTypeId
          }
        })
        if (responseCommon.status !== 200 || responseIntro.status !== 200 || responseInfo.status !== 200) {
          throw new Error(`HTTP Error: ${responseCommon.status || responseIntro.status || responseInfo.status} - 데이터를 불러오지 못했습니다.`);
        }
        const merged = {
          ...responseCommon.data.response.body.items.item[0],
          ...responseIntro.data.response.body.items.item[0],
          ...responseInfo.data.response.body.items.item[0],
          ...responseInfo.data.response.body.items.item[1] || '',
        }
      return merged;
     }
      catch(err){
        throw new Error(`Axios 요청이 실패했습니다: ${err}`);
      }
    }
    static getTourNatureList(){

    }
}