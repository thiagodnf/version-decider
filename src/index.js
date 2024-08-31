const core = require("@actions/core");

const ActionUtils = require("./utils/ActionUtils");
const FileUtils = require("./utils/FileUtils");
const NodeJsLoader = require("./loaders/NodeJsLoader");
const GitHubApiUtils = require("./utils/GitHubApiUtils");

async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty");
        }

        let file = ActionUtils.getInput("file", { required: true });

        core.setOutput("file", file);
        core.setOutput("fileExtension", filename.split(".").pop());

        const version = await NodeJsLoader.getVersion(file);
        const release = await GitHubApiUtils.getRelease();

        core.setOutput("version", version);
        core.setOutput("release", release);
        core.setOutput("new", version !== release);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
