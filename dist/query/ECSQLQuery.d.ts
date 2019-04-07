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
import { ECSQLFilter } from "./ECSQLFilter";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECSQLSort } from "./ECSQLSort";
import { ECSQLResponse } from "./ECSQLResponse";
import { ECSQLCondition } from "../ECSQLCondition";
import { ECPrototype, ECArray } from "@elijahjcobb/collections";
/**
 * A class that queries the SQL database from filters, a sort, limit, and conditionals.
 */
export declare class ECSQLQuery extends ECPrototype implements ECSQLCommandable {
    private readonly table;
    private filters;
    private sort;
    private limit;
    private conditional;
    /**
     * Create a new ECSQLQuery instance.
     * @param {string} table
     */
    constructor(table: string);
    /**
     * Set the limit of rows that will be returned.
     * @param {number} limit The number of rows to be returned.
     */
    setLimit(limit: number): void;
    /**
     * Se the conditional for the filters that are present.
     * @param {ECSQLCondition} conditional The conditional for the filters.
     */
    setConditional(conditional: ECSQLCondition): void;
    /**
     * Add an ECSQLFilter instance to the ECSQLQuery.
     * @param {ECSQLFilter} filter The filter instance to be added.
     */
    addFilter(filter: ECSQLFilter): void;
    /**
     * Set the ECSQLSort instance to be used in the ECSQLQuery.
     * @param {ECSQLSort} sort The sort method to be used.
     */
    setSort(sort: ECSQLSort): void;
    /**
     * Generate the entire SQL command from all filters, sort, and limit.
     * @param {boolean} isCount Whether or not there is a count limit.
     * @return {string} The SQL command.
     */
    generateSQLCommand(isCount?: boolean): string;
    /**
     * Get the object with a specified id.
     * @param {string} id The id of the object to be retrieved.
     * @param {boolean} allowUndefined Whether or not an error should be thrown if the object is undefined.
     * @return {Promise<ECSQLResponse>} A promise containing a ECSQLResponse instance.
     */
    getObjectWithId(id: string, allowUndefined?: boolean): Promise<ECSQLResponse>;
    /**
     * Get the first object from the query instance.
     * @param {boolean} allowUndefined Whether or not an error should be thrown if the object is undefined.
     * @return {Promise<ECSQLResponse>} A promise containing a ECSQLResponse instance.
     */
    getFirstObject(allowUndefined?: boolean): Promise<ECSQLResponse>;
    /**
     * Get all objects within the query whose id is contained in the ids specified.
     * @param {string[]} ids A native JavaScript string array of ids.
     * @return {Promise<ECArray<ECSQLResponse>>} A promise containing an ECArray of ECSQLResponse instances.
     */
    getObjectsWithIds(ids: string[]): Promise<ECArray<ECSQLResponse>>;
    /**
     * Get all objects that follow the specified query.
     * @return {Promise<ECArray<ECSQLResponse>>} A promise returning an ECArray of ECSQLResponse instances.
     */
    getAllObjects(): Promise<ECArray<ECSQLResponse>>;
    /**
     * Count how many objects follow the specified query.
     * @return {Promise<number>} A promise containing a number.
     */
    count(): Promise<number>;
    /**
     * Check if the query returns any objects at all.
     * @return {Promise<boolean>} A promise containing a boolean.
     */
    exists(): Promise<boolean>;
}
