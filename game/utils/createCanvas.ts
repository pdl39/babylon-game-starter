const createCanvas = (canvasId: string): HTMLCanvasElement => {
  // Create canvas element and append to the DOM body
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.id = canvasId;
  document.body.appendChild(canvas);

  return canvas;
}

export default createCanvas;
