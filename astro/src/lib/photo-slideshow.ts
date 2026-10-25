import {CameraAudio} from './camera-audio.ts';
import type {CameraBodyType, SoundUrls} from './queries';

export function mountPhotoSlideshow(root: HTMLElement) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  if (!slides.length) return;
  const controls = root.querySelector<HTMLElement>('[data-controls]')!;
  const previous = root.querySelector<HTMLButtonElement>('[data-previous]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const playback = root.querySelector<HTMLButtonElement>('[data-playback]')!;
  const soundControl = root.querySelector<HTMLElement>('[data-sound-control]')!;
  const soundButton = root.querySelector<HTMLButtonElement>('[data-sound]')!;
  const mutedMark = root.querySelector<SVGElement>('[data-sound-muted]')!;
  const indicator = root.querySelector<SVGElement>('[data-sound-indicator]')!;
  const sounds: SoundUrls = JSON.parse(root.dataset.sounds || '{}');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let userPaused = motion.matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  let hovered = canHover && root.matches(':hover');
  const hasKeyboardFocus = () => root.matches(':focus-visible') || Boolean(root.querySelector(':focus-visible'));
  let focused = hasKeyboardFocus();
  let loading = false;
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const body = (index: number) => {
    const value = slides[index].dataset.bodyType;
    return ['rangefinder', 'slr', 'instant'].includes(value || '') ? value as CameraBodyType : undefined;
  };
  const audio = new CameraAudio(sounds, () => body(current), (enabled) => {
    soundButton.setAttribute('aria-pressed', String(enabled));
    const label = enabled ? 'Disable camera sounds' : 'Enable camera sounds';
    soundButton.setAttribute('aria-label', label);
    soundButton.title = label;
    mutedMark.style.display = enabled ? 'none' : '';
    indicator.setAttribute('cx', enabled ? '19' : '13');
  });

  function prepare(index: number) {
    const image = slides[index].querySelector<HTMLImageElement>('img')!;
    if (image.dataset.src) {
      if (image.dataset.srcset) image.srcset = image.dataset.srcset;
      image.src = image.dataset.src;
      delete image.dataset.src;
      delete image.dataset.srcset;
    }
    return image;
  }

  function syncPlayback() {
    clearTimeout(timer);
    playback.textContent = userPaused ? 'play' : 'pause';
    playback.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
    if (slides.length > 1 && !disposed && !userPaused && !hovered && !focused && !document.hidden && !loading) {
      timer = setTimeout(() => { void show(current + 1); }, 10000);
    }
  }

  async function show(index: number, manual = false) {
    if (manual) userPaused = true;
    if (loading || disposed) { syncPlayback(); return; }
    const target = (index + slides.length) % slides.length;
    if (target === current) return;
    loading = true;
    syncPlayback();
    const image = prepare(target);
    try { await image.decode(); } catch {
      // Leave the current photograph visible if a new image cannot be loaded.
      if (!image.naturalWidth) { loading = false; syncPlayback(); return; }
    }
    if (disposed) return;
    // A timer may have fired just before the visitor paused or hid the tab.
    if (!manual && (userPaused || hovered || focused || document.hidden)) {
      loading = false;
      syncPlayback();
      return;
    }
    slides[current].hidden = true;
    current = target;
    slides[current].hidden = false;
    loading = false;
    void audio.play(body(current));
    prepare((current + 1) % slides.length);
    void audio.preload(body((current + 1) % slides.length));
    syncPlayback();
  }

  previous.addEventListener('click', () => { void show(current - 1, true); });
  next.addEventListener('click', () => { void show(current + 1, true); });
  playback.addEventListener('click', () => { userPaused = !userPaused; syncPlayback(); });
  soundButton.addEventListener('click', () => {
    void audio.setEnabled(!audio.enabled).then(() => audio.preload(body((current + 1) % slides.length)));
  });
  root.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      void show(current + (event.key === 'ArrowLeft' ? -1 : 1), true);
    }
  });
  root.addEventListener('mouseenter', () => { hovered = canHover; syncPlayback(); });
  root.addEventListener('mouseleave', () => { hovered = false; syncPlayback(); });
  root.addEventListener('focusin', () => { focused = hasKeyboardFocus(); syncPlayback(); });
  root.addEventListener('focusout', (event) => {
    focused = event.relatedTarget instanceof Element && root.contains(event.relatedTarget) && event.relatedTarget.matches(':focus-visible');
    syncPlayback();
  });
  const onVisibility = () => { if (document.hidden) audio.stop(); syncPlayback(); };
  const onMotion = () => { if (motion.matches) userPaused = true; syncPlayback(); };
  document.addEventListener('visibilitychange', onVisibility);
  motion.addEventListener('change', onMotion);
  window.addEventListener('pagehide', () => {
    disposed = true;
    clearTimeout(timer);
    audio.dispose();
    document.removeEventListener('visibilitychange', onVisibility);
    motion.removeEventListener('change', onMotion);
  }, {once: true});

  controls.hidden = slides.length <= 1;
  soundControl.hidden = typeof AudioContext === 'undefined' || !slides.some((_, index) => {
    const type = body(index);
    return type && sounds[type];
  });
  if (slides.length > 1) prepare(1);
  syncPlayback();
}
