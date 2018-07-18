import { Point } from '../util/point.js';
import { bfs } from './bfs.js';
import { TINY } from './parse.js';

const SEARCH = bfs(TINY, new Point(0, 0), new Point(4, 4), tile => tile.passable);
const DATA = TINY.data;
let VISITED = SEARCH.next().value;

const HEIGHT = 500;
const WIDTH = 500;

const grid = d3.select("#canvas");

const scaleX = d3.scaleLinear()
    .domain([0, TINY.width])
    .range([0, WIDTH]);

const scaleY = d3.scaleLinear()
    .domain([0, TINY.height])
    .range([HEIGHT, 0]);

const rows = grid.selectAll(".row")
    .data(DATA)
.enter()
    .append("g")
    .attr("class", "row");

d3.interval(() => {
    const next = SEARCH.next().value;
    VISITED = next ? next : VISITED;
    update(DATA, VISITED);
}, 1000);

function update(data, visited) {

    let t = d3.transition()
        .duration(1000);

    rows.selectAll(".square")
        .data(row => row)
        .enter()
        .append("rect")
        .attr("x", tile => scaleX(tile.x))
        .attr("y", tile => scaleY(tile.y))
        .attr("height", HEIGHT / TINY.height)
        .attr("width", WIDTH / TINY.width)
        .attr("stroke", tile => tile.passable ? d3.rgb(0, 0, 0) : d3.rgb(0, 0, 0, 0))
        .attr("stroke-width", "1px")
    .transition(t)
        .attr("fill", tile => {
            if (visited.contains(new Point(tile.x, tile.y))) {
                return d3.rgb(255, 0, 0, 0.5);
            } else {
                return d3.rgb(255, 255, 255, 1);
            }
        });
}


