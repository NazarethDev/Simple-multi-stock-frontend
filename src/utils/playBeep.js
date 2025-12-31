// services/audioService.js
export const playBeep = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, context.currentTime); // Frequência do som
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    // O beep dura 150ms
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.15);
    oscillator.stop(context.currentTime + 0.15);
};