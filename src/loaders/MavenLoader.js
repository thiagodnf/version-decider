const pomParser = require("pom-parser");

module.exports = class MavenLoader {

    static async getVersion(file = "./pom.xml") {

        var opts = {
            filePath: __dirname + file, // The path to a pom file
        };

        return new Promise(function(resolve, reject) {

            pomParser.parse(opts, function(error, pomResponse) {

                if (error) {
                    resolve(error);
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
