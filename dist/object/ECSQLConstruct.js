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
class ECSQLConstruct extends collections_1.ECPrototype {
    constructor(key, value, optional) {
        super();
        this.key = key;
        this.value = value;
        this.optional = optional === undefined ? false : optional;
    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
    getOptional() {
        return this.optional;
    }
}
exports.ECSQLConstruct = ECSQLConstruct;
