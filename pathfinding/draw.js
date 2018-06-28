import { TINY } from './maps.js';

const HEIGHT = 500;
const WIDTH = 500;

var cells = d3.select("#canvas")
    .selectAll("circle")
    .data(TINY.raw());

var scaleX = d3.scaleLinear()
    .domain([0, TINY.width])
    .range([0, WIDTH]);

console.log(TINY.height);

var scaleY = d3.scaleLinear()
    .domain([0, TINY.height])
    .range([HEIGHT, 0]);

cells.enter()
    .append("rect")
    .attr("x", tile => scaleX(tile.x))
    .attr("y", tile => scaleY(tile.y))
    .attr("height", HEIGHT / TINY.height)
    .attr("width", WIDTH / TINY.width)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1px");
