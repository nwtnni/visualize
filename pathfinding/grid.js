export class Grid {
    constructor(width, height, initial) {
        this.width = width;
        this.height = height;
        this.data = new Array(height);

        for (var i = 0; i < height; i++) {
            this.data[i] = new Array(width);
        }
    }

    get(p) {
        return this.data[p[1]][p[0]];
    }

    set(p, update) {
        this.data[p[1]][p[0]] = update;
    }

    reachable(p, filter) {
        return [[-1, -1], [0, -1], [0, 1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
            .map(d => (p[0] + d[0], p[1] + d[1]))
            .filter(p => p[0] >= 0 && p[0] < this.width)
            .filter(p => p[1] >= 0 && p[1] < this.height)
            .filter(filter);
    }

    raw() {
        return [].concat(...this.data);
    }
}

// Temporary: to be extended later
export class Tile {

    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    static floor(x, y) {
        return new Tile(0, x, y);
    }

    static wall(x, y) {
        return new Tile(1, x, y);
    }

    floor() {
        return this.type === 0;
    }

    wall() {
        return this.type === 1;
    }
}
