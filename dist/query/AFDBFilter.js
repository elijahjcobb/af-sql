"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Ampel Feedback
 * Formative Developments, LLC.
 * 2018
 *
 * Elijah Cobb
 * elijah@ampelfeedback.com
 *
 */
const AFDBOperator_1 = require("./AFDBOperator");
const af_collections_1 = require("af-collections");
const af_error_1 = require("af-error");
class AFDBFilter extends af_collections_1.AFObject {
    constructor(key, operator, value) {
        super();
        this.key = key;
        this.value = value;
        this.operator = operator;
    }
    generateSQLCommand() {
        let command = this.key.replace(RegExp("'", "g"), "");
        if (this.operator === AFDBOperator_1.AFDBOperator.ContainedIn) {
            if (!Array.isArray(this.value)) {
                let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.ParameterIncorrectFormat, new Error("If you use the in operator, you must supply an array as the value."));
                stack.add(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.InternalSQLError, new Error("Internal server error."));
                throw stack;
            }
            let values = [];
            this.value.forEach((value) => values.push(value.replace(RegExp("'", "g"), "\\'")));
            command += " IN ('";
            command += values.join("','");
            command += "')";
        }
        else {
            command += this.operator;
            if (typeof this.value === "string") {
                command += "'";
                command += this.value.replace(RegExp("'", "g"), "\\'") + "'";
            }
            else {
                command += this.value;
            }
        }
        return command;
    }
}
exports.AFDBFilter = AFDBFilter;
