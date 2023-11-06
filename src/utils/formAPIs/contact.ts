import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export type ContactDataType = {
  name: string;
  email: string;
  subject: string;
  message?: string;
};

export const doContact = async (data: ContactDataType) => {
  const res = await fetchExtended({
    url: `${API_BASE_PATH}/contact-inquiry`,
    method: "POST",
    payload: data,
  });

  return res;
};
