export const FileUploadWorkerPromise = (data: any) => {
  const promise = new Promise<any>((resolve, reject) => {
    let worker: Worker;

    try {
      worker = new Worker(new URL("fileUpload.worker", import.meta.url));

      worker.onmessage = async (event) => {
        if (event.data.success) resolve(event.data);
        else reject();

        worker?.terminate();
      };

      worker.postMessage(data);
    } catch (err) {
      reject();

      worker?.terminate();
    }
  });

  return promise;
};
