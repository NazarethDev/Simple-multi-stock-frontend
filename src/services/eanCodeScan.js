import { BrowserMultiFormatReader } from "@zxing/browser";

export default async function getEanCode(videoElementId = "video") {
  const codeReader = new BrowserMultiFormatReader();

  const devices = await BrowserMultiFormatReader.listVideoInputDevices();
  const backCamera =
    devices.find(d => d.label.toLowerCase().includes("back"))?.deviceId ||
    devices[0]?.deviceId;

  return new Promise((resolve, reject) => {
    codeReader.decodeFromVideoDevice(
      backCamera,
      videoElementId,
      (result, err) => {
        if (result) {
          codeReader.reset(); // para a câmera
          resolve(result.getText()); // STRING
        }

        if (err && !(err.name === "NotFoundException")) {
          codeReader.reset();
          reject(err);
        }
      }
    );
  });
}
