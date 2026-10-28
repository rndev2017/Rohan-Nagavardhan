const OPENING_KEY = 'photo-project-opening';
const OPENING_TIMING = {enlarge: 480, settle: 180, turn: 1100, reveal: 420};
const OPENING_DURATION_SCALE = 1.15;
// Preserve the previous closing duration while slowing entry by 15%.
const CLOSING_PLAYBACK_RATE = 0.85 * OPENING_DURATION_SCALE;

function animateOpening(element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) {
  return element.animate(frames, {
    ...options,
    duration: Number(options.duration) * OPENING_DURATION_SCALE,
    delay: Number(options.delay || 0) * OPENING_DURATION_SCALE,
  });
}
const TURN_EASING = 'cubic-bezier(0.42, 0, 0.58, 1)';

export function rememberProjectOpening(event: MouseEvent, link: HTMLAnchorElement) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const book = link.querySelector<HTMLElement>('[data-project-book]') || link.closest('li')?.querySelector<HTMLElement>('[data-project-book]');
  if (!book) return;
  const {left, top, width, height} = book.getBoundingClientRect();
  const cover = book.querySelector<HTMLElement>('[data-book-cover]');
  try {
    sessionStorage.setItem(OPENING_KEY, JSON.stringify({
      path: new URL(link.href).pathname,
      at: Date.now(), left, top, width, height,
      coverTransform: cover ? getComputedStyle(cover).transform : 'none',
    }));
  } catch { /* Storage restrictions leave the normal project link working. */ }
}

export async function openProjectBook() {
  const root = document.documentElement;
  if (!root.hasAttribute('data-book-opening')) return;
  const overlay = document.querySelector<HTMLElement>('[data-opening-book]');
  const spread = document.querySelector<HTMLElement>('[data-opening-spread]');
  const animations: Animation[] = [];
  let completed = false;
  const finish = () => {
    window.removeEventListener('pagehide', finish);
    root.removeAttribute('data-book-opening');
    delete root.dataset.bookOrigin;
    clearTimeout(Number(root.dataset.bookFallback));
    delete root.dataset.bookFallback;
    spread?.style.removeProperty('opacity');
    if (!completed) animations.forEach((animation) => animation.cancel());
  };
  window.addEventListener('pagehide', finish, {once: true});
  if (!overlay || !spread || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }

  try {
    const origin = JSON.parse(root.dataset.bookOrigin || 'null');
    if (!origin || !Number.isFinite(origin.width) || origin.width <= 0) { finish(); return; }
    const stageBounds = spread.getBoundingClientRect();
    if (!stageBounds.width || !stageBounds.height) { finish(); return; }

    await Promise.race([
      Promise.all(Array.from(spread.querySelectorAll('img')).map((image) => image.decode().catch(() => {}))),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]);
    // The hinge belongs to the reader, not to an authored content column.
    // A closed cover occupies the right half; its leaves open into the left.
    // This stays centered for one-column, two-column, and blank first spreads.
    const height = Math.min(stageBounds.height * 0.72, (stageBounds.width / 2) / 0.75);
    const width = height * 0.75;
    const left = stageBounds.left + stageBounds.width / 2;
    const top = stageBounds.top + (stageBounds.height - height) / 2;
    const book = overlay.querySelector<HTMLElement>('[data-project-book]');
    const cover = overlay.querySelector<HTMLElement>('[data-book-cover]');
    if (!book || !cover) { finish(); return; }
    Object.assign(book.style, {height: '100%', aspectRatio: 'auto', perspective: '2600px'});
    Object.assign(overlay.style, {
      left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`,
    });
    const enlarge = animateOpening(overlay, [
      {transform: `translate(${origin.left - left}px, ${origin.top - top}px) scale(${origin.width / width}, ${origin.height / height})`},
      {transform: 'translate(0, 0) scale(1)'},
    ], {duration: OPENING_TIMING.enlarge, easing: 'cubic-bezier(0.22, 0.65, 0.3, 1)', fill: 'both'});
    const closePreview = animateOpening(cover, [
      {transform: origin.coverTransform || 'none'}, {transform: 'rotateY(0deg)'},
    ], {duration: OPENING_TIMING.enlarge, easing: 'ease-out', fill: 'both'});
    animations.push(enlarge, closePreview);
    await enlarge.finished;
    await new Promise((resolve) => setTimeout(resolve, OPENING_TIMING.settle * OPENING_DURATION_SCALE));
    if (!root.hasAttribute('data-book-opening')) { finish(); return; }

    spread.style.opacity = '1';
    animations.push(animateOpening(spread, [{opacity: 0}, {opacity: 1}], {
      delay: 1390, duration: OPENING_TIMING.reveal, easing: 'ease-in-out', fill: 'both',
    }));
    // Decorative cover layers give way to the actual Sanity spread beneath them.
    overlay.querySelectorAll<HTMLElement>('[data-book-leaf], [data-book-back]').forEach((leaf) => {
      animations.push(animateOpening(leaf, [{opacity: 1}, {opacity: 0}], {duration: 240, fill: 'both'}));
    });
    closePreview.cancel();

    // Overlapping sheets create a short riffle, with a slower last leaf that
    // resolves into the real first spread. Paper layers are decorative, not content.
    const sheetCount = 6;
    for (let index = 0; index < sheetCount; index++) {
      const isCover = index === 0;
      const isLast = index === sheetCount - 1;
      const delay = isCover ? 0 : 430 + (index - 1) * 135;
      const duration = isCover ? OPENING_TIMING.turn : isLast ? 930 : 760;
      // Clear earlier leaves before the final reveal. The last sheet loses its
      // material while still turning, rather than landing as a blank card.
      const fadeDelay = isLast ? delay + duration * 0.46 : Math.min(delay + duration * 0.8, 1300);
      const fadeDuration = isLast ? 400 : 180;
      const turningPage = document.createElement('div');
      Object.assign(turningPage.style, {
        position: 'absolute', inset: '0', transformOrigin: 'left center',
        transformStyle: 'preserve-3d', willChange: 'transform',
      });
      const front = isCover ? cover : document.createElement('div');
      const reverse = document.createElement('div');
      for (const [face, back] of [[front, false], [reverse, true]] as const) {
        face.setAttribute('aria-hidden', 'true');
        face.setAttribute('inert', '');
        Object.assign(face.style, {
          position: 'absolute', inset: '0', width: '100%', height: '100%',
          aspectRatio: 'auto', backfaceVisibility: 'hidden',
          transform: `${back ? 'rotateY(180deg) ' : ''}translateZ(0.2px)`,
        });
        if (face !== cover) Object.assign(face.style, {
          background: index % 2 ? '#f4f1e9' : '#f7f4ec',
          border: '1px solid var(--photo-border, #d8d1c5)',
        });
        turningPage.append(face);
      }
      if (!isCover && !isLast) {
        // Four joined strips bend progressively at the free edge. The spine
        // remains fixed; every joint relaxes back to flat before landing.
        front.remove();
        reverse.remove();
        let parent = turningPage;
        for (let strip = 0; strip < 4; strip++) {
          const joint = document.createElement('div');
          Object.assign(joint.style, {
            position: 'absolute', top: '0', height: '100%',
            left: strip ? '100%' : '0', width: strip ? '100%' : '25%',
            transformOrigin: 'left center', transformStyle: 'preserve-3d',
          });
          for (const back of [false, true]) {
            const face = document.createElement('div');
            Object.assign(face.style, {
              position: 'absolute', inset: '0 -0.5px 0 0',
              background: index % 2 ? '#f4f1e9' : '#f7f4ec',
              borderTop: '1px solid #d8d1c5', borderBottom: '1px solid #d8d1c5',
              backfaceVisibility: 'hidden',
              transform: `${back ? 'rotateY(180deg) ' : ''}translateZ(0.2px)`,
            });
            joint.append(face);
            animations.push(animateOpening(face, [{opacity: 1}, {opacity: 0}], {
              delay: fadeDelay, duration: fadeDuration, easing: 'ease-in-out', fill: 'both',
            }));
          }
          parent.append(joint);
          animations.push(animateOpening(joint, [
            {transform: 'rotateY(0deg)'},
            {transform: `rotateY(${strip ? 11 : 0}deg)`, offset: 0.38},
            {transform: `rotateY(${strip ? -3.5 : 0}deg)`, offset: 0.72},
            {transform: 'rotateY(0deg)'},
          ], {delay, duration, easing: 'ease-in-out', fill: 'both'}));
          parent = joint;
        }
      }
      book.append(turningPage);
      // Change stacking only while edge-on: unturned leaves sit underneath,
      // while each newly turned leaf lands above the previous one.
      animations.push(animateOpening(turningPage, [
        {zIndex: sheetCount - index, offset: 0},
        {zIndex: sheetCount - index, offset: 0.499},
        {zIndex: sheetCount + index, offset: 0.5},
        {zIndex: sheetCount + index, offset: 1},
      ], {delay, duration, easing: TURN_EASING, fill: 'both'}));
      const turn = animateOpening(turningPage, [
        {transform: 'rotateY(0deg)'}, {transform: 'rotateY(-180deg)'},
      ], {delay, duration, easing: TURN_EASING, fill: 'both'});
      animations.push(turn);
      // Fade faces separately; parent opacity would flatten the 3D plane.
      for (const face of [front, reverse]) {
        animations.push(animateOpening(face, [{opacity: 1}, {opacity: 0}], {
          delay: fadeDelay, duration: fadeDuration, easing: 'ease-in-out', fill: 'both',
        }));
      }
    }
    await Promise.all(animations.filter((animation) => animation.playState !== 'idle').map((animation) => animation.finished));
    // Retain the exact choreography so returning can play it backwards,
    // including its staggered timings, instead of approximating a second effect.
    const baseline = Number(enlarge.startTime);
    const timeline = animations.filter((animation) => animation.playState !== 'idle').map((animation) => ({
      animation, offset: Number(animation.startTime) - baseline,
      end: Number(animation.effect?.getComputedTiming().endTime || 0),
    }));
    const total = Math.max(...timeline.map(({offset, end}) => offset + end));
    timeline.forEach(({animation, end}) => { animation.pause(); animation.currentTime = end; });
    completed = true;
    finish();
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        closing = false;
        root.removeAttribute('data-book-opening');
        timeline.forEach(({animation, end}) => { animation.currentTime = end; });
      }
    });
    let closing = false;
    document.querySelectorAll<HTMLAnchorElement>('a[href="/photos/projects"]').forEach((link) => {
      link.addEventListener('click', async (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
          matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // Layout may have changed since entry; use ordinary navigation in that case.
        const current = spread.getBoundingClientRect();
        if (Math.abs(current.width - stageBounds.width) > 2 || Math.abs(current.height - stageBounds.height) > 2) return;
        event.preventDefault();
        if (closing) return;
        closing = true;
        overlay.style.top = `${top + current.top - stageBounds.top}px`;
        overlay.style.left = `${left + current.left - stageBounds.left}px`;
        root.setAttribute('data-book-opening', '');
        const started = performance.now();
        const fallback = window.setTimeout(() => location.assign(link.href), total / CLOSING_PLAYBACK_RATE + 1000);
        await new Promise<void>((resolve) => {
          const tick = (now: number) => {
            const time = Math.max(0, total - (now - started) * CLOSING_PLAYBACK_RATE);
            timeline.forEach(({animation, offset, end}) => {
              animation.currentTime = Math.max(0, Math.min(end, time - offset));
            });
            if (time > 0) requestAnimationFrame(tick);
            else resolve();
          };
          requestAnimationFrame(tick);
        });
        clearTimeout(fallback);
        location.assign(link.href);
      });
    });
  } catch {
    finish();
  }
}
