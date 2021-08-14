import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import {
  Engine,
  Scene,
} from '@babylonjs/core';
import { createCanvas } from './utils';
import { GameState } from './store';
import {
  renderStartScene,
  renderCutScene
} from './renderScenes';


export default class App {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _currentState: number = GameState.START;

  constructor(canvasId: string) {
    // CANVAS
    this._canvas = createCanvas(canvasId);

    // ENGINE & SCENE
    this._engine = new Engine(this._canvas, true);
    this._scene = new Scene(this._engine);

    // --- For Development Only ---
    if (process.env.NODE_ENV === 'development') {
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
    }

    this._main();
  }

  // ***** METHODS *****
  // GAME MAIN
  private async _main(): Promise<void> {
    await this._renderStart();

    // Render Engine Loop
    this._engine.runRenderLoop(() => {
      switch (this._currentState) {
        case GameState.START:
          // console.log('START: ', this._currentState);
          this._scene.render();
          break;
        case GameState.CUT:
          // console.log('PAUSE: ', this._currentState);
          this._scene.render();
          break;
        default:
          this._scene.render();
      }
    });

    // Window Resize EvenetListener
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

  // SCENE RENDER LOGIC
  // Start Scene
  private _renderStart = async (): Promise<void> => {
    const { scene, state } = await renderStartScene(this._canvas, this._engine, this._scene, this._renderCut);
    this._scene = scene; // Set the current scene to start scene
    this._currentState = state; // Set the current state to the corresponding state from the GameState enum
  }

  // Cut Scene
  private _renderCut = async (): Promise<void> => {
    const { scene, state } = await renderCutScene(this._canvas, this._engine, this._scene, this._renderStart);
    this._scene = scene; // Set the current scene to cut scene
    this._currentState = state; // Set the current state to the corresponding state from the GameState enum
  }
}
