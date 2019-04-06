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
const ECSQLOperator_1 = require("./ECSQLOperator");
const collections_1 = require("@elijahjcobb/collections");
const error_1 = require("@elijahjcobb/error");
class ECSQLFilter extends collections_1.ECPrototype {
    constructor(key, operator, value) {
        super();
        this.key = key;
        this.value = value;
        this.operator = operator;
    }
    generateSQLCommand() {
        let command = this.key.replace(RegExp("'", "g"), "");
        if (this.operator === ECSQLOperator_1.ECSQLOperator.ContainedIn) {
            if (!Array.isArray(this.value)) {
                let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.ParameterIncorrectFormat, new Error("If you use the in operator, you must supply an array as the value."));
                stack.add(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.InternalSQLError, new Error("Internal server error."));
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
exports.ECSQLFilter = ECSQLFilter;
