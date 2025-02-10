import { parseStringPromise } from "xml2js";

const url = 'http://www.khs.go.kr/cha/SearchKindOpenapiList.do';

export type heritageListRequest = {
  ccbaKdcd? : string;    // 지정종목별
  stCcbaAsdt? : number;  // 지정연도 시작
  enCcbaAsdt? : number;  // 지정연도 끝
  ccbaMnm1? : string;    // 국가유산명(국문)
  ccbaCtcd? : string;    // 시도코드
  ccbaLcto? : string;    // 시군구코드 (시도코드 필수)
  ccbaPcd1? : string;    // 시대
  ccbaCpno? : string;    // 국가유산연계번호
  ccbaCncl? : string;    // 지정해제여부
  pageUnit? : number;    // 페이징 처리 시 페이지당 건 수
  pageIndex? : number;   // 조회할 페이지 숫자
  stRegDt? : string;     // 최종수정시작일시
  enRegDt? : string;     // 최종수정종료일시시
}
export type heritageListResponse = {
  totalCnt:	number    //	조회된 총 데이터 건 수
  pageUnit:	number    //	페이징 처리 시 페이지당 건 수
  pageIndex:	number  //	조회할 페이지 숫자
  sn:	number          //	순번
  no:	number          //	고유 키값
  ccmaName:	string    //	국가유산종목
  ccbaMnm1:	string    //	국가유산명(국문)
  ccbaMnm2:	string    //	국가유산명(한자)
  ccbaCtcdNm:	string  //	시도명
  ccsiName:	string    //	시군구명
  ccbaAdmin:	string  //	관리자
  ccbaKdcd:	string    //	종목코드
  ccbaCtcd:	string    //	시도코드
  ccbaAsno:	string    //	관리번호
  ccbaCncl:	string    //	지정해제여부
  ccbaCpno:	string    //	국가유산연계번호
  longitude:	string  //	경도 ( 0일 경우 : 위치 값 없음 )
  latitude:	string    //	위도 ( 0일 경우 : 위치 값 없음 )
  regDt:	string      //	최종수정일시
}

export async function getHeritageList(reqObj : heritageListRequest) : Promise<heritageListResponse[]> {
  let queryString = `?`;
  Object.entries(reqObj).forEach(([key, value])=>{
    queryString += `${key}=${value}&`;
  });
  const response = await fetch(url + queryString);
  switch(true){
    case response.status === 200:
      const text = await response.text();
      return await interpretValidResponse(text);
  }
  return [];
}

async function interpretValidResponse(text : string) : Promise<heritageListResponse[]> {
  const parsedText = await parseStringPromise(text);
  const heritageList : heritageListResponse[] = [];
  for(let i = 0; i < parsedText.result.item.length; i++){
    try{
      const typed : heritageListResponse = {
        totalCnt:	parseInt(parsedText.result.totalCnt[0]),
        pageUnit:	parseInt(parsedText.result.pageUnit[0]),
        pageIndex:	parseInt(parsedText.result.pageIndex[0]), 
        sn : parseInt(parsedText.result.item[i].sn[0]),
        no : parseInt(parsedText.result.item[i].no[0]),
        ccmaName : parsedText.result.item[i].ccmaName[0],
        ccbaMnm1 : parsedText.result.item[i].ccbaMnm1[0],
        ccbaMnm2 : parsedText.result.item[i].ccbaMnm2[0],
        ccbaCtcdNm : parsedText.result.item[i].ccbaCtcdNm[0],
        ccsiName : parsedText.result.item[i].ccsiName[0],
        ccbaAdmin : parsedText.result.item[i].ccbaAdmin[0],
        ccbaKdcd : parsedText.result.item[i].ccbaKdcd[0],
        ccbaCtcd : parsedText.result.item[i].ccbaCtcd[0],
        ccbaAsno : parsedText.result.item[i].ccbaAsno[0],
        ccbaCncl : parsedText.result.item[i].ccbaCncl[0],
        ccbaCpno : parsedText.result.item[i].ccbaCpno[0],
        longitude : parsedText.result.item[i].longitude[0],
        latitude : parsedText.result.item[i].latitude[0],
        regDt : parsedText.result.item[i].regDt[0],
      }
      heritageList.push(typed);
    }
    catch(e){
      console.log(e);
    }
  }
  return heritageList;
}