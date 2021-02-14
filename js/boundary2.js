class Boundary2 {
    constructor(x1, y1, x2, y2) {
        this.a = new Point2(x1, y1);
        this.b = new Point2(x2, y2);
        this.points = [];
    }

    getPointCoordinate() {
        const boundary = new Boundary2();
        const zeroPoint = new Point2();
        let minPoint = null;
        let maxPoint = null;

        this.points.forEach(point => {
            if (minPoint) {
                if (Point2.distance(zeroPoint, point) < Point2.distance(zeroPoint, minPoint)) {
                    minPoint = point;
                }
            }
            else {
                minPoint = point;
            }

            if (maxPoint) {
                if (Point2.distance(zeroPoint, point) > Point2.distance(zeroPoint, maxPoint)) {
                    maxPoint = point;
                }
            }
            else {
                maxPoint = point;
            }
        });

        boundary.a = minPoint;
        boundary.b = maxPoint;

        return boundary;
    }

    render(ctx) {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.lineTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
}