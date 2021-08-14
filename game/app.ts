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
  renderStoryScene,
  renderGameScene,
  renderGameOverScene,
} from './renderScenes';


export default class App {
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _currentState: number = GameState.START;
  private _gameScene: Scene;

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

    // Run the main game function.
    this._main();
  }

  // ***** METHODS *****
  // GAME MAIN
  private async _main(): Promise<void> {
    await this._renderStart();

    // Render Engine Loop
    this._engine.runRenderLoop(() => {
      switch (this._currentState) {
        default:
          this._scene.render();
      }
    });

    // Window Resize EvenetListener
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

  // SETUP GAME LOGIC -> Pre-create game scene and start loading all game assets
  private _setUpGame = async (): Promise<void> => {
    this._gameScene = new Scene(this._engine);

    //...Load Game Assets
  }

  // SCENE RENDER LOGIC
  // Start Scene
  private _renderStart = async (): Promise<void> => {
    const { scene, state } = await renderStartScene(this._canvas, this._engine, this._scene, this._renderStory);
    this._scene = scene; // Set the current scene to start scene
    this._currentState = state; // Set the current state to the corresponding state from the GameState enum
  }

  // Story Scene
  private _renderStory = async (): Promise<void> => {
    const { scene, state } = await renderStoryScene(this._canvas, this._engine, this._scene, this._renderGame, this._setUpGame);
    this._scene = scene; // Set the current scene to cut scene
    this._currentState = state; // Set the current state to the corresponding state from the GameState enum
  }

  // Game Scene
  private _renderGame = async (): Promise<void> => {
    const { scene, state } = await renderGameScene(this._canvas, this._engine, this._scene, this._renderGameOver);
    this._scene = scene; // Set the current scene to cut scene
    this._currentState = state; // Set the current state to the corresponding state from the GameState enum
  }

  // GameOver Scene
  private _renderGameOver = async (): Promise<void> => {
    const { scene, state } = await renderGameOverScene(this._canvas, this._engine, this._scene, this._renderStart);
    this._scene = scene; // Set the current scene to cut scene
    this._currentState = state; // Set the current state to the corresponding state from the GameState enum
  }
}
