import { API_BASE_PATH } from "@/utils/constants";

import fetchExtended from "@/utils/fetchExtended";

export type SellCarDataType = {
  makeModel: string;
  name: string;
  email: string;
  phone: string;
  carPhotos: Array<string> | Array<File>;
  folder: string;
};

export const doSellCar = async (data: SellCarDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/sell-car`,
    method: "POST",
    payload: data,
  });

  return res;
};
