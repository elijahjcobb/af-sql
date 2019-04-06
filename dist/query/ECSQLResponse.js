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
class ECSQLResponse extends collections_1.ECPrototype {
    constructor(table, content) {
        super();
        let formattedContent = new collections_1.ECMap();
        let keys = Object.keys(content);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = content[key];
            if (typeof value === "string") {
                value = decodeURIComponent(value);
                try {
                    let json = JSON.parse(value);
                    formattedContent.set(key, json);
                }
                catch (e) {
                    formattedContent.set(key, value);
                }
            }
            else {
                formattedContent.set(key, value);
            }
        }
        this.content = formattedContent;
        this.table = table;
        this.table = table;
    }
    getContent() {
        return this.content;
    }
    getTable() {
        return this.table;
    }
}
exports.ECSQLResponse = ECSQLResponse;
