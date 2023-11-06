import { API_BASE_PATH } from "@/utils/constants";

import fetchExtended from "@/utils/fetchExtended";

export type CarServiceDataType = {
  serviceType: string;
  makeModel: string;
  name: string;
  email: string;
  phone: string;
  date: string;
};

export const doCarService = async (data: CarServiceDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/car-service`,
    method: "POST",
    payload: data,
  });

  return res;
};
