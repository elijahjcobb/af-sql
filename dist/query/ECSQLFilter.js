"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ECSQLOperator_1 = require("./ECSQLOperator");
const collections_1 = require("@elijahjcobb/collections");
const error_1 = require("@elijahjcobb/error");
/**
 * A class representing a filter to be used in ECSQLQuery instances to filter the query by a key and value using the provided operator.
 */
class ECSQLFilter extends collections_1.ECPrototype {
    /**
     * Create an instance of ECSQLFilter.
     * @param {string} key The key to filter.
     * @param {ECSQLOperator} operator The operator to be used.
     * @param {string | number | any[]} value The value to be operated against.
     */
    constructor(key, operator, value) {
        super();
        this.key = key;
        this.value = value;
        this.operator = operator;
    }
    /**
     * Generate the SQL parameter that will be added to the main ECSQLQuery SQL command string.
     * @return {string} A SQL parameter string.
     */
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
