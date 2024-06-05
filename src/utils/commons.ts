// JSON to String
export const jsonToString = (data: Array<any> | Object) => {
  try {
    return JSON.stringify(data);
  } catch (err) {
    return "";
  }
};
//

// String to JSON
export const stringToJson = (data: string): Array<any> | Object => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};
//

