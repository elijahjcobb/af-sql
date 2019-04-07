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
const collections_1 = require("@elijahjcobb/collections");
const error_1 = require("@elijahjcobb/error");
/**
 * A class to handle duplication errors on a column marked as unique.
 *
 * This class will be abstracted in a later version to allow custom keys other than the ones currently provided.
 */
class ECSQLDuplicateKeyHelper {
    /**
     * Create a new ECSQLDuplicateKeyHelper instance.
     */
    constructor() {
        this.map = new collections_1.ECMap();
        this.map.set("customer_email_uindex", "A user with this email already exists.");
        this.map.set("customer_phone_uindex", "A user with this phone already exists.");
        this.map.set("client_email_uindex", "A client with this email already exists.");
        this.map.set("client_phone_uindex", "A client with this phone already exists.");
        this.map.set("primary", "An object with this id already exists.");
    }
    /**
     * Get the error stack that should be created from the offending key.
     * @param {object} error The error object.
     * @return {ECErrorStack} An ECErrorStack instance.
     */
    getErrorStack(error) {
        let message = error["sqlMessage"];
        let duplicatedKey = message.substring(message.indexOf("key '") + 5, message.length - 1).toLowerCase();
        if (this.map.containsKey(duplicatedKey)) {
            return error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.User, error_1.ECErrorType.ValueAlreadyExists, new Error(this.map.get(duplicatedKey)));
        }
        else {
            return error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.User, error_1.ECErrorType.ValueAlreadyExists, new Error(`Duplicated key was used (${duplicatedKey}).`));
        }
    }
    /**
     * Ger the error that should be created from the offending key.
     * @param {object} error The error object.
     * @return {ECError} An ECError instance.
     */
    getError(error) {
        let message = error["sqlMessage"];
        let duplicatedKey = message.substring(message.indexOf("key '") + 5, message.length - 1).toLowerCase();
        if (this.map.containsKey(duplicatedKey)) {
            return new error_1.ECError(error_1.ECErrorOriginType.User, error_1.ECErrorType.ValueAlreadyExists, new Error(this.map.get(duplicatedKey)));
        }
        else {
            return new error_1.ECError(error_1.ECErrorOriginType.User, error_1.ECErrorType.ValueAlreadyExists, new Error(`Duplicated key was used (${duplicatedKey}).`));
        }
    }
}
exports.ECSQLDuplicateKeyHelper = ECSQLDuplicateKeyHelper;
