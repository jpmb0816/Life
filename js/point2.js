class Point2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static distance(a, b) {
        const xDiff = a.x - b.x;
        const yDiff = a.y - b.y;

        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    static direction(from, to) {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (length > 0) {
            return new Vector2(xDiff / length, yDiff / length);
        }

        return new Vector2();
    }
}