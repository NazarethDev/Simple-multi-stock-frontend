import { BrowserMultiFormatReader } from "@zxing/browser";

export default async function getEanCode(videoElement) {
  const codeReader = new BrowserMultiFormatReader();

  return new Promise((resolve, reject) => {
    codeReader.decodeFromConstraints(
      { video: { facingMode: "environment" } },
      videoElement,
      (result, err) => {
        if (result) {
          codeReader.reset();
          resolve(result.getText());
        }

        if (err && err.name !== "NotFoundException") {
          codeReader.reset();
          reject(err);
        }
      }
    );
  });
}

