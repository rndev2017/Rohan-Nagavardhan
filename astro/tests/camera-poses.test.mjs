import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createCameraPoses} from '../src/lib/camera-poses.ts';

test('rapid hover reversal uses whole cells and cancels stale movement', (t) => {
  t.mock.timers.enable({apis: ['setTimeout']});
  const frames = [];
  const poses = createCameraPoses(frame => frames.push(frame));
  poses.move(2);
  t.mock.timers.tick(180);
  assert.deepEqual(frames, [1]);
  poses.move(0);
  t.mock.timers.tick(180);
  assert.deepEqual(frames, [1, 0]);
  t.mock.timers.tick(500);
  assert.deepEqual(frames, [1, 0]);
  poses.move(2);
  t.mock.timers.tick(180);
  t.mock.timers.tick(180);
  assert.deepEqual(frames, [1, 0, 1, 2]);
  poses.cancel();
});

test('entrance handoff snaps to a complete cell before changing direction', (t) => {
  t.mock.timers.enable({apis: ['setTimeout']});
  const frames = [];
  const poses = createCameraPoses(frame => frames.push(frame));
  poses.adopt(50);
  poses.move(2);
  t.mock.timers.tick(180);
  assert.deepEqual(frames, [1, 2]);
  poses.move(0);
  poses.cancel();
  t.mock.timers.tick(1000);
  assert.deepEqual(frames, [1, 2]);
});
