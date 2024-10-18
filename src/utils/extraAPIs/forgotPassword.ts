// import { API_BASE_PATH } from "@/utils/constants";
// import fetchExtended from "@/utils/fetchExtended";

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type SendForgotDataType = {
  number: string;
  password: string;
  otp: number;
  confirmPassword: string
};

export const forgotPassword = async (data: SendForgotDataType) => {
  console.log("data",data)
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/forgotPassword`,
    method: "POST",
    payload: data,
  });

  return res;
};
