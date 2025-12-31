import { BrowserMultiFormatReader } from "@zxing/browser";

const codeReader = new BrowserMultiFormatReader();

export async function startScanner(videoElement, onResult) {
  // 1. Preferir sempre a câmera traseira pelo facingMode em vez de pegar o índice [0]
  // Isso evita pegar a câmera frontal por engano em alguns dispositivos.
  const constraints = {
    video: {
      facingMode: "environment", // Força câmera traseira
      width: { ideal: 1280 },    // Resolução HD ajuda na nitidez das barras
      height: { ideal: 720 },
      // Algumas versões de navegadores aceitam sugestões de foco:
      focusMode: { ideal: "continuous" }
    }
  };

  // 2. Inicia a decodificação
  // Passando 'undefined' no primeiro parâmetro e as constraints no quarto,
  // o ZXing gerencia a melhor câmera disponível que atenda aos requisitos.
  const controls = await codeReader.decodeFromVideoDevice(
    undefined,
    videoElement,
    (result, error) => {
      if (result) {
        onResult(result.getText());
      }
    },
    constraints
  );

  // Tenta ativar o foco automático avançado se o hardware permitir
  const track = videoElement.srcObject?.getVideoTracks()[0];
  if (track && track.getCapabilities) {
    const capabilities = track.getCapabilities();
    if (capabilities.focusMode?.includes("continuous")) {
      track.applyConstraints({
        advanced: [{ focusMode: "continuous" }]
      }).catch(e => console.log("Foco contínuo não suportado", e));
    }
  }

  return controls;
}

export default startScanner;
