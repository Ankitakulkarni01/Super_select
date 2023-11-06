import { blobObjectCleanup, fileToURL } from "@/utils/file-blob-url";

export const imageCompression = async (file: File, maxSize = 720) => {
  let w = 0,
    h = 0;
  const url = fileToURL(file);

  const promise = new Promise<File>((resolve, reject) => {
    const img = document.createElement("img");
    img.src = url;

    img.onload = () => {
      w = img.naturalWidth;
      h = img.naturalHeight;

      if (w > h) {
        if (h > maxSize) {
          const ratio = w / h;

          h = maxSize;
          w = Math.round(maxSize * ratio);
        }
      } else {
        if (w > maxSize) {
          const ratio = h / w;

          h = Math.round(maxSize * ratio);
          w = maxSize;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.canvas.toBlob(
        (blob) => {
          const new_file = new File([blob], file.name, {
            type: blob.type,
          });

          blobObjectCleanup(url);
          resolve(new_file);
        },
        file.type,
        0.7
      );
    };

    img.onerror = () => reject();
  });

  try {
    const promised = await promise;
    return promised;
  } catch (err) {
    return;
  }
};
