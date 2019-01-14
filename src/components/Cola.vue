<template>
    <div class="hello">
        <svg ref="svg">

        </svg>
    </div>
</template>

<script>
    import * as d3 from "d3"
    import * as cola from "webcola"

    export default {
        name: "Cola",
        props: {
            nodes: Array,
            links: Array,
            constraints: Array,
            symmetricDiffLinkLengths: Number,
            avoidOverlaps: Boolean,
            iterations: Number
        },
        watch: {
            nodes() {
                console.log("Updated!")
                const width = 960, height = 500
                var nodeRadius = 20
                var margin = 10, pad = 12

                // graph.nodes.forEach(function (v) { v.height = v.width = 2 * nodeRadius; });
                var color = d3.scaleOrdinal(d3.schemeCategory20)

                const d3cola = cola.d3adaptor(d3)
                    .avoidOverlaps(true)
                    .size([width, height])

                d3cola
                    .nodes(this.nodes)
                    .links(this.links)
                    .flowLayout("y", 130)
                    .symmetricDiffLinkLengths(4 * nodeRadius)
                    .convergenceThreshold(1e-3)
                    .size([width, height])
                    .start(10, 20, 20)

                const svg = d3.select(this.$refs.svg)
                    .attr("width", width)
                    .attr("height", height)

                // define arrow markers for graph links
                svg.append("svg:defs").append("svg:marker")
                    .attr("id", "end-arrow")
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 6)
                    .attr("markerWidth", 3)
                    .attr("markerHeight", 3)
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5")
                    .attr("fill", "#000")

                const path = svg.selectAll(".link")
                    .data(this.links)
                    .enter()
                    .append("svg:path")
                    .attr("class", "link")

                const node = svg.selectAll(".node")
                    .data(this.nodes)
                    .enter()
                    .append("rect")
                    .attr("class", "node")
                    .style("stroke", function (d) {
                        return color(d.group)
                    })
                    .call(d3cola.drag)

                var label = svg.selectAll(".label")
                    .data(this.nodes)
                    .enter()
                    .append("text")
                    .attr("class", "label")
                    .text(function (d) {
                        return d.name
                    })
                    .call(d3cola.drag)
                    .each(function (d) {
                        var b = this.getBBox()
                        var extra = 2 * margin + 2 * pad
                        d.width = b.width + extra
                        d.height = b.height + extra
                    })

                var lineFunction = d3.line()
                    .x(function (d) {
                        return d.x
                    })
                    .y(function (d) {
                        return d.y
                    })

                d3cola.on("tick", function () {
                    // draw directed edges with proper padding from node centers

                    // path.attr("d", function (d) {
                    //     var deltaX = d.target.x - d.source.x,
                    //         deltaY = d.target.y - d.source.y,
                    //         dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                    //         normX = deltaX / dist,
                    //         normY = deltaY / dist,
                    //         sourcePadding = nodeRadius,
                    //         targetPadding = nodeRadius + 2,
                    //         sourceX = d.source.x + (sourcePadding * normX),
                    //         sourceY = d.source.y + (sourcePadding * normY),
                    //         targetX = d.target.x - (targetPadding * normX),
                    //         targetY = d.target.y - (targetPadding * normY)
                    //     return "M" + sourceX + "," + sourceY + "L" + targetX + "," + targetY
                    // })

                    node.each(function (d) {
                        d.innerBounds = d.bounds.inflate(-margin)
                    }).attr("x", function (d) {
                        return d.innerBounds.x
                    }).attr("y", function (d) {
                        return d.innerBounds.y
                    }).attr("width", function (d) {
                        return d.innerBounds.width()
                    }).attr("height", function (d) {
                        return d.innerBounds.height()
                    })

                    path.attr("d", function (d) {
                        var route = cola.makeEdgeBetween(d.source.innerBounds, d.target.innerBounds, 5)
                        return lineFunction([route.sourceIntersection, route.arrowStart])
                    })


                    label.attr("x", function (d) {
                        return d.x
                    }).attr("y", function (d) {
                        return d.y + (margin + pad) / 2
                    })
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .node {
        stroke: #000;
        stroke-width: 1.5px;
        fill: rgba(0, 0, 0, 0);
        rx: 5px;
        ry: 5px;
    }

    .link {
        fill: none;
        stroke: #000;
        stroke-width: 1.5px;
        opacity: 0.4;
        marker-end: url(#end-arrow);
    }

    .label {
        fill: black;
        font-family: Verdana;
        font-size: 25px;
        text-anchor: middle;
        cursor: move;
    }
</style>
