declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera } from 'three';
  import { EventDispatcher } from 'three';
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    enableDamping: boolean;
    dampingFactor: number;
    rotateSpeed: number;
    minDistance: number;
    maxDistance: number;
    target: import('three').Vector3;
    update(): void;
  }
}

declare module 'three/examples/jsm/postprocessing/EffectComposer' {
  import { WebGLRenderer, Scene, Camera } from 'three';
  export class EffectComposer {
    constructor(renderer: WebGLRenderer);
    addPass(pass: any): void;
    setSize(width: number, height: number): void;
    render(): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/postprocessing/RenderPass' {
  import { Scene, Camera } from 'three';
  export class RenderPass {
    constructor(scene: Scene, camera: Camera);
  }
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass' {
  import { Vector2 } from 'three';
  export class UnrealBloomPass {
    constructor(resolution: Vector2, strength?: number, radius?: number, threshold?: number);
    threshold: number;
    strength: number;
    radius: number;
  }
}

declare module 'three/examples/jsm/loaders/RGBELoader' {
  import { Loader, Texture } from 'three';
  export class RGBELoader extends Loader {
    load(url: string, onLoad?: (texture: Texture) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): Texture;
  }
}

declare module 'three/examples/jsm/objects/Lensflare' {
  import { Color, Texture, Object3D } from 'three';
  export class Lensflare extends Object3D {
    addElement(element: LensflareElement): void;
  }
  export class LensflareElement {
    constructor(texture: Texture, size?: number, distance?: number, color?: Color);
  }
}
