import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

import { Culture, ListProps, Season, Nature } from "@/types/types";
import accommodationList from "@/utils/accommodationList.json";
import cultureList from "@/utils/cultureList.json";
import natureList from "@/utils/natureList.json";
import restaurantList from "@/utils/restaurantList.json";
import seasonList from "@/utils/seasonList.json";

const MONGO_URI = "mongodb://127.0.0.1:27017/gangwonGo";
const DB_NAME = "gangwonGo";

export async function GET(req: Request) {
   try {
      // MongoDB 연결
      const client = await MongoClient.connect(MONGO_URI!);
      const db = client.db(DB_NAME);

      // 쿼리 파라미터 읽어오기
      const url = new URL(req.url);
      const path = req.headers.get("referer") || "없음";
      const cat = url.searchParams.get("cat");
      const filter = url.searchParams.get("filter") || "";
      const detail = url.searchParams.get("detail") || "";
      const month = url.searchParams.get("month") || "";
      const keyword = url.searchParams.get("keyword") || "";
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const pageSize = 12;
      const skip = (page - 1) * pageSize;

      const params: any = {}; // 필터링 조건

      //페이지에 따른 대분류 필터링
      if (path.includes("/explore/festival")) {
         params.contenttypeid = "15";
         if (filter) {
            params.sigungucode = filter;
         }
         if (month) {
            params.$expr = {
               $or: [
                  { $eq: [{ $substr: [{ $toString: "$eventstartdate" }, 4, 2] }, month] },
                  { $eq: [{ $substr: [{ $toString: "$eventenddate" }, 4, 2] }, month] }
               ]
            };
         }
         
      } else if (path.includes("/explore/leisure")) {
         params.contenttypeid = "28";
      } else if (path.includes("/explore/places")) {
         params.contenttypeid = { $in: ["32", "39"] };
      }

      // cat 파라미터에 따른 필터링
      if (cat) {
         switch (cat) {
            case "season": //자연별
               if (["spring", "summer", "autumn", "winter"].includes(filter)) {
                  const selectedFilter = seasonList[filter as Season];
                  const cat3Values = selectedFilter.map((item) => item.cat3);
                  params.cat3 = { $in: cat3Values };
               }
               break;
            case "region": //지역별
               if (filter) {
                  params.sigungucode = filter;
               }
               break;
            case "culture": //문화역사별
               if (["museum", "historic", "religion", "etc"].includes(filter)) {
                  const selectedFilter = cultureList[filter as Culture];
                  const cat3Values = selectedFilter.map((item) => item);
                  params.cat3 = { $in: cat3Values };
               }
               break;
            case "nature":
               if (["ocean", "mountain", "river", "forest"].includes(filter)) {
                  const selectedFilter = natureList[filter as Nature];
                  const cat3Values = selectedFilter.map((item) => item.cat3);
                  params.cat3 = { $in: cat3Values };
               }
               break;
            case "festival":
               params.cat2 = "A0207";
               break;
            case "event":
               params.cat2 = "A0208";
               break;
            case "total": {
               params.cat2 = { $in: ["A0207", "A0208"] };
               break;
            }
            case "restaurants":
               params.contenttypeid = "39";
               if (filter) {
                  params.sigungucode = filter;
               }
               if (["korean", "western", "chinese", "japanese", "cafe", "etc"].includes(detail)) {
                  const selectedFilter = restaurantList.filter((item) => item.type === detail);
                  const cat3Values = selectedFilter.map((item) => item.cat3);
                  params.cat3 = { $in: cat3Values };
               }
               break;
            case "accommodations":
               params.contenttypeid = "32";
               if (filter) {
                  params.sigungucode = filter;
               }
               if (["hotel", "pension", "motel", "inn", "geusthouse", "hanok", "homestay"].includes(detail)) {
                  const selectedFilter = accommodationList.filter((item) => item.type === detail);
                  const cat3Values = selectedFilter.map((item) => item.cat3);
                  params.cat3 = { $in: cat3Values };
               }
               break;
            default:
               break;
         }
      }

      //검색어 필터링
      if (keyword) {
         if(!cat){
            params.$or = [{title: { $regex: keyword, $options: 'i' }}];
            params.contenttypeid = { $in: ["32", "39", "12", "15", "28"] };
         }else{
            params.$or = [
               { title: { $regex: keyword, $options: 'i' } },
               { addr1: { $regex: keyword, $options: 'i' } },
               { addr2: { $regex: keyword, $options: 'i' } }
             ];
         }
      }

      if (path.includes("/add-data")) {
         const contenttypeid = url.searchParams.get("contenttypeid");
         if (contenttypeid) params.contenttypeid = contenttypeid;

         const places = await db.collection("places").find(params).skip(skip).toArray();
         const data = places.map((place) => ({
            contentId: place.contentid,
            contentTypeId: place.contenttypeid,
         }));
         return NextResponse.json({
            success: true,
            data,
            message : `파라미터 : ${JSON.stringify(params)}`
         });

      } else {
         // 전체 아이템 수 구하기
         const totalCount = await db.collection("places").countDocuments(params);
         const totalPages = Math.ceil(totalCount / pageSize);

         // 페이지에 맞는 데이터 가져오기
         const places = await db.collection("places").find(params).skip(skip).limit(pageSize).toArray();
         const data: ListProps[] = places.map((place) => ({
            imageUrl: place.firstimage,
            title: place.title,
            area: place.addr1,
            contentId: place.contentid,
            contentTypeId: place.contenttypeid,
            cat3: place.cat3,
            modifiedtime: place.modifiedtime,
         }));

         let message = `
🔍[API 응답] 검색 파라미터 확인 🔍

API 응답 데이터 개수: ${totalCount}
전체 ${totalPages}p 중 ${page}

`;

         if (params.contenttypeid) {
            message += `콘텐츠 타입 아이디 : ${
               typeof params.contenttypeid === "object"
                  ? Object.values(params.contenttypeid).join(", ")
                  : params.contenttypeid
            } \n`;
         }
         if (params.sigungucode) {
            message += `지역 코드 : ${params.sigungucode} \n`;
         }
         if (params.cat2) {
            message += `중분류(cat2) : ${
               typeof params.cat2 === "object" ? Object.values(params.cat2).join(", ") : params.cat2
            } \n`;
         }
         if (params.cat3) {
            message += `소분류(cat3) : ${
               typeof params.cat3 === "object" ? Object.values(params.cat3).join(", ") : params.cat3
            } \n`;
         }
         if(month){
            message += `날짜 데이터 : ${month}월`
         }

         // 페이지네이션 처리된 결과 반환
         return NextResponse.json({
            success: true,
            data,
            message,
            totalCount,
            totalPages,
            currentPage: page,
         });
      }
   } catch (error) {
      return NextResponse.json({ success: false, error: error }, { status: 500 });
   }
}

export async function POST(req: Request) {
   try {
      // MongoDB 연결
      const client = await MongoClient.connect(MONGO_URI!);
      const db = client.db(DB_NAME);
      const collection = db.collection("places");

      // 요청에서 JSON 데이터 받기
      const data = await req.json();

      // `contentid`를 기준으로 데이터 추가 또는 업데이트 (Upsert)
      const result = await collection.updateOne(
         { contentid: data.contentid }, // contentid가 같은 데이터 찾기
         { $set: data }, // 찾은 데이터 업데이트 (없으면 삽입)
         { upsert: true }, // upsert 옵션: 없으면 새로 추가
      );

      return NextResponse.json({ success: true, result });
   } catch (error) {
      return NextResponse.json({ success: false, error: error }, { status: 500 });
   }
}
