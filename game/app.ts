import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import {
  Engine,
  Scene,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder
} from '@babylonjs/core';
import createCanvas from './utils/createCanvas';

enum State {
  START = 0,
  GAME = 1,
  GAMEOVER = 2,
  CUTSCENE = 3
}

export default class App {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _currentState = 0;

  constructor(canvasId: string) {
    // CANVAS ELEMENT
    this._canvas = createCanvas(canvasId);

    // ENGINE & SCENE
    this._engine = new Engine(this._canvas, true);
    this._scene = new Scene(this._engine);

    // CAMERA
    const camera: ArcRotateCamera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      this._scene
    );
    camera.attachControl(this._canvas, true);

    // LIGHT
    const light: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(0.8, 1, 0),
      this._scene
    );

    // MESH
    const sphere: Mesh = MeshBuilder.CreateSphere(
      'sphere',
      {
        diameter: 1
      },
      this._scene
    );

    // INSPECTOR: Show/hide inspector on keyboard shortcut (Ctrl+Shift+alt(option)+i)
    window.addEventListener('keydown', (e) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.altKey &&
        e.key === 'ˆ' // 'i' turns to 'ˆ' with altKey(option on mac)
      ) {
        this._scene.debugLayer.isVisible()
          ? this._scene.debugLayer.hide()
          : this._scene.debugLayer.show();
      }
    });

    // RENDER LOOP
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // Window Resize EvenetListener
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }
}
