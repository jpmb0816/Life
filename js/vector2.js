class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static length(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    }

    static normalize(vector) {
        const length = Vector2.length(vector);

        if (length > 0) {
            return new Vector2(vector.x / length, vector.y / length);
        }

        return new Vector2();
    }

    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
}