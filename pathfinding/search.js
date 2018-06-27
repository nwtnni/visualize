import { Heap } from './heap.js';

export function djikstra(grid, start, end, passable) {
    var visited = new Set([]);
    var distance = new Map([[start, 0]]);
    var retrace = new Map([]);
    var frontier = new Heap(point => distance[point]); 
   
    while (!frontier.empty()) {
        p = frontier.pop();  
        d = distance[p];    
        visited.add(p);

        // Found the goal
        if (p === end) {
            break;
        }

        for (var n in grid.reachable(p, passable)) {
            var closer = distance.has(n) && distance.get(n) > d + 1;
            var unseen = !distance.has(n);

            if (closer || unseen) {
                retrace.set(n, p);
                distance.set(n, d + 1);
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

    return (distance, trace);
}
