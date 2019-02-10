import {findNext} from "./util"

export default function stepToCyto(step_json) {
    const elements = []

    // In the first pass, we store just the nodes
    for (let name of Object.keys(step_json.States)) {
        const node = step_json.States[name]
        elements.push({
            id: name
        })
    }

    // In the second pass, we create the links
    let i=0;
    for (let name of Object.keys(step_json.States)) {
        const node = step_json.States[name]

        for (let next of findNext(node)) {
            let link = {
                id: i++,
                target: next,
                source: name,
            }
            if (link.target !== -1 && link.source !== -1)
                elements.push(link)
        }
    }

    return {
        nodes,
        links
    }
}
