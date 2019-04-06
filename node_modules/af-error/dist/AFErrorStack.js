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
const AFError_1 = require("./AFError");
const AFErrorTypes_1 = require("./AFErrorTypes");
const af_collections_1 = require("af-collections");
/**
 * A class representing a collection of AFError instances.
 */
class AFErrorStack {
    constructor() {
        this.trace = new af_collections_1.AFArrayList();
    }
    /**
     * Tack on a generic error message to this stack instance.
     * @return {AFErrorStack} The instance.
     */
    withGenericError() {
        this.addGenericError();
        return this;
    }
    /**
     * Get the trace of the error stack instance.
     * @return {AFArrayList<AFError>} An array list of instances of AFError.
     */
    getTrace() {
        return this.trace;
    }
    /**
     * Add an AFError instance to the stack.
     * @param {AFError} err The error to be added to the stack.
     */
    addError(err) {
        this.trace.insert(err, 0);
    }
    /**
     * Create an error from a message and type and add to the error stack.
     * @param {Error} error An error instance.
     * @param {AFErrorOriginType} origin The origin of the error.
     * @param {AFErrorTypes} type The type of the error.
     */
    add(origin, type, error) {
        this.addError(new AFError_1.AFError(origin, type, error));
    }
    /**
     * Add a generic error to the error stack.
     */
    addGenericError() {
        this.addError(new AFError_1.AFError(AFErrorTypes_1.AFErrorOriginType.Unhandled, AFErrorTypes_1.AFErrorType.InternalUnHandled, new Error("Internal server error.")));
    }
    /**
     * Print the error stack to the console using the console.error() channel.
     */
    print() {
        let trace = "";
        this.trace.forEach((error) => {
            trace += `ERROR: ${error.getMessage()} (origin: ${error.getOriginString()}, type: ${error.getTypeString()})\n${error.getStackString()}\n`;
        });
        console.error(trace);
    }
    /**
     * Get the AFError instance at the top of the trace for the client.
     * @return {AFError} The client facing error.
     */
    getErrorForClient() {
        return this.trace.get(0);
    }
    /**
     * Create a new AFErrorStack instance.
     * @return {AFErrorStack} A new instance of AFErrorStack.
     */
    static new() {
        return new AFErrorStack();
    }
    /**
     * Create a new AFErrorStack instance that is already populated with an AFError.
     * @param {AFErrorOriginType} origin The origin of the error.
     * @param {AFErrorType} type The type of error.
     * @param {Error} error An error instance.
     * @return {AFErrorStack} A new AFErrorStack instance.
     */
    static newWithMessageAndType(origin, type, error) {
        let stack = new AFErrorStack();
        stack.add(origin, type, error);
        return stack;
    }
}
exports.AFErrorStack = AFErrorStack;
