class Tools {
    static random(min, max) {
        if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }

        return Math.random() * (max - min) + min;
    }

    static getCurrentTimeMillis() {
        return new Date().getTime();
    }

    static clamp(val, min, max) {
        if (val < min) {
            return min;
        }
        else if (val > max) {
            return max;
        }

        return val;
    }

    static radians(degree) {
        return degree * Math.PI / 180;
    }

    static fromAngle(angle, length) {
        if (typeof length === 'undefined') {
            length = 1;
        }

        return new Vector2(length * Math.cos(angle), length * Math.sin(angle));
    }

    static scaleValue(v, s1, e1, s2, e2) {
        return (v - s1) / (e1 - s1) * (e2 - s2) + s2;
    }
}