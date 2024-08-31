const pomParser = require("pom-parser");

module.exports = class MavenLoader {

    static async getVersion(file = "./pom.xml") {

        return new Promise(function(resolve, reject) {

            var opts = {
                filePath: file, // The path to a pom file
            };

            pomParser.parse(opts, function(error, pomResponse) {

                console.error(error);
                console.log(pomResponse);

                if (error) {
                    reject(error);
                    return;
                }

                if (pomResponse.pomObject.project.version) {
                    resolve(pomResponse.pomObject.project.version);
                }else{
                    reject(`The 'version' property was not found at ${file}`);
                }
            });
        });
    }
};
