const _ = require('lodash')

export default function stepToD3(step_json){
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
        const source = _.findIndex(nodes, n => n.name === name)


        if ('Next' in node)
            links.push({
                target: _.findIndex(nodes, n => n.name === node.Next),
                source: _.findIndex(nodes, n => n.name === name),
                value: 1
            })
    }

    return {
        nodes,
        links
    }
}