import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mountProjectReader} from '../src/lib/project-reader.ts';

function reader(count) {
  const node = (props = {}) => ({events: {}, ...props,
    addEventListener(name, fn) { this.events[name] = fn; },
    removeEventListener(name) { delete this.events[name]; },
  });
  const pages = Array.from({length: count}, (_, index) => node({hidden: index > 0, querySelectorAll: () => []}));
  const controls = Object.fromEntries(['controls', 'previous', 'next', 'marker', 'announcement']
    .map((key) => [`[data-reader-${key}]`, node()]));
  let opening = false;
  let changed;
  globalThis.Element = class {};
  globalThis.document = node({documentElement: {hasAttribute: () => opening}});
  globalThis.window = node();
  globalThis.MutationObserver = class { constructor(callback) { changed = callback; } observe() {} disconnect() {} };
  mountProjectReader({querySelectorAll: () => pages, querySelector: (selector) => controls[selector]});
  return {pages, controls,
    key(key) { document.events.keydown?.({key, preventDefault() {}}); },
    opening(value) { opening = value; changed?.(); },
  };
}
const settle = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };

test('reader advances by spread, announces position, and never wraps at either end', async () => {
  const r = reader(3);
  assert.equal(r.controls['[data-reader-previous]'].disabled, true);
  r.key('ArrowLeft'); await settle();
  assert.equal(r.controls['[data-reader-marker]'].textContent, '1 / 3');
  r.controls['[data-reader-next]'].events.click(); await settle();
  assert.deepEqual(r.pages.map((page) => page.hidden), [true, false, true]);
  r.key('ArrowRight'); await settle();
  assert.equal(r.controls['[data-reader-announcement]'].textContent, 'Spread 3 of 3');
  assert.equal(r.controls['[data-reader-next]'].disabled, true);
  r.key('ArrowRight'); await settle();
  assert.equal(r.controls['[data-reader-marker]'].textContent, '3 / 3');
  r.key('ArrowLeft'); await settle();
  assert.equal(r.controls['[data-reader-marker]'].textContent, '2 / 3');
});

test('entry/exit locks navigation; single and empty projects have no invalid next step', async () => {
  const r = reader(2);
  r.opening(true);
  assert.equal(r.controls['[data-reader-next]'].disabled, true);
  r.key('ArrowRight'); await settle();
  assert.equal(r.controls['[data-reader-marker]'].textContent, '1 / 2');
  r.opening(false);
  assert.equal(r.controls['[data-reader-next]'].disabled, false);
  const single = reader(1);
  assert.equal(single.controls['[data-reader-previous]'].disabled, true);
  assert.equal(single.controls['[data-reader-next]'].disabled, true);
  assert.doesNotThrow(() => reader(0));
});
