// import { API_BASE_PATH } from "@/utils/constants";
// import fetchExtended from "@/utils/fetchExtended";

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";


export const getPDF = async () => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/registration-get`,
    method: "GET",
  });

  return res;
};
