import jejuAPI from '../config/axiosJejuConfig';
import { calcPage } from '../utils/pagination';

export async function getList(query, itemListLength, pagesLength) {
  try {
    const response = await jejuAPI.get('', {
      params: {
        ...jejuAPI.defaults.params,
        ...query,
      },
    });

    if (response.status !== 200) {
      throw 'state' + response.status;
    }

    let nextData = response.data;

    const nextUpdatePageInfo = calcPage(
      query.page || 0,
      nextData.length,
      itemListLength,
      pagesLength,
    );

    const nextCurrentPageList = nextData.items.slice(
      nextUpdatePageInfo.startItemIndex,
      nextUpdatePageInfo.endItemIndex,
    );

    return { datas: nextData, nextCurrentPageList };
  } catch (error) {
    console.log('search Error' + error);
  }

  return null;
}
