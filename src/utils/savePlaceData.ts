const savePlaceData = async (responseItems: any[]) => {
    // responseItems를 순회하면서 각 아이템의 데이터를 맞는 필드에 넣기
    const placeDataArray = responseItems.map((item) => ({
      addr1: item.addr1 || "",
      addr2: item.addr2 || "",
      areacode: item.areacode || "",
      booktour: item.booktour || "",
      cat1: item.cat1 || "",
      cat2: item.cat2 || "",
      cat3: item.cat3 || "",
      contentid: item.contentid || "",
      contenttypeid: item.contenttypeid || "",
      cpyrhtDivCd: item.cpyrhtDivCd || "",
      createdtime: item.createdtime || "",
      firstimage: item.firstimage || "",  // firstimage 확인
      firstimage2: item.firstimage2 || "",
      mapx: item.mapx || "",
      mapy: item.mapy || "",
      mlevel: item.mlevel || "",
      modifiedtime: item.modifiedtime || "",
      sigungucode: item.sigungucode || "",
      tel: item.tel || "",
      title: item.title || "",
      zipcode: item.zipcode || "",
    }));
  
    // 배열의 각 데이터를 API로 전송
    for (const placeData of placeDataArray) {
      // firstimage가 없으면 해당 데이터는 DB에 저장하지 않음
      if (!placeData.firstimage || placeData.firstimage=="") {
        continue; // firstimage가 없으면 해당 데이터를 건너뜁니다.
      }
  
      const response = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(placeData),
      });
  
      const result = await response.json();
      console.log("DB response 결과!!! : ", result);
    }
  };
  
  export default savePlaceData;
  