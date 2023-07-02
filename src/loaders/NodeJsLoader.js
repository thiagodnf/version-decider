const FileUtils = require("../utils/FileUtils");

module.exports = class NodeJsLoader {

    static async getVersion(file = "./package.json") {

        const content = FileUtils.readContent(file);

        const json = JSON.parse(content);

        if (!json.version) {
            throw new Error(`The 'version' property was not found at ${file}`);
        }

        return json.version;
    }
}