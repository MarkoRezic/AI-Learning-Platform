
const getExtension = (filename) => {
    let file_elements = filename?.split(".");
    let extension = "";
    if (file_elements?.length > 1) {
        extension = file_elements[file_elements?.length - 1]
    }

    return extension;
}

module.exports = getExtension