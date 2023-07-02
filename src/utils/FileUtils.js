const fs = require("fs");
const path = require("path");

module.exports = class FileUtils {

    static getWorkspacePath() {
        return process.env["GITHUB_WORKSPACE"] || "";
    }

    static isWorkspaceEmpty() {
        return FileUtils.isEmpty(FileUtils.getWorkspacePath());
    }

    static exists(fileOrPath) {
        return fs.existsSync(fileOrPath);
    }

    static isEmpty(fileOrPath) {

        if (!fileOrPath || fileOrPath.trim() === "") {
            throw new Error(`File or path is blank`);
        }

        if (!FileUtils.exists(fileOrPath)) {
            throw new Error(`${fileOrPath} does not exist`);
        }

        return fs.readdirSync(fileOrPath).length === 0;
    }

    static readContent(file, encoding = "utf-8") {

        const filePath = path.join(FileUtils.getWorkspacePath(), file);

        return fs.readFileSync(filePath, { encoding });
    }
}
