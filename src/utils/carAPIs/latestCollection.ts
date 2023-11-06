import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";
import { queryObjectToString } from "../queryObjectToString";

export const getLatestCollection = async (count: number) => {
  const query = queryObjectToString({ page: 1, limit: count });

  const res = await fetchExtended({
    url: `${API_BASE_PATH}/car-list?${query}`,
    method: "GET",
  });

  return res;
};
