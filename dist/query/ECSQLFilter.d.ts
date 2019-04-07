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
import { ECSQLOperator } from "./ECSQLOperator";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECPrototype } from "@elijahjcobb/collections";
/**
 * A class representing a filter to be used in ECSQLQuery instances to filter the query by a key and value using the provided operator.
 */
export declare class ECSQLFilter extends ECPrototype implements ECSQLCommandable {
    private readonly key;
    private readonly value;
    private readonly operator;
    /**
     * Create an instance of ECSQLFilter.
     * @param {string} key The key to filter.
     * @param {ECSQLOperator} operator The operator to be used.
     * @param {string | number | any[]} value The value to be operated against.
     */
    constructor(key: string, operator: ECSQLOperator, value: string | number | any[]);
    /**
     * Generate the SQL parameter that will be added to the main ECSQLQuery SQL command string.
     * @return {string} A SQL parameter string.
     */
    generateSQLCommand(): string;
}
