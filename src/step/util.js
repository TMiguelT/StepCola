export function findNext(obj, list = []) {

    for (let [key, value] of _.entries(obj)) {
        if (key === "Next")
            list.push(value)
        else if (value instanceof Object)
            findNext(value, list)
    }

    return list
}

