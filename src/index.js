canvasInput = document.getElementById("canvasInput");
canvasOutput = document.getElementById("canvasOutput");

let src = cv.imread('canvasInput');
let dst = new cv.Mat();
// To distinguish the input and output, we graying the image.
// You can try different conversions.
cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
cv.imshow('canvasOutput', dst);
src.delete();
dst.delete();