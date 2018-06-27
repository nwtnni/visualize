from os import remove
from sys import argv

import imageio

from grid import Tile, from_file
from search import djikstra, reachable
from plot import make_grid, make_heat_map, plot


def animate_forward(infile, x1, y1, x2, y2):
    grid = from_file(infile)
    temp = ".temp_maze.png"

    grid[y1][x1] = Tile.UNIT

    with imageio.get_writer("forward.gif", mode='I', fps=10) as writer:
        while True:
            distance, retrace = djikstra(grid, (y1, x1), (y2, x2))
            plot(
                [make_grid(grid), make_heat_map(grid, distance)],
                save=True,
                path=temp
            )
            image = imageio.imread(temp)
            writer.append_data(image)

            print(x1, y1)
            if x1 == x2 and y1 == y2:
                break

            grid[y1][x1] = Tile.FLOOR
            (y1, x1) = retrace[(y1, x1)]
            grid[y1][x1] = Tile.UNIT

    remove(temp)


if __name__ == '__main__':
    animate_forward(
        argv[1],
        int(argv[2]),
        int(argv[3]),
        int(argv[4]),
        int(argv[5])
    )
