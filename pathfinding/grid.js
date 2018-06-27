export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Grid {
    constructor(width, height, initial) {
        this.width = width;
        this.height = height;
        this.data = new Array(width * height).fill(initial);
    }

    index(p) {
        return p.y * this.width + p.x;
    }

    get(p) {
        return this.data[this.index(p)];
    }
    
    set(p, update) {
        this.data[this.index(p)] = update;
    }

    reachable(p, passable) {
        return [(-1, -1), (0, -1), (0, 1), (-1,  0), (1, 0), (-1,  1), (0,  1), (1, 1)]
            .map(d => new Point(p.x + d[0], p.y + d[1]))
            .filter(p => p.x >= 0 && p.x < this.width)
            .filter(p => p.y >= 0 && p.y < this.height)
            .filter(passable);
    }
}
