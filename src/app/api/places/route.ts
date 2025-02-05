import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Culture, ListProps, Season, Nature} from "@/types/types";
import seasonList from "@/utils/seasonList.json";
import cultureList from "@/utils/cultureList.json";
import natureList from "@/utils/natureList.json";
import restaurantList from "@/utils/restaurantList.json";
import accommodationList from "@/utils/accommodationList.json";

const MONGO_URI = "mongodb://127.0.0.1:27017/gangwonGo";
const DB_NAME = "gangwonGo";

export async function GET(req: Request) {
   try {
      // MongoDB 연결
      const client = await MongoClient.connect(MONGO_URI!);
      const db = client.db(DB_NAME);

      // 쿼리 파라미터 읽어오기
      const url = new URL(req.url);
      const path = req.headers.get('referer') || "없음";
      const cat = url.searchParams.get("cat");
      const filter = url.searchParams.get("filter") || "";
      const detail = url.searchParams.get("detail") || "";
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const pageSize = 12;
      const skip = (page - 1) * pageSize;
      
      const params: any = {}; // 필터링 조건

    
      //페이지에 따른 대분류 필터링
      if (path.includes("/explore/festival")) {
        params.contenttypeid = "15"
      } else if (path.includes("/explore/leisure")) {
        params.contenttypeid = "28"
      } else if (path.includes("/explore/places")) {
        params.contenttypeid = {$in:["32", "39"]}
      }

      // cat 파라미터에 따른 필터링
      if (cat) {
         switch (cat) {
            case "season": //자연별
               if (["spring", "summer", "autumn", "winter"].includes(filter)) {
                  const selectedFilter = seasonList[filter as Season];
                  const cat3Values = selectedFilter.map(item => item.cat3);
                  params.cat3 = { $in: cat3Values };
                }
               break;
            case "region": //지역별
              if(filter){params.sigungucode = filter;}
               break;
            case "culture": //문화역사별
               if(["museum", "historic", "religion", "etc"].includes(filter)){
                  const selectedFilter = cultureList[filter as Culture];
                  const cat3Values = selectedFilter.map(item => item);
                  params.cat3 = { $in: cat3Values};
               }
               break;
            case "nature":
               if (["beach", "mountain", "river", "forest"].includes(filter)) {
                  const selectedFilter = natureList[filter as Nature];
                  const cat3Values = selectedFilter.map(item => item.cat3);
                  params.cat3 = { $in: cat3Values };
                }
               break;
            case "festival":
               
               break;
            case "event":
               
               break;
            case "restaurant":
               if(filter){params.sigungucode = filter;}
               if (["korean", "western", "chinese", "japanese", "cafe", "etc"].includes(detail)){
                  const selectedFilter = restaurantList.filter(item => item.type === detail);
                  const cat3Values = selectedFilter.map(item => item.cat3);
                  params.cat3 = { $in: cat3Values };
                }
               break;
            case "accommodation":
               if(filter){params.sigungucode = filter;}
               if (["hotel", "pension", "motel", "inn", "geusthouse", "hanok", "homestay"].includes(detail)) {
                  const selectedFilter = accommodationList.filter(item => item.type === detail);
                  const cat3Values = selectedFilter.map(item => item.cat3);
                  params.cat3 = { $in: cat3Values };
                }
               break;
            default:
               break;
         }
      }

      // 전체 아이템 수 구하기
      const totalCount = await db.collection("places").countDocuments(params);
      const totalPages = Math.ceil(totalCount / pageSize);

      // 페이지에 맞는 데이터 가져오기
      const places = await db.collection("places").find(params).skip(skip).limit(pageSize).toArray();
      const data:ListProps[] = places.map(place => ({
        imageUrl: place.firstimage,
        title: place.title,
        area: place.addr1,
        contentId: place.contentid,
        contentTypeId: place.contenttypeid,
        cat3 : place.cat3
      }));

      const message = `
🔍[API 응답] 검색 파라미터 확인 🔍

콘텐츠 타입 아이디 : ${Object.values(params.contenttypeid) || "없음"},
지역 코드 : ${params.sigungucode || "없음"},
소분류(cat3) : ${JSON.stringify(params.cat3) || "없음"}

API 응답 데이터 개수: ${totalCount}
전체 ${totalPages} 중 ${page} 페이지
         `
      
      // 페이지네이션 처리된 결과 반환
      return NextResponse.json({
         success: true,
         data,
         message,
         totalCount,
         totalPages,
         currentPage: page,
      });
   } catch (error) {
      return NextResponse.json({ success: false, error: error }, { status: 500 });
   }
}
