const canvas = document.getElementById('canvas');
let height, width, currentX, currentY, xDirection, yDirection, deg, saturation, level, levelDirection, saturationDirection;

const boxHeight = 50;
const boxWidth = 50;

const ctx = canvas.getContext('2d');

const resetCanvas = () => {
    height = window.innerHeight;
    width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;

    currentX = 1;
    currentY = 1;
    xDirection = 1;
    yDirection = 1;

    ctx.lineWidth = 2;
    deg = 0;
    saturation = 0;
    level = 50;
    levelDirection = 1;
    saturationDirection = 1;
};
resetCanvas();

const r = () => Math.random();
const rt = () => r() > 0.5;

const drawRect = () => {
    currentX += xDirection;
    currentY += yDirection;

    if (currentX + boxWidth >= width) xDirection = -1;
    if (currentX <= 0) xDirection = 1;
    if (currentY + boxHeight >= height) yDirection = -1;
    if (currentY <= 0) yDirection = 1;

    deg += r();

    if (level > 100) levelDirection = -1;
    if (level <= 0) levelDirection = 1;
    level += (levelDirection * r());

    if (saturation > 100) saturationDirection = -1;
    if (saturation <= 0) saturationDirection = 1;
    saturation += (saturationDirection * r());

    ctx.save();
    ctx.beginPath();

    ctx.strokeStyle = `hsl(${deg % 360}, ${saturation}%, ${level}%)`;
    ctx.translate(currentX, currentY);
    ctx.rotate(Math.PI / 180 * deg);
    ctx.rect(0, 0, boxWidth, boxHeight);

    ctx.stroke();
    ctx.restore();
}
drawRect();

const animateThis = () => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.00001)';
    ctx.fillRect(0, 0, width, height);
    drawRect();
}

const animate = new Animate(100);
animate.startAnimation(animateThis);

window.addEventListener('resize', resetCanvas);



