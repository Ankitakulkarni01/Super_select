import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";
import { queryObjectToString } from "../queryObjectToString";

//

const PAGE_LIMIT = 20;

let getFilter = true;

//

export const getCarList = async (
  page: number = 1,
  filters: { [key: string]: string | number } = {}
) => {

  try {
    const query = queryObjectToString({
      page: page,
      limit: PAGE_LIMIT,
      ...filters,
    });

    const res = await fetchExtended({
      url: `${API_BASE_PATH}/car-list?${query}${
        getFilter ? "&getFilter=true" : ""
      }`,
      method: "GET",
    });

    getFilter = false;
    return {
      ...res,
      // nextPageNo: res?.totalPages > page ? page + 1 : undefined,
    };
  } catch (err) {
    return {
      success: true,
      message: "",
      data: null,
      nextPageNo: undefined,
    };
  }
};
