export class Grid {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Array(height).fill(undefined);
    }

    get(x, y) {
        return this.data[y][x];
    }

    set(x, y, data) {
        this.data[y][x] = data;
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
            .map(d => (p[0] + d[0], p[1] + d[1]))
            .filter(p => p[0] >= 0 && p[0] < this.width)
            .filter(p => p[1] >= 0 && p[1] < this.height)
            .filter(filter);
    }

}
