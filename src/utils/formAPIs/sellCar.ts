import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";


export type SellCarDataType = {
  makeModel: string;
  name: string;
  email: string;
  phone: string;
  carPhotos: Array<string> | Array<File>;
  // folder: string;
};

export const doSellCar = async (data: SellCarDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/sell-car`,
    method: "POST",
    payload: data,
  });

  return res;
};
