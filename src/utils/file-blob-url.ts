// File To URL
export const fileToURL = (data: Blob | File) => {
  try {
    const urlCreator = window.URL || window.webkitURL;
    const url = urlCreator.createObjectURL(data);

    return url;
  } catch (err) {
    return "";
  }
};
//

//
//

// Blob Object Cleanup
export const blobObjectCleanup = (url: string) => {
  try {
    const urlCreator = window.URL || window.webkitURL;
    urlCreator.revokeObjectURL(url);
  } catch (err) {}
};
//
