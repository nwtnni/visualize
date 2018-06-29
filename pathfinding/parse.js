import { Grid, Tile } from './grid.js';

export function parse(data, construct) {
    const width = data[0].length;
    const height = data.length;
    let grid = new Grid(width, height, 0);
    console.log(grid);

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            grid.set([x, y], construct(x, y, data[y].charAt(x)));
        }
    }

    return grid;
}

function parseDefault(data) {
    return parse(data, (x, y, c) => new Tile(x, y, c === '_'));
}

export var TINY = parseDefault([
    '_____',
    '__#__',
    '__#__',
    '__#__',
    '_____',
]);
