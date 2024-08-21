// import { API_BASE_PATH } from "@/utils/constants";
// import fetchExtended from "@/utils/fetchExtended";

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type SendLoginDataType = {
  name: string;
  number: string;
  password: string;
  otp: number
};

export const Signup = async (data: SendLoginDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/signup`,
    method: "POST",
    payload: data,
  });

  return res;
};
