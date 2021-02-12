class Ray2 {
    constructor(position, angle) {
        this.position = position;
        this.direction = Tools.fromAngle(angle);
    }

    render(ctx) {
        ctx.fillStyle = 'white';
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        ctx.beginPath();
        ctx.lineTo(0, 0);
        ctx.lineTo(this.direction.x * 10, this.direction.y * 10);
        ctx.stroke();

        ctx.restore();
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.position.x;
        const y3 = this.position.y;
        const x4 = x3 + this.direction.x;
        const y4 = y3 + this.direction.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (denominator === 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (t > 0 && t < 1 && u > 0) {
            const point = new Vector2();

            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);

            return point;
        }

        return;
    }
}