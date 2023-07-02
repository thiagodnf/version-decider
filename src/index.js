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

        core.info(`This is the input file: ${file}`);

        core.setOutput("version", NodeJsLoader.getVersion(file));
        core.setOutput("release", await GitHubApiUtils.getLatestRelease());

    } catch (error) {
        core.setFailed(error.message);
    }

}

run();

