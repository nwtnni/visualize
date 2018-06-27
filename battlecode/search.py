from asyncio import PriorityQueue
from collections import defaultdict


def reachable(h, w, p):
    def in_bounds(p):
        return p[0] >= 0 and p[0] < h and p[1] >= 0 and p[1] < w

    (i, j) = p

    possible = [
        (i + di, j + dj)
        for di in range(-1, 2, 1)
        for dj in range(-1, 2, 1)
    ]

    return filter(in_bounds, possible)


def djikstra(grid, start, end):
    distance = defaultdict(lambda: float("inf"))
    frontier = PriorityQueue()
    frontier.put_nowait((0, start))
    visited = set([])

    height = len(grid)
    width = len(grid[0])

    while not frontier.empty():
        (d, p) = frontier.get_nowait()

        if p == end:
            return distance
        elif p in visited:
            continue
        else:
            visited.add(p)

        for n in reachable(height, width, p):
            if distance[n] > d + 1:
                distance[n] = d + 1
            frontier.put_nowait((distance[n], n))
    return distance
