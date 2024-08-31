module.exports = class MavenLoader {

    static async getVersion(file = "./pom.xml") {

        var opts = {
            filePath: file, // The path to a pom file
        };

        const pom = await pomParser.parse(opts);

        if (!pom.version) {
            throw new Error(`The 'version' property was not found at ${file}`);
        }

        return pom.version;
    }
};
