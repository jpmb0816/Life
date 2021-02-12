class Boundary2 {
    constructor(x1, y1, x2, y2) {
        this.a = new Vector2(x1, y1);
        this.b = new Vector2(x2, y2);
    }

    render(ctx) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
}