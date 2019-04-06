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
const Cryptography = require("crypto");
const af_error_1 = require("af-error");
/**
 * AFCipher handles encryption and decryption in a easy to use interface. Supply a password and an optional salt to create a cipher instance.
 */
class AFCipher {
    /**
     * Create a new AFCipher instance.
     * @param {string} password A password used to encrypt data.
     * @param {string} salt An optional salt. Use for greater security.
     */
    constructor(password, salt) {
        this.iv = Buffer.alloc(16, 0);
        this.algo = "aes-256-cbc";
        this.password = Buffer.from(password, "utf8");
        this.salt = salt || "";
    }
    /**
     * Encrypt data with a AFCipher instance.
     * @param {Buffer} data Data to encrypt as a Buffer.
     * @return {Buffer} The encrypted data returned as a Buffer.
     */
    encrypt(data) {
        try {
            const key = Cryptography.scryptSync(this.password, this.salt, 32);
            const cipher = Cryptography.createCipheriv(this.algo, key, this.iv);
            let encrypted = cipher.update(data.toString("binary"), "binary", "hex");
            encrypted += cipher.final("hex");
            return Buffer.from(encrypted, "hex");
        }
        catch (e) {
            throw af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.FailedToEncryptValue, new Error(`Could not encrypt buffer with length ${data.length}.`));
        }
    }
    /**
     * Decrypt data with a AFCipher instance.
     * @param {Buffer} data Data to decrypt as a Buffer.
     * @return {Buffer} The decrypted data returned as a Buffer.
     */
    decrypt(data) {
        try {
            const key = Cryptography.scryptSync(this.password, this.salt, 32);
            const decipher = Cryptography.createDecipheriv(this.algo, key, this.iv);
            let decrypted = decipher.update(data, undefined, "utf8");
            decrypted += decipher.final("utf8");
            return Buffer.from(decrypted, "utf8");
        }
        catch (e) {
            throw af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.FailedToDecryptValue, new Error(`Could not decrypt buffer with length ${data.length}.`));
        }
    }
}
exports.AFCipher = AFCipher;
