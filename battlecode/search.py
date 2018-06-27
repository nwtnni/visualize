from asyncio import PriorityQueue
from collections import defaultdict

from grid import Tile


def reachable(grid, p):

    h = len(grid)
    w = len(grid[0])

    def in_bounds(p):
        (i, j) = p
        vertical = p[0] >= 0 and p[0] < h
        horizontal = p[1] >= 0 and p[1] < w
        return vertical and horizontal and (not grid[i][j] is Tile.WALL)

    (i, j) = p
    possible = [
        (i + di, j + dj)
        for di in range(-1, 2, 1)
        for dj in range(-1, 2, 1)
    ]

    return filter(in_bounds, possible)


def djikstra(grid, start, end):
    distance = defaultdict(lambda: float("inf"))
    distance[start] = 0
    frontier = PriorityQueue()
    frontier.put_nowait((0, start))
    visited = set([])

    while not frontier.empty():
        (d, p) = frontier.get_nowait()

        if p == end:
            visited.add(p)
            break
        elif p in visited:
            continue
        else:
            visited.add(p)

        for n in reachable(grid, p):
            print(n)
            if distance[n] > d + 1:
                distance[n] = d + 1
            frontier.put_nowait((distance[n], n))

    return {p: distance[p] for p in visited}
