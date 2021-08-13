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

export default class App {
  constructor() {
    // Create canvas element and append to the DOM body
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.id = 'game';
    document.body.appendChild(canvas);

    // Initialize Babylonjs Engine & Scene
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // Initialize Camera
    const camera: ArcRotateCamera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    // Initialize Light
    const light: HemisphericLight = new HemisphericLight(
      'light',
      new Vector3(0.8, 1, 0),
      scene
    );

    // Create Mesh
    const sphere: Mesh = MeshBuilder.CreateSphere(
      'sphere',
      {
        diameter: 1
      },
      scene
    );

    // Show/Hide Inspector on keyboard shortcut (Ctrl+Shift+alt(option)+i)
    window.addEventListener('keydown', (e) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.altKey &&
        e.key === 'ˆ' // 'i' turns to 'ˆ' with altKey(option on mac)
      ) {
        scene.debugLayer.isVisible()
          ? scene.debugLayer.hide()
          : scene.debugLayer.show();
      }
    });

    // Run the Engine Render Loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize window
    window.addEventListener('resize', () => {
      engine.resize();
    });
  }
}
