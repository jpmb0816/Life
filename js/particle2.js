class Particle2 {
    constructor(canvas) {
        this.position = new Point2(canvas.width / 2, canvas.height / 2);
        this.rays = [];

        for (let i = 0; i < 360; i += 1) {
            this.rays.push(new Ray2(this.position, Tools.radians(i)));
        }
    }

    look(walls, ctx) {
        this.rays.forEach(ray => {
            let record = Infinity;
            let closestWall = null;

            walls.forEach(wall => {
                const point = ray.cast(wall);

                if (point) {
                    const distance = Point2.distance(this.position, point);

                    if (distance < record) {
                        record = distance;
                        closestWall = point;
                    }
                }
            });

            if (closestWall) {
                ctx.strokeStyle = 'rgb(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.lineTo(this.position.x, this.position.y);
                ctx.lineTo(closestWall.x, closestWall.y);
                ctx.stroke();
            }
        });
    }

    update(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    render(ctx) {
        // ctx.fillStyle = 'white';
        // ctx.beginPath();
        // ctx.ellipse(this.position.x, this.position.y, 1, 1, 0, 0, Math.PI * 2);
        // ctx.fill();

        // this.rays.forEach(ray => {
        //     ray.render(ctx);
        // });
    }
}