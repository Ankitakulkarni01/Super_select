import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export const getCarDetails = async (id: string) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/car-details/${id}`,
    method: "GET",
  });

  return res;
};

// id - string but number like
