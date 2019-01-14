import _ from 'lodash'

function findNext(obj, list = []){
    
    for (let [key, value] of _.entries(obj)){
        if(key === 'Next')
            list.push(value)
        else if (value instanceof Object)
            findNext(value, list)
    }
    
    return list
}

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

        for (let next of findNext(node))
            links.push({
                target: _.findIndex(nodes, n => n.name === next),
                source: _.findIndex(nodes, n => n.name === name),
                value: 1
            })
    }

    return {
        nodes,
        links
    }
}