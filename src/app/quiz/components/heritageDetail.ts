import { parseStringPromise } from "xml2js";

const url = 'http://www.khs.go.kr/cha/SearchKindOpenapiDt.do';

export type heritageDetailedRequest = {
  ccbaKdcd: string	  // 종목코드(필수)
  ccbaAsno:	string	// 관리번호(필수)
  ccbaCtcd:	string	// 시도코드(필수)
}

export type heritageDetailedResponse = {
  ccbaKdcd:	string	  // 종목코드
  ccbaAsno:	string	  // 관리번호
  ccbaCtcd:	string	  // 시도코드
  ccbaCpno:	string	  // 국가유산연계번호
  longitude:	string	// 경도 ( 0일 경우 : 위치 값 없음 )
  latitude:	string	  // 위도 ( 0일 경우 : 위치 값 없음 )
  ccmaName:	string	  // 국가유산종목
  gcodeName:	string	// 국가유산분류
  bcodeName:	string	// 국가유산분류2
  mcodeName:	string	// 국가유산분류3
  scodeName: string	  // 국가유산분류4
  ccbaQuan:	string	  // 수량
  ccbaAsdt:	string	  // 지정(등록일)
  ccbaLcad:	string	  // 소재지 상세
  ccceName:	string	  // 시대
  ccbaPoss:	string	  // 소유자
  ccbaAdmin:	string	// 관리자
  imageUrl:	string	  // 메인노출이미지URL
  content:	string	  // 내용

  ccbaMnm1: string    //국문 이름 : 명세에 없는데 실제 데이터에는 있음
}

export async function getHeritageDetailed(reqObj : heritageDetailedRequest) : Promise<heritageDetailedResponse | null> {
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
  return null;
}
async function interpretValidResponse(text : string) : Promise<heritageDetailedResponse | null> {
  const parsedText = await parseStringPromise(text);
  try{
    const heritageDetail : heritageDetailedResponse = {
      ccbaKdcd	: parsedText.result.ccbaKdcd[0],
      ccbaAsno	: parsedText.result.ccbaAsno[0],
      ccbaCtcd	: parsedText.result.ccbaCtcd[0],
      ccbaCpno	: parsedText.result.ccbaCpno[0],
      longitude	: parsedText.result.longitude[0],
      latitude	: parsedText.result.latitude[0],
      ccmaName	: parsedText.result.item[0].ccmaName[0],
      gcodeName	: parsedText.result.item[0].gcodeName[0],
      bcodeName	: parsedText.result.item[0].bcodeName[0],
      mcodeName	: parsedText.result.item[0].mcodeName[0],
      scodeName	: parsedText.result.item[0].scodeName[0],
      ccbaQuan	: parsedText.result.item[0].ccbaQuan[0],
      ccbaAsdt	: parsedText.result.item[0].ccbaAsdt[0],
      ccbaLcad	: parsedText.result.item[0].ccbaLcad[0],
      ccceName	: parsedText.result.item[0].ccceName[0],
      ccbaPoss	: parsedText.result.item[0].ccbaPoss[0],
      ccbaAdmin	: parsedText.result.item[0].ccbaAdmin[0],
      imageUrl	: parsedText.result.item[0].imageUrl[0],
      content	  : parsedText.result.item[0].content[0],
      ccbaMnm1	  : parsedText.result.item[0].ccbaMnm1[0],
    }
    return heritageDetail;
  }
  catch(e){
    console.log(e);
    return null;
  }
}