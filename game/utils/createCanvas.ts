const createCanvas = (canvasId: string): HTMLCanvasElement => {
  const canvas = document.createElement('canvas'); // Create canvas element and append to the DOM body
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.backgroundColor = '#1c5697';
  canvas.id = canvasId;
  document.body.appendChild(canvas);

  return canvas;
}

export default createCanvas;
