import { BrowserMultiFormatReader } from "@zxing/browser";

const codeReader = new BrowserMultiFormatReader();

export async function startScanner(videoElement, onResult) {
  // 1. Obtém a câmera traseira (se houver)
  const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
  const selectedDeviceId = videoInputDevices[0].deviceId;

  // 2. Inicia a decodificação contínua
  // O retorno aqui é uma função para parar o scanner
  const controls = await codeReader.decodeFromVideoDevice(
    selectedDeviceId,
    videoElement,
    (result, error) => {
      if (result) {
        onResult(result.getText());
      }
      // Ignoramos NotFoundException para continuar tentando
    }
  );

  return controls;

}

export default startScanner
