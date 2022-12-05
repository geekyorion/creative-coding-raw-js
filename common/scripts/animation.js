class Animate {
    constructor(fps = 60) {
        this.animationID = null;
        this.#setFPS(fps);
    }
    
    #setFPS(fps) {
        this.fps = fps;
        this.fpsInterval = 1000 / this.fps;
        this.startTime = performance.now();
        this.currentTime = this.startTime;
    }

    #animate(func) {
        this.currentTime = performance.now();
        const delta = this.currentTime - this.startTime;

        if (delta >= this.fpsInterval) {
            // need to call this function at specified FPS by user
            func();
            this.startTime = this.currentTime;
        }

        // store the animation handler ID so that user can stop the animation
        this.animationID = window.requestAnimationFrame(this.#animate.bind(this, func));
    }

    startAnimation(func) {
        if (typeof func === 'function') {
            this.#animate(func);    
        }
    }

    stopAnimation() {
        if (this.animationID) {
            window.cancelAnimationFrame(this.animationID);
        }
    }
}