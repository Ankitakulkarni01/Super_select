import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";

export const getCarDetails = async (id: string) => {
  console.log("id", id);

  const userId= await AsyncStorage.getItem("userId")
  const addUserid = userId !== null ?  `${API_BASE_PATH}/car-details/${id}?userId=${userId}` :  `${API_BASE_PATH}/car-details/${id}`

  console.log(userId, addUserid);
  
  
  const res = await fetchExtended({
    url: addUserid,
    method: "GET",
  });
  return res;
};

// id - string but number like
