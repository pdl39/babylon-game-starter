import {
  Engine,
  Scene,
  Vector3,
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Color3,
  Color4,
  HighlightLayer
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Control
} from "@babylonjs/gui";
import { GameState } from '../store';


const renderGameScene = async (canvas: HTMLCanvasElement, engine: Engine, currentScene: Scene, gameScene: Scene, renderNextScene: () => Promise<void>): Promise<any> => {
  console.log('Game Scene rendering...');

  engine.displayLoadingUI(); // Display loading UI while the start scene loads
  currentScene.detachControl(); // Detach all event handlers from the current scene

  // --- SCENE SETUP ---
  const thisScene = gameScene;
  thisScene.clearColor = new Color4(0, 0, 0, 0.9); // Define the color used to clear the render buffer

  // Camera
  const camera: ArcRotateCamera = new ArcRotateCamera(
    'camera',
    Math.PI / 4,
    Math.PI / 2.5,
    4,
    Vector3.Zero(),
    thisScene
  );
  camera.attachControl(canvas, true);

  // Light
  const light: HemisphericLight = new HemisphericLight(
    'light1',
    new Vector3(-1.5, -1.5, -1),
    thisScene
  );
  light.intensity = 0.7;

  // Mesh
  const capsule: Mesh = MeshBuilder.CreateCapsule(
    'capsule',
    {
      orientation: Vector3.Backward(),
      subdivisions: 6,
      capSubdivisions: 6,
      tessellation: 64,
      radius: 0.3,
      height: 2
    },
    thisScene
  );

  // Mesh Highlight
  const hlCapsule = new HighlightLayer('hlCapsule', thisScene);
  hlCapsule.addMesh(capsule, new Color3(0.11, 0.34, 0.59));

  // --- GUI ---
  const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
  guiMenu.idealWidth = window.innerWidth;
  guiMenu.idealHeight = window.innerHeight;

  // Create a simple button to go to the next scene
  const button = Button.CreateSimpleButton('endGame', 'END GAME');
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
    thisScene.detachControl() // Disable observables
  });

  // --- GAME SCENE IS LOADED ---
  await thisScene.whenReadyAsync(); // 'whenReadyAsync' returns a promise that resolves when scene is ready
  engine.hideLoadingUI(); // hide the loading UI after scene has loaded
  currentScene.dispose(); // Release all resources held by the existing scene

  return {
    scene: thisScene,
    state: GameState.GAME
  }
}

export default renderGameScene;
