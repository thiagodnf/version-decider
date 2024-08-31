const core = require("@actions/core");

const ActionUtils = require("./utils/ActionUtils");
const FileUtils = require("./utils/FileUtils");
const NodeJsLoader = require("./loaders/NodeJsLoader");
const MavenLoader = require("./loaders/MavenLoader");
const GitHubApiUtils = require("./utils/GitHubApiUtils");

async function run() {

    try {

        if (FileUtils.isWorkspaceEmpty()) {
            throw new Error("Workspace is empty");
        }

        let file = ActionUtils.getInput("file", { required: true });

        let fileExtension = file.split(".").pop();

        console.log("file", file);
        console.log("fileExtension", fileExtension);

        let version = null;

        if(fileExtension === "xml"){
            version = await MavenLoader.getVersion(file);
        }else{
            version = await NodeJsLoader.getVersion(file);
        }

        const release = await GitHubApiUtils.getRelease();

        console.log("version", version);
        console.log("release", release);
        console.log("new", version !== release);

        core.setOutput("version", version);
        core.setOutput("release", release);
        core.setOutput("new", version !== release);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
