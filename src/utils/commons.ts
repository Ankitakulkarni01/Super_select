// JSON to String
export const jsonToString = (data: Array<any> | Object) => {
  try {
    return JSON.stringify(data);
  } catch (err) {
    return "";
  }
};
//

