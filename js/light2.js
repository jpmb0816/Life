class Light2 {
    constructor(x, y, boundaries) {
        this.position = new Point2(x, y);
        this.boundaries = boundaries;
        this.rays = [];
        this.heading = 0;

        this.fov = 45;

        for (let a = -this.fov / 2; a < this.fov / 2; a += 0.1) {
            this.rays.push(new Ray2(this.position, Tools.radians(a)));
        }

        this.color = 'rgb(255, 255, 255, 0.4)';
        this.velocity = new Vector2();
        this.speed = 2;
    }

    updateFOV(fov) {
        this.rays = [];
        this.fov = fov;
        let index = 0;

        for (let a = -this.fov / 2; a < this.fov / 2; a += 0.1) {
            this.rays.push(new Ray2(this.position, Tools.radians(a)));
        }
    }

    rotate(angle) {
        this.heading += angle;
        let index = 0;

        for (let a = -this.fov / 2; a < this.fov / 2; a += 0.1) {
            this.rays[index].direction = Tools.fromAngle(Tools.radians(a) + this.heading);
            index++;
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    getIntersectionDistances(ctx) {
        const distances = [];

        this.rays.forEach(ray => {
            let shortestDistance = Infinity;
            let closestPoint = null;

            this.boundaries.forEach(boundary => {
                const point = ray.cast(boundary);

                if (point) {
                    let distance = Point2.distance(this.position, point);
                    const angle = ray.direction.heading() - this.heading;
                    distance *= Math.cos(angle);

                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        closestPoint = point;
                    }
                }
            });

            if (closestPoint) {
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(closestPoint.x, closestPoint.y);
                ctx.stroke();

                distances.push(shortestDistance);
            }
        });

        return distances;
    }
}