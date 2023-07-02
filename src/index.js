const core = require("@actions/core");

const ActionUtils = require("./utils/ActionUtils");
const FileUtils = require("./utils/FileUtils");

async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty");
        }

        let file = ActionUtils.getInput("file", { required: true });

        core.info(`file: ${file}`);

        core.setOutput("version", "ver");
        core.setOutput("release", "rel");

    } catch (error) {
        core.setFailed(error.message);
    }

}

run();

