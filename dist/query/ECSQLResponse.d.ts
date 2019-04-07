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
import { ECMap, ECPrototype } from "@elijahjcobb/collections";
/**
 * This class is the instance that is returned by any ECSQLQuery.
 */
export declare class ECSQLResponse extends ECPrototype {
    private readonly content;
    private readonly table;
    /**
     * Create a new instance of ECSQLResponse.
     * @param {string} table The table the row belongs to.
     * @param {object} content The data from the row.
     */
    constructor(table: string, content: object);
    /**
     * Get the content from the table row.
     * @return {ECMap<string, any>} An ECMap instance containing the data.
     */
    getContent(): ECMap<string, any>;
    /**
     * Get the table name the row belongs to.
     * @return {string} The name of the table.
     */
    getTable(): string;
}
