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
const af_collections_1 = require("af-collections");
const af_error_1 = require("af-error");
class AFDBDuplicateKeyHelper {
    constructor() {
        this.map = new af_collections_1.AFMap();
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
            return af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.User, af_error_1.AFErrorType.ValueAlreadyExists, new Error(this.map.get(duplicatedKey)));
        }
        else {
            return af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.User, af_error_1.AFErrorType.ValueAlreadyExists, new Error(`Duplicated key was used (${duplicatedKey}).`));
        }
    }
    getError(error) {
        let message = error["sqlMessage"];
        let duplicatedKey = message.substring(message.indexOf("key '") + 5, message.length - 1).toLowerCase();
        if (this.map.containsKey(duplicatedKey)) {
            return new af_error_1.AFError(af_error_1.AFErrorOriginType.User, af_error_1.AFErrorType.ValueAlreadyExists, new Error(this.map.get(duplicatedKey)));
        }
        else {
            return new af_error_1.AFError(af_error_1.AFErrorOriginType.User, af_error_1.AFErrorType.ValueAlreadyExists, new Error(`Duplicated key was used (${duplicatedKey}).`));
        }
    }
}
exports.AFDBDuplicateKeyHelper = AFDBDuplicateKeyHelper;
