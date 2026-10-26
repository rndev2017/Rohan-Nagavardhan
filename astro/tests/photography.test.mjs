import {test, beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {CameraAudio} from '../src/lib/camera-audio.ts';
import {mountPhotoSlideshow} from '../src/lib/photo-slideshow.ts';

let requests, sources, contexts;
const settle = async () => { for (let i = 0; i < 15; i++) await Promise.resolve(); };
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return {promise, resolve, reject};
};
class FakeAudioContext {
  state = 'running';
  destination = {};
  constructor() { contexts.push(this); }
  createGain() { return {gain: {value: 1}, connect() {}, disconnect() {}}; }
  resume() { return Promise.resolve(); }
  close() { this.state = 'closed'; return Promise.resolve(); }
  decodeAudioData(data) { return Promise.resolve({data}); }
  createBufferSource() {
    const source = {connect() {}, disconnect() {}, start() { this.started = true; }, stop() { this.stopped = true; }};
    sources.push(source);
    return source;
  }
}
beforeEach(() => {
  requests = []; sources = []; contexts = [];
  globalThis.document = {hidden: false};
  globalThis.AudioContext = FakeAudioContext;
  globalThis.fetch = async (url) => {
    requests.push(url);
    return {ok: true, arrayBuffer: async () => new ArrayBuffer(1)};
  };
});

test('sound is opt-in; film/digital rangefinders share one cached recording', async () => {
  const audio = new CameraAudio({rangefinder: '/rangefinder.mp3'}, () => 'rangefinder', () => {});
  await audio.play('rangefinder');
  await audio.preload('rangefinder');
  assert.equal(requests.length, 0);
  assert.equal(contexts.length, 0);
  await audio.setEnabled(true);
  assert.equal(sources.length, 1);
  assert.ok(sources[0].started);
  await audio.play('rangefinder');
  assert.deepEqual(requests, ['/rangefinder.mp3']);
  assert.ok(sources[0].stopped);
  assert.equal(sources.length, 2);
  audio.dispose();
});

test('changing body category replaces the current sound; missing metadata is silent', async () => {
  const audio = new CameraAudio({slr: '/slr.wav', instant: '/instant.mp3'}, () => 'slr', () => {});
  await audio.setEnabled(true);
  await audio.play('instant');
  assert.ok(sources[0].stopped);
  assert.deepEqual(requests, ['/slr.wav', '/instant.mp3']);
  await audio.play(undefined);
  assert.ok(sources[1].stopped);
  await audio.play('rangefinder');
  assert.equal(sources.length, 2);
  audio.dispose();
});

test('muting during a slow download prevents late playback', async () => {
  const response = deferred();
  globalThis.fetch = () => response.promise;
  const states = [];
  const audio = new CameraAudio({slr: '/slr.mp3'}, () => 'slr', (on) => states.push(on));
  const enabling = audio.setEnabled(true);
  await settle();
  await audio.setEnabled(false);
  response.resolve({ok: true, arrayBuffer: async () => new ArrayBuffer(1)});
  await enabling;
  assert.equal(sources.length, 0);
  assert.equal(audio.enabled, false);
  assert.deepEqual(states, [true, false]);
  audio.dispose();
});

test('a late recording from an earlier image cannot replace the latest image sound', async () => {
  const late = deferred();
  globalThis.fetch = async (url) => url === '/slr.mp3' ? late.promise : {ok: true, arrayBuffer: async () => new ArrayBuffer(1)};
  const audio = new CameraAudio({slr: '/slr.mp3', instant: '/instant.mp3'}, () => undefined, () => {});
  await audio.setEnabled(true);
  const oldPlay = audio.play('slr');
  await audio.play('instant');
  late.resolve({ok: true, arrayBuffer: async () => new ArrayBuffer(1)});
  await oldPlay;
  assert.equal(sources.length, 1);
  assert.ok(sources[0].started);
  audio.dispose();
});

test('failed audio and hidden tabs never start playback', async () => {
  const audio = new CameraAudio({slr: '/missing.mp3'}, () => undefined, () => {});
  await audio.setEnabled(true);
  globalThis.fetch = async () => ({ok: false});
  await audio.play('slr');
  assert.equal(sources.length, 0);
  document.hidden = true;
  await audio.play('slr');
  assert.equal(sources.length, 0);
  audio.dispose();
});

test('browser audio rejection resets the sound button state', async () => {
  globalThis.AudioContext = class extends FakeAudioContext { resume() { return Promise.reject(new Error('NotAllowedError')); } };
  const states = [];
  const audio = new CameraAudio({slr: '/slr.mp3'}, () => 'slr', (on) => states.push(on));
  await audio.setEnabled(true);
  assert.equal(audio.enabled, false);
  assert.deepEqual(states, [true, false]);
  assert.equal(requests.length, 0);
  audio.dispose();
});

function fixture(count, {reduced = false, hover = false, keyboard = false, finePointer = true, sounds = {rangefinder: '/rangefinder.mp3'}} = {}) {
  const node = (props = {}) => ({style: {}, events: {}, ...props,
    addEventListener(type, fn) { this.events[type] = fn; },
    removeEventListener(type) { delete this.events[type]; },
    setAttribute(key, value) { this[key] = value; },
  });
  const images = Array.from({length: count}, (_, i) => node({dataset: i ? {src: `photo-${i}`, srcset: `sources-${i}`} : {}, naturalWidth: 1000, decode: async () => {}}));
  const slides = images.map((image, i) => ({hidden: i !== 0, dataset: {bodyType: i === 1 ? 'slr' : 'rangefinder'}, querySelector: () => image}));
  const selectors = Object.fromEntries(['controls', 'pause-indicator', 'previous', 'next', 'playback', 'sound-control', 'sound'].map((key) => [`[data-${key}]`, node({hidden: true})]));
  const root = node({dataset: {sounds: JSON.stringify(sounds)},
    querySelectorAll: () => slides,
    querySelector: (selector) => selector === ':focus-visible' ? null : selectors[selector],
    matches: (selector) => selector === ':hover' ? hover : keyboard,
    contains: () => false,
  });
  const motion = node({matches: reduced});
  const doc = node({hidden: false});
  const win = node({matchMedia: (query) => query.includes('reduced') ? motion : {matches: finePointer}});
  const timers = new Map(); let timerId = 0;
  const originalTimeout = globalThis.setTimeout, originalClear = globalThis.clearTimeout;
  globalThis.setTimeout = (fn, ms) => { assert.equal(ms, 30000); timers.set(++timerId, fn); return timerId; };
  globalThis.clearTimeout = (id) => timers.delete(id);
  globalThis.document = doc; globalThis.window = win; globalThis.Element = class {};
  mountPhotoSlideshow(root);
  return {root, selectors, slides, images, timers, motion, doc, win,
    async tick() { timers.values().next().value?.(); await settle(); },
    cleanup() { win.events.pagehide?.(); globalThis.setTimeout = originalTimeout; globalThis.clearTimeout = originalClear; },
  };
}

test('empty/single selections, unavailable sounds, and reduced motion need no timers', () => {
  for (const count of [0, 1]) {
    const f = fixture(count);
    assert.equal(f.timers.size, 0);
    f.cleanup();
  }
  const f = fixture(2, {reduced: true, sounds: {}});
  assert.equal(f.timers.size, 0);
  assert.equal(f.selectors['[data-sound-control]'].hidden, true);
  f.cleanup();
});

test('slideshow waits thirty seconds, switches instantly, wraps, and preloads the next photo', async () => {
  const f = fixture(3);
  try {
    assert.equal(f.images[1].src, 'photo-1');
    assert.equal(f.images[2].src, undefined);
    assert.equal(requests.length, 0);
    await f.tick();
    assert.deepEqual(f.slides.map((s) => s.hidden), [true, false, true]);
    assert.equal(f.images[2].src, 'photo-2');
    await f.tick(); await f.tick();
    assert.deepEqual(f.slides.map((s) => s.hidden), [false, true, true]);
    f.root.events.keydown({key: 'ArrowLeft', preventDefault() {}}); await settle();
    assert.deepEqual(f.slides.map((s) => s.hidden), [true, true, false]);
    assert.equal(f.timers.size, 0);
  } finally { f.cleanup(); }
});

test('sound enable arms the next transition silently without pausing touch playback', async () => {
  const f = fixture(2, {finePointer: false, sounds: {rangefinder: '/rangefinder.mp3', slr: '/slr.mp3'}});
  try {
    f.root.events.focusin();
    assert.equal(f.timers.size, 1);
    f.selectors['[data-sound]'].events.click(); await settle();
    assert.equal(f.selectors['[data-sound]']['aria-pressed'], 'true');
    assert.equal(sources.length, 0);
    assert.equal(f.timers.size, 1);
    await f.tick();
    assert.equal(sources.length, 1);
    assert.deepEqual(requests, ['/rangefinder.mp3']);
    delete f.slides[0].dataset.bodyType;
    await f.tick();
    assert.equal(sources.length, 2);
    assert.deepEqual(requests, ['/rangefinder.mp3']);
    f.doc.hidden = true; f.doc.events.visibilitychange();
    assert.equal(f.timers.size, 0);
    assert.ok(sources.at(-1).stopped);
  } finally { f.cleanup(); }
});

test('failed image decoding preserves the current photograph', async () => {
  const f = fixture(2);
  try {
    f.images[1].naturalWidth = 0;
    f.images[1].decode = async () => { throw new Error('image unavailable'); };
    await f.tick();
    assert.deepEqual(f.slides.map((s) => s.hidden), [false, true]);
    assert.equal(f.timers.size, 1);
  } finally { f.cleanup(); }
});


test('visible playback control pauses and resumes without losing keyboard focus', () => {
  const f = fixture(2, {keyboard: true});
  try {
    const button = f.selectors['[data-playback]'];
    assert.equal(f.timers.size, 0);
    assert.equal(button['aria-label'], 'Play slideshow');
    button.events.click();
    assert.equal(f.timers.size, 1);
    assert.equal(button['aria-label'], 'Pause slideshow');
    button.events.click();
    assert.equal(f.timers.size, 0);
    assert.equal(button['aria-label'], 'Play slideshow');
    assert.equal(f.selectors['[data-controls]'].hidden, false);
  } finally { f.cleanup(); }
});

test('hover pause resumes on leave, but never overrides a manual pause', () => {
  const originalFrame = globalThis.requestAnimationFrame;
  globalThis.requestAnimationFrame = () => 1;
  const f = fixture(2);
  try {
    f.images[0].events.mouseenter();
    assert.equal(f.timers.size, 0);
    assert.equal(f.selectors['[data-pause-indicator]'].style.opacity, '1');
    f.images[0].events.mouseleave();
    assert.equal(f.timers.size, 1);
    f.selectors['[data-playback]'].events.click();
    f.images[0].events.mouseenter();
    assert.equal(f.selectors['[data-pause-indicator]'].style.opacity, '0');
    assert.equal(f.selectors['[data-pause-indicator]']['aria-hidden'], 'true');
    f.images[0].events.mouseleave();
    assert.equal(f.timers.size, 0);
  } finally { f.cleanup(); globalThis.requestAnimationFrame = originalFrame; }
});


test('hover label stays hidden when reduced motion or keyboard focus already pauses playback', () => {
  const originalFrame = globalThis.requestAnimationFrame;
  globalThis.requestAnimationFrame = () => 1;
  try {
    for (const options of [{reduced: true}, {keyboard: true}]) {
      const f = fixture(2, options);
      try {
        f.images[0].events.mouseenter();
        assert.equal(f.selectors['[data-pause-indicator]'].style.opacity, '0');
        assert.equal(f.timers.size, 0);
      } finally { f.cleanup(); }
    }
  } finally { globalThis.requestAnimationFrame = originalFrame; }
});
