import { jsonToString } from "./commons";


export type ApiResponseType = {
  success: boolean;
  message: string;
  data?: any;
  totalPages?: number;
};

const fetchExtended = async (data: {
  url: string;
  method: "GET" | "POST" | "UPDATE" | "DELETE";
  payload?: Array<any> | Object;
  headersContentType?: "application/json" | string;
}): Promise<ApiResponseType> => {
  // console.log("request", data?.payload);

  const body = data?.payload ? jsonToString(data.payload) : null;

  //

  try {
    const request = await fetch(data.url, {
      headers: {
        "Content-Type": data?.headersContentType ?? "application/json",
      },
      method: data.method,
      body,
    });
    const response = await request.json();

    // console.log("response", response);

    return response;
  } catch (err) {
    // console.log("error", err);

    return {
      success: false,
      message: "Something went wrong, please try again.",
      data: undefined,
    };
  }
};

export default fetchExtended;
