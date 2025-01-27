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
    static getTourAreaInfo(){

    }
    static getTourNatureList(){

    }
}