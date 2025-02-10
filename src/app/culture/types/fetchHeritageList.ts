ㅞㅡimport { parseStringPromise } from 'xml2js';

async function fetchImageUrl(ccbaKdcd: string, ccbaAsno: string, ccbaCtcd: string) {
  const API_URL = 'http://www.khs.go.kr/cha/SearchKindOpenapiDt.do';
  const url = `${API_URL}?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`이미지 URL 요청 실패: ${response.statusText}`);

  const xmlText = await response.text();
  const result = await parseStringPromise(xmlText);
  const imageUrl = result?.result?.item?.[0]?.imageUrl?.[0] || '';
  return imageUrl; 
}

export async function fetchHeritageList(pageIndex: number, pageUnit: number, searchQuery?: string) {
  const API_URL = 'http://www.khs.go.kr/cha/SearchKindOpenapiList.do';
  const fullUrl = `${API_URL}?pageIndex=1&pageUnit=5000`;
  const response = await fetch(fullUrl);
  if (!response.ok) throw new Error(`API 요청 실패: ${response.statusText}`);

  const xmlText = await response.text();
  const result = await parseStringPromise(xmlText);
  const items = result.result?.item || [];

  const filteredItems = searchQuery
    ? items.filter((item: any) => item.ccbaMnm1[0].includes(searchQuery))
    : items;

  const itemsWithImages = await Promise.all(
    filteredItems.map(async (item: any) => {
      const ccbaKdcd = item.ccbaKdcd[0];
      const ccbaAsno = item.ccbaAsno[0];
      const ccbaCtcd = item.ccbaCtcd[0];

      const imageUrl = await fetchImageUrl(ccbaKdcd, ccbaAsno, ccbaCtcd);

      return {
        ccbaKdcd,
        ccbaAsno,
        ccbaCtcd,
        ccbaMnm1: item.ccbaMnm1[0],
        ccbaCtcdNm: item.ccbaCtcdNm[0],
        ccsiName: item.ccsiName[0],
        ccmaName: item.ccmaName[0],
        imageUrl,
      };
    })
  );

  return {
    items: itemsWithImages,
    totalCnt: filteredItems.length,
  };
}
