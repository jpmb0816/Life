class Engine2 {
    constructor() {
        this.display = new Canvas2(400, 400);
        this.display3D = new Canvas2(600, 400);

        document.body.appendChild(this.display.canvas);
        document.body.appendChild(this.display3D.canvas);

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

        // this.player = new Player(0, 0, 1, 1, 'red');

        // this.map = new Map2(10, 10, 40, 40);

        this.walls = [];
        this.light = new Light2(0, 0, this.walls);

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
        if (this.keyStates[87]) {
            this.light.velocity = Tools.fromAngle(this.light.heading, this.light.speed);
        }
        else if (this.keyStates[83]) {
            this.light.velocity = Tools.fromAngle(this.light.heading - Tools.radians(180), this.light.speed);
        }
        else {
            this.light.velocity.x = 0;
            this.light.velocity.y = 0;
        }

        if (this.keyStates[65]) {
            this.light.rotate(-0.1);
            this.light.velocity.x = 0;
            this.light.velocity.y = 0;
        }
        else if (this.keyStates[68]) {
            this.light.rotate(0.1);
        }
    }

    update() {
        this.light.update();
    }

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.display.canvas.width, this.display.canvas.height);

        this.walls.forEach(wall => {
            wall.render(ctx);
        });

        const ctx3D = this.display3D.ctx;
        const sceneWidth = this.display3D.canvas.width;
        const sceneHeight = this.display3D.canvas.height;
        const distances = this.light.getIntersectionDistances(ctx);
        const rectWidth = sceneWidth / distances.length;

        ctx3D.fillStyle = '#33CCFF';
        ctx3D.fillRect(0, 0, sceneWidth, sceneHeight / 2);

        ctx3D.fillStyle = '#8B0000';
        ctx3D.fillRect(0, sceneHeight / 2, sceneWidth, sceneHeight / 2);

        for (let i = 0; i < distances.length; i++) {
            const sq = distances[i] * distances[i];
            const wSq = sceneWidth * sceneWidth;
            const b = Tools.scaleValue(sq, 0, wSq, 255, 0);
            const rectHeight = sceneHeight * this.light.fov / distances[i];
            ctx3D.fillStyle = 'rgb(' + b + ', ' + b + ', ' + b + ')';
            ctx3D.fillRect((i * rectWidth + rectWidth / 2) - (rectWidth / 2), (sceneHeight / 2) - (rectHeight / 2), rectWidth + 1, rectHeight);
        }

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