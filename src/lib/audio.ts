let currentAudio: HTMLAudioElement | null = null;
const preloadCache = new Map<string, HTMLAudioElement>();
export function speakSpanish(text: string): void {
  if (!window.speechSynthesis) return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.onended = null;
    currentAudio = null;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-419';
  utterance.rate = 0.85;

  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(
    (v) => v.lang.startsWith('es') && (v.lang.includes('419') || v.lang.includes('MX') || v.lang.includes('CL') || v.lang.includes('ES'))
  ) ?? voices.find((v) => v.lang.startsWith('es'));
  if (spanishVoice) utterance.voice = spanishVoice;

  window.speechSynthesis.speak(utterance);
}

export function preloadAudio(url: string): void {
  if (preloadCache.has(url)) return;
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = url;
  preloadCache.set(url, audio);
}

export function playAudio(url: string, onEnded?: () => void): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.onended = null;
    currentAudio = null;
  }

  const cached = preloadCache.get(url);
  const audio = cached ?? new Audio(url);
  if (!cached) {
    audio.preload = 'auto';
  }
  currentAudio = audio;

  audio.onended = () => {
    currentAudio = null;
    onEnded?.();
  };

  if (audio.readyState >= 3) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } else {
    const onCanPlay = () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      if (currentAudio === audio) {
        audio.play().catch(() => {});
      }
    };
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.load();
  }
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.onended = null;
    currentAudio = null;
  }
}
