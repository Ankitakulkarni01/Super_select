import { API_BASE_PATH } from "../constants";
import fetchExtended from "../fetchExtended";
import { SUPPORTED_IMAGE_MIME_TYPES } from "../supportedFiles";

// Upload S3
const uploadS3 = async (files: File[], folder: string) => {
  const uploadUrls = (
    await fetchExtended({
      url: `${API_BASE_PATH}/get-upload-url?folder=${folder}&numberOfFiles=${files.length}`,
      method: "GET",
    })
  ).data;

  //

  const uploadedFilesUrl: string[] = [];

  for (let i = 0; i < uploadUrls.length; i++) {
    const ele = uploadUrls[i];

    const uploadedRES = await fetch(ele.url, {
      method: "PUT",
      headers: { "Content-Type": SUPPORTED_IMAGE_MIME_TYPES[0] },
      body: files[i],
    });
    if (uploadedRES.status !== 200) throw "";

    uploadedFilesUrl.push(ele.fileName);
  }

  return uploadedFilesUrl;
};
//

//
//

const onMessage = async (event) => {
  // console.log("worker received: ", event.data);

  try {
    const { files } = event.data;

    const timestamp = new Date().getTime().toString();

    postMessage({
      success: true,
      folder: timestamp,
      urls: await uploadS3(files, timestamp),
    });
  } catch (err) {
    postMessage({
      success: false,
      folder: "",
      urls: [],
    });
  }
};

//
//
//

addEventListener("message", onMessage);
