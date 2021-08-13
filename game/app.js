import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { Engine, Scene, Vector3, ArcRotateCamera, HemisphericLight, MeshBuilder } from '@babylonjs/core';
export default class App {
    constructor() {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.id = 'game';
        document.body.appendChild(canvas);
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);
        const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        const light = new HemisphericLight('light', new Vector3(0.8, 1, 0), scene);
        const sphere = MeshBuilder.CreateSphere('sphere', {
            diameter: 1
        }, scene);
        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            if (e.ctrlKey &&
                e.shiftKey &&
                e.altKey &&
                e.key === 'ˆ') {
                scene.debugLayer.isVisible()
                    ? scene.debugLayer.hide()
                    : scene.debugLayer.show();
            }
        });
        engine.runRenderLoop(() => {
            scene.render();
        });
        window.addEventListener('resize', () => {
            engine.resize();
        });
    }
}
//# sourceMappingURL=app.js.map