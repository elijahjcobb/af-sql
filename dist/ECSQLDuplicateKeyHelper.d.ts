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
import { ECErrorStack, ECError } from "@elijahjcobb/error";
/**
 * A class to handle duplication errors on a column marked as unique.
 *
 * This class will be abstracted in a later version to allow custom keys other than the ones currently provided.
 */
export declare class ECSQLDuplicateKeyHelper {
    private map;
    /**
     * Create a new ECSQLDuplicateKeyHelper instance.
     */
    constructor();
    /**
     * Get the error stack that should be created from the offending key.
     * @param {object} error The error object.
     * @return {ECErrorStack} An ECErrorStack instance.
     */
    getErrorStack(error: object): ECErrorStack;
    /**
     * Ger the error that should be created from the offending key.
     * @param {object} error The error object.
     * @return {ECError} An ECError instance.
     */
    getError(error: object): ECError;
}
