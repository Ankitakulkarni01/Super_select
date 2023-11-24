// import { API_BASE_PATH } from "@/utils/constants";
// import fetchExtended from "@/utils/fetchExtended";

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type SendLoginDataType = {
  number: string;
  password:string;
};

export const login = async (data: SendLoginDataType) => {
  console.log(data)
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/login`,
    method: "POST",
    payload: data,
  });
  
  

  return res;
};
