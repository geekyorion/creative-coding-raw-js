const image = new Image();
// variable from other script file
image.src = imageBase64;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const numberOfParticles = 3000;
const particlesArray = [];
const mappedImage = [];

image.onload = () => {
    canvas.height = image.height;
    canvas.width = image.width;
    
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
        const row = [];
        for (let x = 0; x < canvas.width; x++) {
            const red = imageData.data[(y * 4 * imageData.width) + (x * 4)];
            const green = imageData.data[(y * 4 * imageData.width) + (x * 4 + 1)];
            const blue = imageData.data[(y * 4 * imageData.width) + (x * 4 + 2)];
            const brightness = relativeBrightness(red, green, blue);
            row.push(brightness);
        }
        mappedImage.push(row);
    }

    init();
    // Animate a common function to provide a stable framerate
    const animate = new Animate(60);
    animate.startAnimation(animateThis);
}

const relativeBrightness = (r, g, b) => {
    return Math.sqrt((r * r * 0.299) + (g * g * 0.587) + (b * b + 0.114)) / 100;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * 0.5 + 0.5;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
    }
    
    update() {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.speed = mappedImage[this.position1][this.position2];
        let movement = (2.5 - this.speed) + this.velocity;

        this.y += movement;
        if (this.y >= canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        context.beginPath();
        context.fillStyle = "#ffffff";
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}

const init = () => {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle);
    }
}

const animateThis = () => {
    context.globalAlpha = 0.05;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        context.globalAlpha = particlesArray[i].speed;
        particlesArray[i].draw();
    }
}

// audio control started
const audioBtnWrapper = document.querySelector(".audio-btn");
const audio = document.querySelector("audio");
audio.volume = 0.25;

audio.onplay = () => {
    audioBtnWrapper.classList.add('play');
}

audioBtnWrapper.addEventListener('click', () => {
    const isplaying = !audio.paused;
    if (isplaying) {
        audioBtnWrapper.classList.remove("play");
        audioBtnWrapper.classList.add("pause");
        audio.pause();
    } else {
        audioBtnWrapper.classList.add("play");
        audioBtnWrapper.classList.remove("pause");
        audio.play();
    }
});

if (audio.paused) {
    audio.play();
    audioBtnWrapper.classList.add('play');
}


