import { API_BASE_PATH } from "@/utils/constants";

import fetchExtended from "@/utils/fetchExtended";

export type ReserveNowDataType = {
  name: string;
  email: string;
  phone: string;
  requestPrice: string;
  otp: number;
  carId: number;
  carName: string;
};

export const doReserveNow = async (data: ReserveNowDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/reservation`,
    method: "POST",
    payload: data,
  });

  return res;
};
