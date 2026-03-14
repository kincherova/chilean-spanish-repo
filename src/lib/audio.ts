let currentAudio: HTMLAudioElement | null = null;

export function playAudio(url: string, onEnded?: () => void): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.onended = null;
    currentAudio = null;
  }
  const audio = new Audio(url);
  currentAudio = audio;
  audio.play().catch(() => {});
  audio.onended = () => {
    currentAudio = null;
    onEnded?.();
  };
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.onended = null;
    currentAudio = null;
  }
}
