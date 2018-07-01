export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this.x;
    }

    get y() {
        return this.y;
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    hash() {
        return this.x * this.y;
    }
}
