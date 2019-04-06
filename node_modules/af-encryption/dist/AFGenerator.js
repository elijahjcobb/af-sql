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
/**
 * An abstract class with static helper methods to generate random objects using crypto.
 */
class AFGenerator {
    /**
     * Generate a randomId with length 16 with lowercase letters, uppercase letters, and numbers.
     * @return {string} A random string.
     */
    static randomId() {
        return AFGenerator.randomString(16, "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890");
    }
    /**
     * Generate random file name.
     * @return {string}
     */
    static randomFileName() {
        return this.randomString(8);
    }
    /**
     * Generates a random code of length 6 with numbers.
     * @return {string} A random code.
     */
    static randomCode() {
        return this.randomString(6, "1234567890");
    }
    /**
     * Generate a random salt.
     * @return {string} A random salt.
     */
    static randomSalt() {
        return this.randomString(32, "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890");
    }
    /**
     * Generate a random string with specified length and specified characters.
     * @param {number} length The length of the string.
     * @param {string} chars The characters available to be used in the string.
     * @return {string} A random string.
     */
    static randomString(length, chars) {
        chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        let charsArray = chars.split("");
        let s = "";
        for (let i = 0; i < length; i++) {
            let randomNumber = Math.random();
            let randomIndexUnRounded = randomNumber * chars.length;
            let n = Math.floor(randomIndexUnRounded);
            let c = charsArray[n];
            s += c;
        }
        return s;
    }
}
exports.AFGenerator = AFGenerator;
