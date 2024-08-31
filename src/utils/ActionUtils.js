const core = require("@actions/core");

module.exports = class ActionUtils {

    static getInput(name, options = {}) {

        let input = core.getInput(name, options);

        if (input) {
            input = input.trim();
        }

        return input;
    }
};