import {
  Engine,
  Scene,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Color4,
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Control
} from "@babylonjs/gui";
import { GameState } from '../store';


const renderGameOverScene = async (canvas: HTMLCanvasElement, engine: Engine, currentScene: Scene, renderNextScene: () => Promise<void>): Promise<any> => {
  console.log('GameOver Scene rendering...');

  engine.displayLoadingUI(); // Display loading UI while the start scene loads
  currentScene.detachControl(); // Detach all event handlers from the current scene

  // --- SCENE SETUP ---
  const thisScene = new Scene(engine);
  thisScene.clearColor = new Color4(0, 0, 0, 1); // Define the color used to clear the render buffer

  // Camera
  const camera: ArcRotateCamera = new ArcRotateCamera(
    'camera',
    Math.PI / 3,
    Math.PI / 3,
    3,
    Vector3.Zero(),
    thisScene
  );
  camera.attachControl(canvas, true);

  // Light
  const light: HemisphericLight = new HemisphericLight(
    'light1',
    new Vector3(0.8, 1, 0),
    thisScene
  );

  // Mesh
  const torus: Mesh = MeshBuilder.CreateTorus(
    'torus',
    {
      diameter: 0.8,
      thickness: 0.4,
      tessellation: 64
    },
    thisScene
  );

  // --- GUI ---
  const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
  guiMenu.idealWidth = window.innerWidth;
  guiMenu.idealHeight = window.innerHeight;

  // Create a simple button to go to the next scene
  const button = Button.CreateSimpleButton('mainMenu', 'MAIN MENU');
  button.width = 0.4;
  button.height = 0.07;
  button.color = '#ffffff';
  button.top = '-10px';
  button.thickness = 0.5;
  button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  button.hoverCursor = 'pointer';
  guiMenu.addControl(button);

  button.onPointerClickObservable.add(() => {
    renderNextScene();
    thisScene.detachControl(); // Disable observables
  });

  // --- SCENE IS LOADED ---
  await thisScene.whenReadyAsync(); // 'whenReadyAsync' returns a promise that resolves when scene is ready
  engine.hideLoadingUI(); // hide the loading UI after scene has loaded
  currentScene.dispose(); // Release all resources held by the existing scene

  return {
    scene: thisScene,
    state: GameState.GAMEOVER
  }
}

export default renderGameOverScene;
