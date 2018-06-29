import { TINY } from './parse.js';

const DATA = TINY.data;
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

rows.selectAll(".square")
    .data(row => row)
    .enter()
    .append("rect")
    .attr("x", tile => scaleX(tile.x))
    .attr("y", tile => scaleY(tile.y))
    .attr("height", HEIGHT / TINY.height)
    .attr("width", WIDTH / TINY.width)
    .attr("fill", tile => tile.passable ? d3.rgb(255, 255, 255) : d3.rgb(0, 0, 0, 0))
    .attr("stroke", tile => tile.passable ? d3.rgb(0, 0, 0) : d3.rgb(0, 0, 0, 0))
    .attr("stroke-width", "1px");
