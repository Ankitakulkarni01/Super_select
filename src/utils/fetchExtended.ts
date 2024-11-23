import AsyncStorage from "@react-native-async-storage/async-storage";
import { jsonToString } from "./commons";
import axios from "axios";


export type ApiResponseType = {
  success: boolean;
  message: string;
  data?: any;
  totalPages?: number;
};

// Get Header
export const getHeaders = async (contentType?: string) => {

  const access_token = await AsyncStorage.getItem("access_token")

  const headers = {
    "Content-Type": "application/json",
    authorization: access_token
  };

  if (contentType) headers["Content-Type"] = contentType;

  return headers;
};
//

const fetchExtended = async (fetchdata: {
  url: string;
  method: "GET" | "POST" | "UPDATE" | "DELETE";
  payload?: Array<any> | Object;
  headersContentType?: "application/json" | string;
}): Promise<ApiResponseType> => {


  try {
    
    const req = await axios({
      method: fetchdata.method,
      url: fetchdata.url,
      headers: await getHeaders(),
      data: fetchdata.payload
    });

    const { success, message, data } = await req.data;

    return { success, message, data };
  } catch (err) {
    const res = await err.response.data;
    console.log("errpr",err.response.status)
if(err.response.status === 401){
  console.log("errpr",err.response.status)
  await AsyncStorage.removeItem("access_token")
            await AsyncStorage.removeItem("name")
            await AsyncStorage.removeItem('firebase_token');
            
}
    return {
      success: false,
      message: "Something went wrong, please try again.",
      data: undefined,
    };
  }
};

export default fetchExtended;
