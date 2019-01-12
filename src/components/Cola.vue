<template>
    <div class="hello">
        <svg ref="svg">

        </svg>
    </div>
</template>

<script>
    import * as d3 from "d3"
    import cola from "webcola"

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
        updated() {
            const width = 960, height = 500

            const d3cola = cola.d3adaptor(d3)
                .avoidOverlaps(true)
                .size([width, height])

            d3cola
                .nodes(this.props.nodes)
                .links(this.props.links)
                .flowLayout("y", 30)
                .symmetricDiffLinkLengths(6)
                .start(10, 20, 20)

            const svg = d3.select(this.$refs.svg)
                .attr("width", width)
                .attr("height", height)

            const path = svg.selectAll(".link")
                .data(this.props.links)
                .enter().append('svg:path')
                .attr('class', 'link');

            const node = svg.selectAll(".node")
                .data(this.props.nodes)
                .enter().append("circle")
                .attr("class", "node")
                .attr("r", nodeRadius)
                .style("fill", function (d) { return color(d.group); })
                .call(d3cola.drag);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
