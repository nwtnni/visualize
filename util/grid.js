import './point.js';

export class Grid {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Array(height);

        for (let y = 0; y < height; y++) {
            this.data[y] = [];
        }
    }

    get(p) {
        return this.data[p.y][p.x];
    }

    set(p, data) {
        this.data[p.y][p.x] = data;
    }

    forEach(f) {
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                f(this.data[i][j]);
            }
        }
    }

    adjacent(p, filter) {
        return [[-1, -1], [0, -1], [0, 1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
            .map(d => new Point(p.x + d[0], p.y + d[1]))
            .filter(p => p.x >= 0 && p.x < this.width)
            .filter(p => p.y >= 0 && p.y < this.height)
            .filter(filter);
    }

}
