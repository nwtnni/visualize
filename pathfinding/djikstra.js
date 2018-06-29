import { Tile } from './grid.js';
import { Heap } from './heap.js';
import { parse } from './parse.js';

export class DjikstraTile extends Tile {
    get d() {
        return this.d;
    }

    set d(d) {
        this.d = d;
    }
}

export function djikstra(grid, start, end, passable) {

    grid.forEach(tile => tile.d = Infinity);
    var visited = new Set([]);
    var retrace = new Map([]);
    var frontier = new Heap(p => p.d); 
   
    while (!frontier.empty()) {
        p = frontier.pop();  
        visited.add(p);

        // Found the goal
        if (p === end) {
            break;
        }

        for (var n in grid.reachable(p, passable)) {
            var closer = n.d > p.d + 1;
            var unseen = n.d === Infinity;

            if (closer || unseen) {
                retrace.set(n, p);
                n.d = p.d + 1;
                let _ = closer ? frontier.update(n) : frontier.push(n);
            }
        }
    }

    var current = end;
    var trace = new Map([]);
    while (current !== start) {
        next = retrace.get(current);
        trace.set(current, next);
        current = next;
    }

    return trace.get(start);
}
