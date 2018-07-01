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

        for (let n in grid.reachable(p, passable)) {
            if (!visited.contains(n)) {
                frontier.unshift(n);
            }
        }
    }

    let current = end;
    let trace = new HashMap();
    while (current[0] !== start[0] || current[1] !== start[1]) {
        trace.put(current, retrace.get(current));
        current = retrace.get(current);
    }

    return trace;
}
