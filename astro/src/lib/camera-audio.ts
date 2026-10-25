import type {CameraBodyType, SoundUrls} from './queries';

/** One opt-in audio context, with recordings shared and cached by asset URL. */
export class CameraAudio {
  enabled = false;
  private context?: AudioContext;
  private gain?: GainNode;
  private source?: AudioBufferSourceNode;
  private buffers = new Map<string, Promise<AudioBuffer>>();
  private generation = 0;

  private sounds: SoundUrls;
  private currentBody: () => CameraBodyType | undefined;
  private onChange: (enabled: boolean) => void;

  constructor(
    sounds: SoundUrls,
    currentBody: () => CameraBodyType | undefined,
    onChange: (enabled: boolean) => void,
  ) {
    this.sounds = sounds;
    this.currentBody = currentBody;
    this.onChange = onChange;
  }

  async setEnabled(enabled: boolean) {
    this.stop();
    this.enabled = enabled;
    this.onChange(enabled);
    if (!enabled) return;
    const generation = this.generation;
    try {
      // Create/resume synchronously in the button's user gesture, before fetching.
      this.context ??= new AudioContext();
      this.gain ??= this.context.createGain();
      this.gain.gain.value = 0.35;
      this.gain.disconnect();
      this.gain.connect(this.context.destination);
      await this.context.resume();
      if (!this.enabled || generation !== this.generation) return;
      if (this.context.state !== 'running') throw new Error('Audio unavailable');
      await this.play(this.currentBody());
    } catch {
      if (generation !== this.generation) return;
      this.enabled = false;
      this.onChange(false);
    }
  }

  private buffer(url: string): Promise<AudioBuffer> {
    let cached = this.buffers.get(url);
    if (!cached) {
      cached = fetch(url).then(async (response) => {
        if (!response.ok) throw new Error('Recording unavailable');
        return this.context!.decodeAudioData(await response.arrayBuffer());
      }).catch((error) => {
        this.buffers.delete(url);
        throw error;
      });
      this.buffers.set(url, cached);
    }
    return cached;
  }

  async preload(body?: CameraBodyType) {
    const url = body && this.sounds[body];
    if (!this.enabled || !this.context || !url) return;
    try { await this.buffer(url); } catch { /* Missing audio never blocks photographs. */ }
  }

  async play(body?: CameraBodyType) {
    this.stop();
    const generation = this.generation;
    const url = body && this.sounds[body];
    if (!this.enabled || !url || !this.context || document.hidden) return;
    try {
      const buffer = await this.buffer(url);
      if (!this.enabled || generation !== this.generation || document.hidden) return;
      if (this.context.state !== 'running') await this.context.resume();
      if (!this.enabled || generation !== this.generation || document.hidden || this.context.state !== 'running') return;
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.gain!);
      source.onended = () => {
        source.disconnect();
        if (this.source === source) this.source = undefined;
      };
      this.source = source;
      source.start();
    } catch { /* Skip unavailable/unsupported recordings and continue silently. */ }
  }

  stop() {
    this.generation++;
    this.source?.stop();
    this.source?.disconnect();
    this.source = undefined;
  }

  dispose() {
    this.enabled = false;
    this.stop();
    void this.context?.close().catch(() => {});
  }
}
