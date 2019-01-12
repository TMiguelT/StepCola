const assert = require("assert")
const fs = require('fs').promises;
const stepToD3 = require('../src/StepToD3')

describe("StepToD3", function () {
    it("should convert the step function sample to D3 nodes", async function () {
        const parsed = JSON.parse(await fs.readFile(__dirname + '/example.json'))

        const graph = stepToD3(parsed)
        assert.equal(graph.nodes.length, 6)
    })
})