"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("@elijahjcobb/collections");
const error_1 = require("@elijahjcobb/error");
class ECSQLDuplicateKeyHelper {
    constructor() {
        this.map = new collections_1.ECMap();
        this.map.set("customer_email_uindex", "A user with this email already exists.");
        this.map.set("customer_phone_uindex", "A user with this phone already exists.");
        this.map.set("client_email_uindex", "A client with this email already exists.");
        this.map.set("client_phone_uindex", "A client with this phone already exists.");
        this.map.set("test_foo_uindex", "A test with this foo already exists.");
        this.map.set("primary", "An object with this id already exists.");
    }
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
