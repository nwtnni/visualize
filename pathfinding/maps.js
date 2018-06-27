import { Grid, Tile } from './grid.js';

function parse(data) {
    const width = data[0].length;
    const height = data.length;
    let grid = new Grid(width, height, Tile.floor());

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            if (data[y].charAt(x) === 'x') {
                grid.set((x, y), Tile.wall());
            }
        }
    }

    return grid;
}

export var TINY = parse([
    '_____',
    '_____',
    '_____',
    '_____',
    '_____',
]);
