export function* bfs(grid, start, end, passable) {
    let frontier = [start];
    let equality = new Set([]);
    let visited = new Set([]);
    let retrace = new Map([]);

    while (frontier.length !== 0) {
        const p = frontier.pop();
        console.log(p);
        equality.add(JSON.stringify(p));
        visited.add(p);

        yield visited;

        if (p[0] === end[0] && p[1] === end[1]) {
            break;
        }

        for (let n in grid.reachable(p, passable)) {
            if (!equality.has(JSON.stringify(n))) {
                frontier.unshift(n);
            }
        }
    }

    let current = end;
    let trace = new Map([]);
    while (current[0] !== start[0] || current[1] !== start[1]) {
        trace.set(current, retrace.get(current));
        current = retrace.get(current);
    }

    return trace;
}
