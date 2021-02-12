class Entity2 {
    constructor(x, y, width, height, color) {
        this.position = new Point2(x, y);
        this.dimension = new Dimension2(width, height);
        this.velocity = new Vector2();
        this.color = color;
        this.speed = 2;
    }

    update(mapDimension) {
        this.position.x = Tools.clamp(this.position.x + this.velocity.x, 0, mapDimension.width - this.dimension.width);
        this.position.y = Tools.clamp(this.position.y + this.velocity.y, 0, mapDimension.height - this.dimension.height);
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    }
}