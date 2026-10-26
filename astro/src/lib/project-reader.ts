/** A spread is one navigation step, including both panels on narrow screens. */
export function mountProjectReader(root: HTMLElement) {
  const pages = Array.from(root.querySelectorAll<HTMLElement>('[data-reader-page]'));
  const controls = root.querySelector<HTMLElement>('[data-reader-controls]');
  if (!pages.length || !controls) return;
  const previous = root.querySelector<HTMLButtonElement>('[data-reader-previous]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-reader-next]')!;
  const marker = root.querySelector<HTMLElement>('[data-reader-marker]')!;
  const announcement = root.querySelector<HTMLElement>('[data-reader-announcement]')!;
  let current = 0;
  let loading = false;
  const prepare = (index: number) => {
    const images = Array.from(pages[index]?.querySelectorAll<HTMLImageElement>('img') || []);
    images.forEach((image) => { image.loading = 'eager'; });
    return images;
  };
  const busy = () => document.documentElement.hasAttribute('data-book-opening');
  const update = () => {
    previous.disabled = busy() || loading || current === 0;
    next.disabled = busy() || loading || current === pages.length - 1;
    marker.textContent = `${current + 1} / ${pages.length}`;
    announcement.textContent = `Spread ${current + 1} of ${pages.length}`;
  };
  const show = async (index: number) => {
    if (loading || busy() || index < 0 || index >= pages.length || index === current) return;
    loading = true;
    update();
    await Promise.all(prepare(index).map((image) => image.decode().catch(() => {})));
    loading = false;
    if (busy()) { update(); return; }
    pages[current].hidden = true;
    current = index;
    pages[current].hidden = false;
    prepare(current + 1);
    update();
  };
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  const onKey = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"], [role="slider"]'))) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  };
  document.addEventListener('keydown', onKey);
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {attributes: true, attributeFilter: ['data-book-opening']});
  prepare(1);
  controls.hidden = false;
  update();
  // A cached back/forward page retains its reader and keyboard listeners.
  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) {
      observer.disconnect();
      document.removeEventListener('keydown', onKey);
    }
  });
}
