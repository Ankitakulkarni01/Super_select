// import { API_BASE_PATH } from "@/utils/constants";
// import fetchExtended from "@/utils/fetchExtended";

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type SendOTPDataType = {
  number: string;
  type? : string
};

export const doSendOTP = async (data: SendOTPDataType) => {
  console.log("otp",data)
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/send-otp`,
    method: "POST",
    payload: data,
  });

  return res;
};
