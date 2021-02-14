class Map2 {
    constructor(columns, rows, cellWidth, cellHeight) {
        this.columns = columns;
        this.rows = rows;
        this.cell = new Dimension2(cellWidth, cellHeight);
        this.dimension = new Dimension2(columns * this.cell.width, rows * this.cell.height);
        this.entities = [];

        this.background = new Canvas2(this.dimension.width, this.dimension.height);
        this.initBackground();
    }

    initBackground() {
        let flag = true;

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                this.background.ctx.fillStyle = flag ? 'black' : 'gray';
                this.background.ctx.fillRect(x * this.cell.width, y * this.cell.height, this.cell.width, this.cell.height);

                flag = !flag;
            }

            if (this.columns % 2 === 0) {
                flag = !flag;
            }
        }
    }

    update() {
        this.entities.forEach(entity => {
            entity.update(this.dimension);
        });
    }

    render(ctx) {
        ctx.drawImage(this.background.canvas, 0, 0);

        this.entities.forEach(entity => {
            entity.render(ctx);
        });
    }
}