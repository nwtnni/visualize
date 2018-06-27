export class Grid {
    constructor(width, height, initial) {
        this.width = width;
        this.height = height;
        this.data = new Array(width * height).fill(initial);
    }

    index(p) {
        return p[1] * this.width + p[0];
    }

    get(p) {
        return this.data[this.index(p)];
    }
    
    set(p, update) {
        this.data[this.index(p)] = update;
    }

    reachable(p, filter) {
        return [(-1, -1), (0, -1), (0, 1), (-1,  0), (1, 0), (-1,  1), (0,  1), (1, 1)]
            .map(d => (p[0] + d[0], p[1] + d[1]))
            .filter(p => p[0] >= 0 && p[0] < this.width)
            .filter(p => p[1] >= 0 && p[1] < this.height)
            .filter(filter);
    }
}
