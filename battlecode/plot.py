from matplotlib import collections as mc
from matplotlib import patches as mp
from matplotlib import pyplot as plt
from sys import argv

from grid import Tile, from_file
from search import djikstra


def make_patches(assign_color, height, width):
    patches = []
    colors = []

    for i in range(height):
        for j in range(width):
            patches.append(mp.Rectangle((j, height - i - 1), 1, 1))
            colors.append(assign_color(i, j))

    return mc.PatchCollection(patches, facecolors=colors)


def make_grid(grid):
    def assign_color(i, j):
        return grid[i][j].to_color()
    height = len(grid)
    width = len(grid[0])
    return make_patches(assign_color, height, width)


def make_heat_map(grid, start, end):
    distance = djikstra(grid, start, end)
    scale = max(distance.values()) * 1.5

    def normalize(d):
        return d / scale + 0.10

    def assign_color(i, j):
        if (i, j) in distance and distance[(i, j)] < float("inf"):
            return (1, 0, 0, normalize(distance[(i, j)]))
        elif grid[i][j] is Tile.FLOOR:
            return (0, 0, 1, 0.10)
        else:
            return (0, 0, 0, 0)

    height = len(grid)
    width = len(grid[0])
    return make_patches(assign_color, height, width)


def plot(lines, save=False, path="maze"):
    f, ax = plt.subplots(figsize=(5, 5))
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    plt.axis('off')
    for lc in lines:
        ax.add_collection(lc)
    ax.autoscale()

    if save:
        plt.savefig(path)
    else:
        plt.show()
    plt.close()


def main(infile):
    grid = from_file(infile)
    height = len(grid)
    width = len(grid[0])
    plot([
        make_grid(grid),
        make_heat_map(grid, (0, 0), (height - 1, width - 1))
    ])


if __name__ == '__main__':
    main(argv[1])
