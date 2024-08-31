const pomParser = require("pom-parser");

module.exports = class MavenLoader {

    static async getVersion(file = "./pom.xml") {

        return new Promise(function(resolve, reject) {

            var opts = {
                filePath: file, // The path to a pom file
            };

            pomParser.parse(opts, function(error, pomResponse) {

                if (error) {
                    reject(error);
                    return;
                }

                if (pomResponse.version) {
                    resolve(pomResponse.version);
                }else{
                    reject(`The 'version' property was not found at ${file}`);
                }
            });
        });
    }
};
