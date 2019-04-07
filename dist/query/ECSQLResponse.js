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
/**
 * This class is the instance that is returned by any ECSQLQuery.
 */
class ECSQLResponse extends collections_1.ECPrototype {
    /**
     * Create a new instance of ECSQLResponse.
     * @param {string} table The table the row belongs to.
     * @param {object} content The data from the row.
     */
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
    }
    /**
     * Get the content from the table row.
     * @return {ECMap<string, any>} An ECMap instance containing the data.
     */
    getContent() {
        return this.content;
    }
    /**
     * Get the table name the row belongs to.
     * @return {string} The name of the table.
     */
    getTable() {
        return this.table;
    }
}
exports.ECSQLResponse = ECSQLResponse;
