import { Color4, Engine, Scene, Vector3, FreeCamera } from "@babylonjs/core"

interface config {
  engine: Engine,
  scene: Scene
}

export const renderStartScene = async (engine: Engine, scene: Scene): Promise<void> => {
  // Display loading UI while scene is loading
  engine.displayLoadingUI();

  // Detach all event handlers from scene
  scene.detachControl();

  const startScene = new Scene(engine);
  startScene.clearColor = new Color4(0, 0, 0, 1);

  const camera = new FreeCamera(
    'camera1',
    new Vector3(0, 5, -10),
    startScene
  );
}
