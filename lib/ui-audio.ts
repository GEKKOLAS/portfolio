import type { PortfolioTheme } from "@/lib/portfolio-themes";

export type UISound = "hover" | "navigate" | "activate" | "open" | "close" | "transition" | "reveal" | "arrive";

export type UISoundEngine = {
  /** Call from a trusted pointer/key gesture; nothing is created on page load. */
  unlock: () => Promise<void>;
  setEnabled: (enabled: boolean) => void;
  play: (sound: UISound, theme: PortfolioTheme) => void;
  stop: () => void;
  dispose: () => void;
};

type VoiceSpec = {
  duration: number;
  gain: number;
  delay?: number;
  envelope?: "pluck" | "sustain" | "swell";
  attack?: number;
  release?: number;
};
type Tone = VoiceSpec & {
  frequency: number;
  type?: OscillatorType;
  to?: number;
};
type Noise = VoiceSpec & {
  frequency: number;
  to?: number;
  filter?: BiquadFilterType;
  texture?: "air" | "fire";
  offset?: number;
};
type Cue = { tones: Tone[]; noise?: Noise; noises?: Noise[] };
type ActionSound = Exclude<UISound, "transition" | "reveal" | "arrive">;

// The same action has a distinct timbre in each world: glassy synths,
// muted strings/bells and embers, or short arcade pulses and scratchy hits.
const cues: Record<PortfolioTheme, Record<ActionSound, Cue>> = {
  dark: {
    hover: { tones: [{ frequency: 880, duration: 0.045, gain: 0.045 }, { frequency: 1760, duration: 0.03, gain: 0.01 }] },
    navigate: { tones: [{ frequency: 622.25, to: 932.33, duration: 0.09, gain: 0.065 }, { frequency: 1244.51, duration: 0.08, gain: 0.025, delay: 0.035 }] },
    activate: { tones: [{ frequency: 739.99, duration: 0.065, gain: 0.065 }, { frequency: 1108.73, duration: 0.1, gain: 0.045, delay: 0.035 }] },
    open: { tones: [{ frequency: 220, to: 880, duration: 0.18, gain: 0.08 }, { frequency: 1318.51, duration: 0.18, gain: 0.035, delay: 0.09 }] },
    close: { tones: [{ frequency: 440, to: 180, duration: 0.14, gain: 0.065 }] },
  },
  grimoire: {
    hover: { tones: [{ frequency: 196, duration: 0.06, gain: 0.055, type: "triangle" }, { frequency: 588, duration: 0.04, gain: 0.018 }] },
    navigate: { tones: [{ frequency: 146.83, to: 110, duration: 0.085, gain: 0.075, type: "triangle" }, { frequency: 293.66, duration: 0.12, gain: 0.025 }] },
    activate: { tones: [{ frequency: 220, duration: 0.1, gain: 0.07, type: "triangle" }, { frequency: 330, duration: 0.15, gain: 0.035, delay: 0.035 }] },
    open: { tones: [{ frequency: 110, to: 220, duration: 0.15, gain: 0.07, type: "triangle" }, { frequency: 440, duration: 0.3, gain: 0.04, delay: 0.06 }, { frequency: 1214.4, duration: 0.24, gain: 0.012, delay: 0.06 }] },
    close: { tones: [{ frequency: 146.83, to: 73.42, duration: 0.16, gain: 0.075, type: "triangle" }], noise: { frequency: 900, duration: 0.065, gain: 0.018 } },
  },
  rebel: {
    hover: { tones: [{ frequency: 440, duration: 0.035, gain: 0.028, type: "square" }], noise: { frequency: 2300, duration: 0.02, gain: 0.015 } },
    navigate: { tones: [{ frequency: 233.08, to: 466.16, duration: 0.07, gain: 0.035, type: "square" }, { frequency: 698.46, duration: 0.055, gain: 0.025, type: "square", delay: 0.045 }] },
    activate: { tones: [{ frequency: 349.23, to: 698.46, duration: 0.07, gain: 0.04, type: "square" }], noise: { frequency: 2000, duration: 0.045, gain: 0.03 } },
    open: { tones: [{ frequency: 392, to: 784, duration: 0.11, gain: 0.04, type: "sawtooth" }, { frequency: 1046.5, duration: 0.09, gain: 0.025, type: "square", delay: 0.06 }], noise: { frequency: 1700, duration: 0.07, gain: 0.035 } },
    close: { tones: [{ frequency: 330, to: 110, duration: 0.11, gain: 0.04, type: "sawtooth" }, { frequency: 100, duration: 0.07, gain: 0.035, type: "triangle" }] },
  },
};

const crackles = (count: number, duration: number, intensity: number): Noise[] => Array.from({ length: count }, (_, index) => ({
  frequency: 650 + ((index * 947) % 2600),
  duration: 0.016 + ((index * 7) % 19) / 1000,
  gain: intensity * (0.7 + ((index * 13) % 10) / 20),
  delay: 0.025 + (index / count) * (duration - 0.07),
  offset: (index * 0.037) % 0.4,
  filter: "highpass",
  attack: 0.001,
  release: 0.009,
}));

const slashNoises = (exiting: boolean): Noise[] => Array.from({ length: 6 }, (_, index) => ({
  frequency: exiting ? 1100 + index * 430 : 3300 - index * 330,
  to: exiting ? 4200 : 500,
  duration: exiting ? 0.17 : 0.16,
  gain: 0.56,
  delay: exiting ? 0.08 + index * 0.045 : index * 0.055,
  envelope: "sustain",
  attack: 0.005,
  release: 0.065,
  offset: index * 0.053,
}));

// Covers the entrance and its brief full-screen hold. Reveal is a separate
// sustained cue so slow fire transitions remain audible through both phases.
const phases: Record<PortfolioTheme, Record<"transition" | "reveal" | "arrive", Cue>> = {
  dark: {
    transition: {
      tones: [
        { frequency: 110, to: 740, duration: 0.64, gain: 0.24, envelope: "swell", release: 0.065 },
        { frequency: 220, to: 1320, duration: 0.61, gain: 0.095, type: "triangle", envelope: "swell", release: 0.07 },
        { frequency: 659.25, duration: 0.25, gain: 0.065, delay: 0.16, envelope: "sustain" },
        { frequency: 987.77, duration: 0.25, gain: 0.055, delay: 0.25, envelope: "sustain" },
        { frequency: 1318.51, duration: 0.25, gain: 0.045, delay: 0.34, envelope: "sustain" },
      ],
      noises: [{ frequency: 500, to: 4200, duration: 0.64, gain: 0.5, envelope: "swell", release: 0.07 }],
    },
    reveal: {
      tones: [
        { frequency: 740, to: 180, duration: 0.64, gain: 0.22, envelope: "sustain", release: 0.1 },
        { frequency: 1320, to: 330, duration: 0.6, gain: 0.07, type: "triangle", envelope: "swell", release: 0.12 },
        { frequency: 987.77, duration: 0.24, gain: 0.055, delay: 0.1, envelope: "sustain" },
        { frequency: 1318.51, duration: 0.27, gain: 0.045, delay: 0.2, envelope: "sustain" },
      ],
      noises: [{ frequency: 3300, to: 450, duration: 0.64, gain: 0.52, envelope: "sustain", release: 0.16 }],
    },
    arrive: { tones: [{ frequency: 659.25, duration: 0.2, gain: 0.18 }, { frequency: 987.77, duration: 0.24, gain: 0.12, delay: 0.045 }] },
  },
  grimoire: {
    transition: {
      tones: [
        { frequency: 110, to: 65.4, duration: 1.1, gain: 0.14, type: "triangle", envelope: "swell", release: 0.12 },
        { frequency: 196, duration: 1.05, gain: 0.12, attack: 0.012, release: 0.2 },
        { frequency: 541, duration: 0.95, gain: 0.045, delay: 0.035, attack: 0.008 },
      ],
      noises: [
        { frequency: 3100, to: 1700, filter: "lowpass", texture: "fire", duration: 1.12, gain: 0.8, envelope: "sustain", attack: 0.035, release: 0.13 },
        { frequency: 650, to: 1900, duration: 1.1, gain: 0.38, envelope: "swell", release: 0.12 },
        ...crackles(16, 1.1, 0.5),
      ],
    },
    reveal: {
      tones: [
        { frequency: 82.41, to: 110, duration: 1.3, gain: 0.12, type: "triangle", envelope: "sustain", release: 0.16 },
        { frequency: 293.66, duration: 1.18, gain: 0.1, delay: 0.04, attack: 0.015 },
        { frequency: 810.5, duration: 0.98, gain: 0.035, delay: 0.06 },
      ],
      noises: [
        { frequency: 2600, to: 750, filter: "lowpass", texture: "fire", duration: 1.3, gain: 0.85, envelope: "sustain", attack: 0.03, release: 0.16 },
        { frequency: 550, to: 3200, duration: 1.3, gain: 0.43, envelope: "swell", release: 0.16 },
        ...crackles(20, 1.3, 0.47),
      ],
    },
    arrive: { tones: [{ frequency: 146.83, duration: 0.32, gain: 0.18, attack: 0.008 }, { frequency: 440.49, duration: 0.28, gain: 0.09, delay: 0.025 }] },
  },
  rebel: {
    transition: {
      tones: [
        ...Array.from({ length: 6 }, (_, index): Tone => ({ frequency: 1100 - index * 90, to: 180, duration: 0.095, gain: 0.09, type: "sawtooth", delay: index * 0.055, envelope: "sustain", release: 0.03 })),
        { frequency: 130, to: 52, duration: 0.39, gain: 0.27, type: "triangle", delay: 0.32, envelope: "sustain", release: 0.15 },
        { frequency: 220, duration: 0.48, gain: 0.08, type: "sawtooth", delay: 0.36, release: 0.18 },
      ],
      noises: [
        ...slashNoises(false),
        { frequency: 850, to: 2500, duration: 0.655, gain: 0.3, envelope: "swell", release: 0.08 },
        { frequency: 2000, duration: 0.19, gain: 0.65, delay: 0.33, envelope: "sustain", attack: 0.003, release: 0.1 },
        { frequency: 750, to: 250, duration: 0.7, gain: 0.3, delay: 0.37, envelope: "sustain", attack: 0.01, release: 0.4 },
      ],
    },
    reveal: {
      tones: [
        { frequency: 400, to: 120, duration: 0.665, gain: 0.13, type: "sawtooth", envelope: "sustain", release: 0.12 },
        ...Array.from({ length: 6 }, (_, index): Tone => ({ frequency: 500 + index * 70, to: 180, duration: 0.09, gain: 0.075, type: "square", delay: 0.08 + index * 0.045, release: 0.03 })),
        { frequency: 90, to: 55, duration: 0.155, gain: 0.22, type: "triangle", delay: 0.51, envelope: "sustain", release: 0.08 },
      ],
      noises: [...slashNoises(true), { frequency: 350, to: 3700, duration: 0.665, gain: 0.4, envelope: "swell", release: 0.12 }],
    },
    arrive: { tones: [{ frequency: 523.25, duration: 0.09, gain: 0.12, type: "square" }, { frequency: 783.99, duration: 0.13, gain: 0.09, type: "square", delay: 0.06 }, { frequency: 130.81, duration: 0.12, gain: 0.14, type: "triangle" }] },
  },
};

type Voice = { source: AudioScheduledSourceNode; gain: GainNode; nodes: AudioNode[]; starts: number; stopping: boolean };

export function createUISoundEngine(): UISoundEngine {
  let context: AudioContext | null = null;
  let master: GainNode | null = null;
  let compressor: DynamicsCompressorNode | null = null;
  let limiter: WaveShaperNode | null = null;
  let output: GainNode | null = null;
  let noiseBuffer: AudioBuffer | null = null;
  let fireBuffer: AudioBuffer | null = null;
  let enabled = true;
  let disposed = false;
  let unavailable = false;
  let lastHover = -Infinity;
  let lastAction = -Infinity;
  let priorityUntil = 0;
  const voices = new Set<Voice>();
  const maxVoices = 48;

  const voiceCount = () => {
    let count = 0;
    for (const voice of voices) if (!voice.stopping) count++;
    return count;
  };

  const disconnect = (voice: Voice) => {
    voices.delete(voice);
    voice.source.onended = null;
    voice.nodes.forEach((node) => node.disconnect());
  };

  const stop = () => {
    if (!context) return;
    const now = context.currentTime;
    for (const voice of voices) {
      if (voice.stopping) continue;
      voice.stopping = true;
      try {
        // Also stops notes scheduled in the future. The tiny release avoids a
        // discontinuity when muting an oscillator partway through its wave.
        const envelope = voice.gain.gain;
        if (now < voice.starts) {
          envelope.cancelScheduledValues(now);
          envelope.setValueAtTime(0, now);
        } else if (typeof envelope.cancelAndHoldAtTime === "function") {
          envelope.cancelAndHoldAtTime(now);
        } else {
          const current = envelope.value;
          envelope.cancelScheduledValues(now);
          envelope.setValueAtTime(current, now);
        }
        envelope.linearRampToValueAtTime(0, now + 0.01);
        voice.source.stop(now + 0.012);
      } catch { disconnect(voice); }
    }
    lastHover = -Infinity;
    lastAction = -Infinity;
    priorityUntil = 0;
  };

  const unlock = async () => {
    if (!enabled || disposed || unavailable || typeof window === "undefined") return;
    try {
      if (!context) {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) {
          unavailable = true;
          return;
        }
        context = new AudioContextClass({ latencyHint: "interactive" });
        master = context.createGain();
        // UI envelopes and output gain give a measured 12–16 dB peak boost
        // over the old 0.3 master, with sustained, louder transition layers.
        master.gain.value = 1;
        compressor = context.createDynamicsCompressor();
        compressor.threshold.value = -12;
        compressor.knee.value = 6;
        compressor.ratio.value = 8;
        compressor.attack.value = 0.002;
        compressor.release.value = 0.075;
        limiter = context.createWaveShaper();
        const curve = new Float32Array(4097);
        for (let index = 0; index < curve.length; index++) {
          const sample = index * 2 / (curve.length - 1) - 1;
          curve[index] = 0.55 * Math.tanh(sample / 0.55);
        }
        limiter.curve = curve;
        limiter.oversample = "2x";
        output = context.createGain();
        output.gain.value = 0.74;
        master.connect(compressor);
        compressor.connect(limiter);
        limiter.connect(output);
        output.connect(context.destination);
        noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.5), context.sampleRate);
        const samples = noiseBuffer.getChannelData(0);
        let seed = 41723;
        for (let index = 0; index < samples.length; index++) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          samples[index] = (seed / 4294967296) * 2 - 1;
        }
        fireBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 1.5), context.sampleRate);
        const fire = fireBuffer.getChannelData(0);
        let brown = 0;
        let pop = 0;
        for (let index = 0; index < fire.length; index++) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const white = (seed / 4294967296) * 2 - 1;
          brown = (brown + white * 0.025) / 1.025;
          if ((seed & 2047) < 3) pop = 0.8 + ((seed >>> 12) & 255) / 512;
          pop *= 0.94;
          const flutter = 0.7 + Math.sin(index / context.sampleRate * 31) * 0.12 + Math.sin(index / context.sampleRate * 73) * 0.08;
          fire[index] = (brown * 2.4 + white * (0.16 + pop * 0.65)) * flutter;
        }
      }
      if (context.state !== "running" && context.state !== "closed") await context.resume();
    } catch {
      // Missing audio permission or a suspended background tab must not
      // interrupt navigation. A later trusted gesture may resume the context.
    }
  };

  const addVoice = (source: AudioScheduledSourceNode, spec: VoiceSpec, nodes: AudioNode[], volume: number, offset?: number) => {
    if (!context || !master || voiceCount() >= maxVoices) {
      nodes.forEach((node) => node.disconnect());
      return;
    }
    const gain = context.createGain();
    const starts = context.currentTime + (spec.delay ?? 0);
    const ends = starts + spec.duration;
    const amplitude = spec.gain * volume;
    const envelope = spec.envelope ?? "pluck";
    const attack = Math.min(spec.attack ?? (envelope === "pluck" ? 0.006 : 0.02), spec.duration * 0.25);
    const release = Math.min(spec.release ?? 0.08, spec.duration * 0.45);
    gain.gain.setValueAtTime(0, starts);
    if (envelope === "swell") {
      gain.gain.linearRampToValueAtTime(amplitude * 0.08, starts + attack);
      gain.gain.linearRampToValueAtTime(amplitude, starts + spec.duration * 0.55);
      gain.gain.setValueAtTime(amplitude, ends - release);
      gain.gain.linearRampToValueAtTime(0, ends);
    } else if (envelope === "sustain") {
      gain.gain.linearRampToValueAtTime(amplitude, starts + attack);
      gain.gain.linearRampToValueAtTime(amplitude * 0.82, ends - release);
      gain.gain.linearRampToValueAtTime(0, ends);
    } else {
      gain.gain.linearRampToValueAtTime(amplitude, starts + attack);
      gain.gain.linearRampToValueAtTime(amplitude * 0.8, starts + spec.duration * 0.28);
      gain.gain.exponentialRampToValueAtTime(0.0004, ends);
    }
    gain.gain.setValueAtTime(0, ends + 0.003);
    nodes[nodes.length - 1].connect(gain);
    gain.connect(master);
    const voice: Voice = { source, gain, nodes: [...nodes, gain], starts, stopping: false };
    voices.add(voice);
    source.onended = () => disconnect(voice);
    try {
      if (source instanceof AudioBufferSourceNode && offset !== undefined) source.start(starts, offset);
      else source.start(starts);
      source.stop(ends + 0.008);
    } catch { disconnect(voice); }
  };

  const play = (sound: UISound, theme: PortfolioTheme) => {
    if (!enabled || disposed || !context || context.state !== "running" || !master) return;
    const now = context.currentTime;
    const priority = sound === "transition" || sound === "reveal" || sound === "arrive";
    const cue = priority ? phases[theme]?.[sound] : cues[theme]?.[sound];
    if (!cue) return;
    if (priority) {
      // A phase must never be dropped behind hover notes, a previous cue or
      // the ordinary click throttle. Future grains are cancelled as well.
      stop();
      priorityUntil = now + Math.max(0, ...cue.tones.map((tone) => (tone.delay ?? 0) + tone.duration), ...(cue.noises ?? []).map((noise) => (noise.delay ?? 0) + noise.duration));
    } else if (now < priorityUntil || voiceCount() >= 24) return;
    else if (sound === "hover") {
      if (now - lastHover < 0.08 || now - lastAction < 0.06) return;
      lastHover = now;
    } else {
      if (now - lastAction < 0.045) return;
      lastAction = now;
    }
    const volume = priority ? 1 : theme === "grimoire" ? 1.4 : 1.8;
    try {
      for (const tone of cue.tones) {
        if (voiceCount() >= maxVoices) break;
        const oscillator = context.createOscillator();
        oscillator.type = tone.type ?? "sine";
        const starts = context.currentTime + (tone.delay ?? 0);
        oscillator.frequency.setValueAtTime(tone.frequency, starts);
        if (tone.to) oscillator.frequency.exponentialRampToValueAtTime(tone.to, starts + tone.duration);
        addVoice(oscillator, tone, [oscillator], volume);
      }
      const noises = cue.noise ? [cue.noise, ...(cue.noises ?? [])] : cue.noises ?? [];
      for (const noise of noises) {
        if (!noiseBuffer || voiceCount() >= maxVoices) break;
        const source = context.createBufferSource();
        source.buffer = noise.texture === "fire" ? fireBuffer : noiseBuffer;
        source.loop = true;
        const filter = context.createBiquadFilter();
        filter.type = noise.filter ?? "bandpass";
        const starts = context.currentTime + (noise.delay ?? 0);
        filter.frequency.setValueAtTime(noise.frequency, starts);
        if (noise.to) filter.frequency.exponentialRampToValueAtTime(noise.to, starts + noise.duration);
        filter.Q.value = 0.7;
        source.connect(filter);
        addVoice(source, noise, [source, filter], volume, noise.offset);
      }
    } catch {
      // An interrupted/closed audio device never blocks the UI action.
    }
  };

  const setEnabled = (nextEnabled: boolean) => {
    enabled = nextEnabled;
    if (!enabled) stop();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    stop();
    for (const voice of [...voices]) disconnect(voice);
    master?.disconnect();
    compressor?.disconnect();
    limiter?.disconnect();
    output?.disconnect();
    const previous = context;
    context = null;
    master = null;
    compressor = null;
    limiter = null;
    output = null;
    noiseBuffer = null;
    fireBuffer = null;
    if (previous && previous.state !== "closed") void previous.close().catch(() => {});
  };

  return { unlock, setEnabled, play, stop, dispose };
}
