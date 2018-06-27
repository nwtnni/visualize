from enum import Enum


class Tile(Enum):
    FLOOR = 0
    WALL = 1
    UNIT = 2

    @staticmethod
    def from_char(c):
        if c == ' ':
            return Tile.FLOOR
        elif c == '#':
            return Tile.WALL
        else:
            return Tile.UNIT

    def to_color(self):
        if self is Tile.FLOOR:
            return (0, 0, 0, 0)
        elif self is Tile.WALL:
            return (0, 0, 0, 0)
        else:
            return (0, 1, 0, 0.5)


def from_file(infile):
    grid = []
    with open(infile, 'r') as f:
        for line in f:
            row = [Tile.from_char(c) for c in line.rstrip("\r\n")]
            grid.append(row)
    return grid
