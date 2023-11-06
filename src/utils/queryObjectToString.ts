export const queryObjectToString = (obj: Object) => {
  try {
    const keys = Object.keys(obj);

    const keyValuePairs = keys.map((k) => {
      return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    });

    return keyValuePairs.join("&");
  } catch (err) {
    return "";
  }
};
