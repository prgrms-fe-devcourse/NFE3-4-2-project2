import jejuAPI from '../config/axiosJejuConfig';

export async function getPlaceBySearchApi(targetWord, category) {
  const updatedCategory = category === 'all' ? '' : category;
  const result = await jejuAPI.get('', {
    params: {
      ...jejuAPI.defaults.params,
      title: targetWord,
      category: updatedCategory,
    },
  });
  return result;
}

export async function getPlaceByExplanationApi(targetWord) {
  try {
    const response = await jejuAPI.get('', {
      params: {
        ...jejuAPI.defaults.params,
        cid: targetWord,
      },
    });

    return response.data.items[0];
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
}
