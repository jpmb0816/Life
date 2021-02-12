class Engine2 {
    constructor() {
        this.display = new Canvas2(400, 400);
        this.display.canvas.style.width = this.display.canvas.width + 'px';
        this.display.canvas.style.width = this.display.canvas.height + 'px';
        this.lastScale = undefined;
        this.fixDPI();

        document.body.appendChild(this.display.canvas);

        this.lastTime = Tools.getCurrentTimeMillis();
        this.timer = Tools.getCurrentTimeMillis();
        this.updateDeltaTime = 0;

        this.targetUPS = 60;
        this.targetFPS = 60;

        this.updates = 0;
        this.frames = 0;

        this.UPS = 0;
        this.FPS = 0;

        this.updateTime = 1000 / this.targetUPS;
        this.interval = undefined;

        this.keyStates = [];
        this.mouse = new Point2();

        window.addEventListener('keydown', event => this.keyStates[event.keyCode] = true);
        window.addEventListener('keyup', event => this.keyStates[event.keyCode] = false);
        window.addEventListener('mousemove', event => {
            const rect = this.display.canvas.getBoundingClientRect();

            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        });
        window.addEventListener('resize', event => {
            this.fixDPI();
        });

        this.player = new Player(0, 0, 32, 32, 'red');

        this.map = new Map2(10, 10, 32, 32);
        this.map.entities.push(this.player);

        this.walls = [];
        this.particle = new Particle2(this.display.canvas);

        for (let i = 0; i < 5; i++) {
            const x1 = Tools.random(400);
            const y1 = Tools.random(400);
            const x2 = Tools.random(400);
            const y2 = Tools.random(400);

            this.walls.push(new Boundary2(x1, y1, x2, y2));
        }

        this.walls.push(new Boundary2(0, 0, this.display.canvas.width, 0));
        this.walls.push(new Boundary2(this.display.canvas.width, 0, this.display.canvas.width, this.display.canvas.height));
        this.walls.push(new Boundary2(this.display.canvas.width, this.display.canvas.height, 0, this.display.canvas.height));
        this.walls.push(new Boundary2(0, this.display.canvas.height, 0, 0));
    }

    fixDPI() {
        this.scale = window.devicePixelRatio;

        if (this.lastScale) {
            this.display.ctx.scale(-this.lastScale, -this.lastScale);
        }

        this.display.canvas.width = 400 * this.scale;
        this.display.canvas.height = 400 * this.scale;
        this.display.ctx.scale(this.scale, this.scale);

        this.lastScale = this.scale;
    }

    start() {
        if (!this.interval) {
            this.interval = setInterval(() => this.tick(), 1000 / this.targetFPS);
        }
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    getInput() {
        this.map.getInput(this.keyStates);
    }

    update() {
        // this.map.update();
        this.particle.update(this.mouse);
    }

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.display.canvas.width, this.display.canvas.height);

        // this.map.render(ctx);
        this.walls.forEach(wall => {
            wall.render(ctx);
        });

        this.particle.render(ctx);
        this.particle.look(this.walls, ctx);

        ctx.fillStyle = 'red';
        ctx.font = '15px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('UPS: ' + this.UPS, 20, 20);
        ctx.fillText('FPS: ' + this.FPS, 20, 40);
    }

    tick() {
        const currentTime = Tools.getCurrentTimeMillis();
        this.updateDeltaTime += (currentTime - this.lastTime) / this.updateTime;
        this.lastTime = currentTime;

        // Update the game based on how many delta time passed
        while (this.updateDeltaTime >= 1) {
            this.getInput();
            this.update();
            this.updateDeltaTime--;
            this.updates++;
        }

        // Render the game
        this.render(this.display.ctx);
        this.frames++;

        // Show UPS and FPS
        while (Tools.getCurrentTimeMillis() - this.timer >= 1000) {
            this.FPS = this.frames;
            this.UPS = this.updates;
            this.timer += 1000;
            this.frames = 0;
            this.updates = 0;
        }
    }
}