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
/**
 * An abstract class with static helper methods to generate random objects using crypto.
 */
export declare class AFGenerator {
    /**
     * Generate a randomId with length 16 with lowercase letters, uppercase letters, and numbers.
     * @return {string} A random string.
     */
    static randomId(): string;
    /**
     * Generate random file name.
     * @return {string}
     */
    static randomFileName(): string;
    /**
     * Generates a random code of length 6 with numbers.
     * @return {string} A random code.
     */
    static randomCode(): string;
    /**
     * Generate a random salt.
     * @return {string} A random salt.
     */
    static randomSalt(): string;
    /**
     * Generate a random string with specified length and specified characters.
     * @param {number} length The length of the string.
     * @param {string} chars The characters available to be used in the string.
     * @return {string} A random string.
     */
    static randomString(length: number, chars?: string): string;
}
