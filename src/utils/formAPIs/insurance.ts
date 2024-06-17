

import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type InsuranceDataType = {
  name: string;
  email: string;
  phone: string;
};

export const doInsurance = async (data: InsuranceDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/insurance`,
    method: "POST",
    payload: data,
  });

  return res;
};
