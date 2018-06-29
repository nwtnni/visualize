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
        const [x, y] = p;
        return this.data[y][x];
    }

    set(p, data) {
        const [x, y] = p;
        this.data[y][x] = data;
    }

    forEach(f) {
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                f(this.data[i][j]);
            }
        }
    }

    reachable(p, filter) {
        return [[-1, -1], [0, -1], [0, 1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
            .map(d => (p[0] + d[0], p[1] + d[1]))
            .filter(p => p[0] >= 0 && p[0] < this.width)
            .filter(p => p[1] >= 0 && p[1] < this.height)
            .filter(filter);
    }
}

export class Tile {
    constructor(x, y, passable) {
        this.x = x;
        this.y = y;
        this.passable = passable;
    }
}
