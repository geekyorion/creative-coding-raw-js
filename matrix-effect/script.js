const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const otherCharacters = '♔♕♖♗♘♙♚♛♜♝♞♟☀☁❆❅❄♪♫';
const mainCharactersLength = characters.length;
const otherCharactersLength = otherCharacters.length;

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

class MatrixSymbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
        this.text = '';
    }

    draw(context) {
        const isBottom = (this.y * this.fontSize) > (this.canvasHeight - this.fontSize * 5);
        const selectedIndex = ~~(Math.random() * (isBottom ? otherCharactersLength : mainCharactersLength));            
        this.text = (isBottom ? otherCharacters : characters)[selectedIndex];

        context.fillStyle = '#0aff0a';
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 16;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols.push(new MatrixSymbol(i, 0, this.fontSize, this.canvasHeight));
        }
    }

    updateEffect(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);

const animateThis = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${effect.fontSize}px monospace`;
    effect.symbols.forEach(symbol => symbol.draw(ctx));
}

const animate = new Animate(30);
animate.startAnimation(animateThis);

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    effect.updateEffect(width, height);
});
