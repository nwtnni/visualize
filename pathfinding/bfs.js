import { Point } from '../util/point.js';
import { HashSet } from '../util/set.js';
import { HashMap } from '../util/map.js';

export function* bfs(grid, start, end, passable) {
    let frontier = [start];
    let visited = new HashSet();
    let retrace = new HashMap();

    while (frontier.length !== 0) {
        const p = frontier.pop();
        visited.put(p);

        yield visited;

        if (p.equals(end)) {
            break;
        }

        let adjacent = grid.adjacent(p, passable);

        for (let i = 0; i < adjacent.length; i++) {
            if (!visited.contains(adjacent[i])) {
                frontier.unshift(adjacent[i]);
            }
        }
    }

    let current = end;
    let trace = new HashMap();
    while (!current.equals(end)) {
        trace.put(current, retrace.get(current));
        current = retrace.get(current);
    }

    return trace;
}
