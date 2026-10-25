import {CameraAudio} from './camera-audio.ts';
import type {CameraBodyType, SoundUrls} from './queries';

export function mountPhotoSlideshow(root: HTMLElement) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  if (!slides.length) return;
  const controls = root.querySelector<HTMLElement>('[data-controls]')!;
  const pauseIndicator = root.querySelector<HTMLElement>('[data-pause-indicator]')!;
  const previous = root.querySelector<HTMLButtonElement>('[data-previous]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const playback = root.querySelector<HTMLButtonElement>('[data-playback]')!;
  const soundControl = root.querySelector<HTMLElement>('[data-sound-control]')!;
  const soundButton = root.querySelector<HTMLButtonElement>('[data-sound]')!;
  const sounds: SoundUrls = JSON.parse(root.dataset.sounds || '{}');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let userPaused = motion.matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  let hoverPaused = false;
  const hasKeyboardFocus = () => root.matches(':focus-visible') || Boolean(root.querySelector(':focus-visible'));
  let focused = hasKeyboardFocus();
  let loading = false;
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const body = (index: number) => {
    const value = slides[index].dataset.bodyType;
    return ['rangefinder', 'slr', 'instant', 'pointAndShoot'].includes(value || '') ? value as CameraBodyType : undefined;
  };
  function updateSoundButton(enabled: boolean) {
    soundButton.setAttribute('aria-pressed', String(enabled));
    const label = enabled ? 'Disable sound' : 'Enable sound';
    soundButton.setAttribute('aria-label', label);
    soundButton.title = label;
    soundButton.textContent = label;
  }
  const audio = new CameraAudio(sounds, () => body(current), updateSoundButton);
  function setHoverPaused(paused: boolean) {
    if (!canHover || hoverPaused === paused) return;
    hoverPaused = paused;
    pauseIndicator.setAttribute('aria-hidden', String(!paused));
    pauseIndicator.style.opacity = paused ? '1' : '0';
    syncPlayback();
  }
  for (const slide of slides) {
    const image = slide.querySelector<HTMLImageElement>('img')!;
    let tiltX = 0;
    let tiltY = 0;
    let liftScale = 1;
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let frame = 0;
    const animateTilt = () => {
      frame = 0;
      tiltX += (targetX - tiltX) * 0.16;
      tiltY += (targetY - tiltY) * 0.16;
      liftScale += (targetScale - liftScale) * 0.16;
      if (Math.abs(targetX - tiltX) < 0.01 && Math.abs(targetY - tiltY) < 0.01 && Math.abs(targetScale - liftScale) < 0.0001) {
        tiltX = targetX;
        tiltY = targetY;
        liftScale = targetScale;
      }
      image.style.setProperty('--photo-tilt-x', `${tiltX.toFixed(2)}deg`);
      image.style.setProperty('--photo-tilt-y', `${tiltY.toFixed(2)}deg`);
      image.style.setProperty('--photo-lift-scale', liftScale.toFixed(4));
      if (tiltX !== targetX || tiltY !== targetY || liftScale !== targetScale) {
        frame = requestAnimationFrame(animateTilt);
      } else if (liftScale === 1) {
        image.removeAttribute('data-tilting');
      }
    };
    const startTiltAnimation = () => {
      if (!frame) frame = requestAnimationFrame(animateTilt);
    };
    image.addEventListener('mouseenter', () => {
      setHoverPaused(true);
      if (canHover && !motion.matches) {
        image.setAttribute('data-tilting', '');
        targetScale = 1.015;
        startTiltAnimation();
      }
    });
    image.addEventListener('pointermove', (event) => {
      if (!canHover || motion.matches || event.pointerType === 'touch') return;
      const bounds = image.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2.4;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2.4;
      startTiltAnimation();
    });
    image.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      targetScale = 1;
      startTiltAnimation();
      setHoverPaused(false);
    });
  }

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
    if (slides.length > 1 && !disposed && !userPaused && !hoverPaused && !focused && !document.hidden && !loading) {
      timer = setTimeout(() => { void show(current + 1); }, 30000);
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
    if (!manual && (userPaused || hoverPaused || focused || document.hidden)) {
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
    void audio.setEnabled(!audio.enabled, false).then(() => audio.preload(body((current + 1) % slides.length)));
  });
  root.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      void show(current + (event.key === 'ArrowLeft' ? -1 : 1), true);
    }
  });
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
