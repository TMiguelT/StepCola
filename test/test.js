import {promises as fs} from 'fs'
import stepToD3 from '../src/step/StepToD3'
import assert from "assert"

describe("StepToD3", function () {
    it("should convert the step function sample to D3 nodes", async function () {
        const parsed = JSON.parse(await fs.readFile(__dirname + '/example.json'))

        const graph = stepToD3(parsed)
        assert.equal(graph.nodes.length, 6)
    })
})