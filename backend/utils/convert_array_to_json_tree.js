
const convertArrayToJsonTree = (array, parent_lecture_id = null) => {
    let jsonTree = [];

    for (let node of array) {
        if (node["parent_lecture_id"] === parent_lecture_id) {

            node["child_lectures"] = convertArrayToJsonTree(array, node["lecture_id"]);

            jsonTree.push(node);
        }
    }

    return jsonTree;
}

module.exports = convertArrayToJsonTree