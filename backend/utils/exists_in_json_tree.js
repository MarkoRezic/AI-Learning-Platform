
const existsInJsonTree = (jsonTree, checkNode) => {
    if (jsonTree == null || jsonTree?.length === 0) {
        return false;
    }
    for (let node of jsonTree) {
        if (checkNode["lecture_id"] === node["lecture_id"]) {
            return true;
        }
        let exists = existsInJsonTree(node["child_lectures"], checkNode);
        if (exists === true) {
            return true;
        }
    }

    return false;
}

module.exports = existsInJsonTree