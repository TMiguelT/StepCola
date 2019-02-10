import _ from "lodash"

export default function stepToD3(step_json) {
    const nodes = []
    const links = []

    // In the first pass, we store just the nodes
    for (let name of Object.keys(step_json.States)) {
        const node = step_json.States[name]
        nodes.push({
            name: name
        })
    }

    // In the second pass, we create the links
    for (let name of Object.keys(step_json.States)) {
        const node = step_json.States[name]

        for (let next of findNext(node)) {
            let link = {
                target: _.findIndex(nodes, n => n.name === next),
                source: _.findIndex(nodes, n => n.name === name),
                value: 1
            }
            if (link.target !== -1 && link.source !== -1)
                links.push(link)
        }
    }

    return {
        nodes,
        links
    }
}