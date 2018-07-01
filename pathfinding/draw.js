const SEARCH = bfs(TINY, [0, 0], [4, 4], tile => tile.passable);
const DATA = TINY.data;
let visited = new Set([]);

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
    visited = SEARCH.next().value;
    update(DATA, visited);
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
            if (visited.has(tile)) {
                return d3.rgb(255, 0, 0, 0.5);
            } else {
                return d3.rgb(0, 0, 0, 0);
            }
        });
}


