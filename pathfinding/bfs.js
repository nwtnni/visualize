import { Tile } from './grid.js';

export function* bfs(grid, start, end, passable) {
    let frontier = [start];
    let visited = new Set([]);
    let retrace = new Map([]);
    console.log(start);

    while (frontier.length !== 0) {
        const p = frontier.unshift();
        visited.add(p);

        console.log(visited);
        yield visited;

        if (start === end) {
            break;
        }

        for (let n in grid.reachable(p, passable)) {
            if (!visited.has(n)) {
                frontier.push(n);
            }
        }
    }

    let current = end;
    let trace = new Map([]);
    while (current !== start) {
        trace.set(current, retrace.get(current));
        current = retrace.get(current);
    }

    return trace;
}
