export class Grid {
    constructor(width, height, initial) {
        this.width = width;
        this.height = height;
        this.data = new Array(height).fill(new Array(width).fill(initial));
    }

    get(p) {
        return this.data[p[1]][p[0]];
    }
    
    set(p, update) {
        this.data[p[1]][p[0]] = update;
    }

    reachable(p, filter) {
        return [(-1, -1), (0, -1), (0, 1), (-1,  0), (1, 0), (-1,  1), (0,  1), (1, 1)]
            .map(d => (p[0] + d[0], p[1] + d[1]))
            .filter(p => p[0] >= 0 && p[0] < this.width)
            .filter(p => p[1] >= 0 && p[1] < this.height)
            .filter(filter);
    }
}
