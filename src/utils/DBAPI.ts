import { info } from "console";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default class DBAPI {
    static serviceName: string = "GangwonGo";
    private static _tourDefaultURL: string = "http://apis.data.go.kr/B551011/KorService1/";
    private static _tourKey: string = process.env.NEXT_PUBLIC_TOUR_SERVICE_KEY || "";

    private static _tourDefaultOption = {
        MobileOS: "ETC",
        MobileApp: this.serviceName,
        serviceKey: this._tourKey,
        numOfRows: 10,
        _type: "json",
    };

    static async loadFestivalData(contentId: string | number) {
        try {
            const res = await axios.get(this._tourDefaultURL + "detailIntro1", {
                params: {
                    ...this._tourDefaultOption,
                    contentId: contentId,
                    contentTypeId: "15",
                },
            });

            if (res.status !== 200) {
                console.log(`API 요청 실패: HTTP ${res.status}`);
                return null;
            }

            const infoData = res.data.response.body.items.item;
            if(!infoData[0] || infoData[0].eventstartdate == ""){
                console.log(`${contentId} 데이터에 상세정보 없음.`)
                return {}
            }else{
                return {
                    eventstartdate: infoData[0].eventstartdate,
                    eventenddate: infoData[0].eventenddate,
                };
            }

        } catch (err) {
            console.log("API 실행 중 에러 발생:", err);
            return null;
        }
    }

    static async updateFestivalDate() {
        const params = { contenttypeid: "15" };

        try {
            const DBData = await axios.get("/api/places", { params });
            const festivalList = DBData.data.data; // 응답 데이터에서 실제 리스트 추출
            console.log(`-------------------DB로딩-------------------\n`);
            console.log(`${DBData.data.message}\n`);
            console.log(`DB에서 데이터 ${DBData.data.data.length}개를 읽어왔습니다. \n`);
            console.log(`-------------------DB로딩-------------------\n`);

            if (festivalList && festivalList.length > 0) {

                console.log("🔄️ DB 업데이트 시작...")
                const updatePromises = festivalList.map( async(item) => {
                    
                    const eventDateData = await this.loadFestivalData(item.contentId);

                    if(!eventDateData) return null;
                    const res = await axios.post("/api/places", {
                        contentid : item.contentId,
                        ...eventDateData
                    }, {
                        headers: { "Content-Type": "application/json" },
                    });

                    if(res.data.success == true && (res.data.result.modifiedCount == 1 || res.data.result.upsertedCount == 1)){
                        return true;
                    }
                    return false;
                });

                const results = await Promise.all(updatePromises);
                const successCount = results.filter(Boolean).length;

                console.log(`🔄️ DB 축제 데이터 업데이트 완료. \n 총 ${festivalList.length}개 중 ${successCount}개의 데이터 업데이트`);
            }
        } catch (err) {
            console.log("API 실행 중 에러 발생:", err);
        }
    }
}
