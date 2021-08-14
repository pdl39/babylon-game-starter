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


const renderStoryScene = async (canvas: HTMLCanvasElement, engine: Engine, currentScene: Scene, renderNextScene: () => Promise<void>, setUpGame: () => Promise<void>): Promise<any> => {
  console.log('Cut Scene rendering...');

  engine.displayLoadingUI(); // Display loading UI while the start scene loads
  currentScene.detachControl(); // Detach all event handlers from the current scene

  // --- SCENE SETUP ---
  const thisScene = new Scene(engine);
  thisScene.clearColor = new Color4(0, 0, 0, 1); // Define the color used to clear the render buffer

  // Camera
  const camera: ArcRotateCamera = new ArcRotateCamera(
    'camera',
    Math.PI / 3,
    Math.PI / 2.5,
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
  const sphere: Mesh = MeshBuilder.CreateSphere(
    'sphere',
    {
      diameter: 0.6
    },
    thisScene
  );

  // --- GUI ---
  const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
  guiMenu.idealWidth = window.innerWidth;
  guiMenu.idealHeight = window.innerHeight;

  // Create a simple button to go to the next scene
  const button = Button.CreateSimpleButton('next', 'NEXT');
  button.width = 0.25;
  button.height = 0.07;
  button.color = '#4af2a1';
  button.top = '3%';
  button.left = '-3%';
  button.thickness = 0.5;
  button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  button.hoverCursor = 'pointer';
  guiMenu.addControl(button);

  button.onPointerClickObservable.add(() => {
    renderNextScene();
  });

  // --- SCENE IS LOADED ---
  await thisScene.whenReadyAsync(); // 'whenReadyAsync' returns a promise that resolves when scene is ready
  engine.hideLoadingUI(); // hide the loading UI after scene has loaded
  currentScene.dispose(); // Release all resources held by the existing scene

  let isGameSetupComplete = false;
  await setUpGame().then(() => {
    isGameSetupComplete = true;
  });

  return {
    scene: thisScene,
    state: GameState.STORY
  }
}

export default renderStoryScene;
