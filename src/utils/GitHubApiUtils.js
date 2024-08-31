const { Octokit } = require("@octokit/rest");

module.exports = class GitHubApiUtils {

    static async isValidRepository(str) {

        if (!str || str.trim() === "") {
            throw new Error("Repository should not be blank");
        }

        return /(.+)\/(.+)/gm.test(str);
    }

    static async getRepository() {

        const repository = process.env["GITHUB_REPOSITORY"];

        if (!GitHubApiUtils.isValidRepository(repository)) {
            throw new Error(`${repository} is invalid`);
        }

        const [owner, repo] = repository.split("/");

        let headers = {
            accept: "application/vnd.github.v3+json",
            authorization: `token ${process.env["GITHUB_TOKEN"]}`
        };

        return { owner, repo, headers };
    }

    static async getRelease() {

        const octokit = new Octokit();

        const repoInfo = await GitHubApiUtils.getRepository();

        let releases = await octokit.rest.repos.listReleases(repoInfo);

        releases = releases.data;

        let latestRelease = "";

        if (releases.length) {
            latestRelease = releases[0].name;
            latestRelease = latestRelease.trim().replace(/^v?(.*)$/gm, "$1");
        }

        return latestRelease;
    }
};