// import { API_BASE_PATH } from "@/utils/constants";
// import fetchExtended from "@/utils/fetchExtended";

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type WishlistDataType = {
    carID: number;
  };

export const getWishlistAPI = async () => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/wishlist-get`,
    method: "GET",
  });

  return res;
};

export const postWishlistAPI = async (data:WishlistDataType) => {
    console.log(data)
    const res = await fetchExtended({
      url: `${API_BASE_PATH}/wishlist-add`,
      method: "POST",
      payload: data,
    });
  
    return res;
  };
  
