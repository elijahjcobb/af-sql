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
import { ECErrorStack } from "@elijahjcobb/error";
/**
 * A type safe object to initialize a new database instance.
 */
export declare type ECSQLInitObject = {
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
};
/**
 * A class to communicate with a SQL database.
 */
export declare class ECSQLDatabase {
    private static databasePool;
    /**
     * Query the database.
     * @param {string} command The command to be sent to the database.
     * @return {Promise<any>} A promise containing type any.
     */
    static query(command: string): Promise<any>;
    /**
     * Handle errors and wrap when needed.
     * @param {object} error The error object.
     * @return {ECErrorStack | boolean} Returns an ACErrorStack instance or a boolean if the offending error was a
     * primary key index. Primary keys are provided with key "id" and offending duplicates are handled internally.
     */
    static handleError(error: object): ECErrorStack | boolean;
    /**
     * A helper method to initialize the communication with the database.
     * @param {ECSQLInitObject} initObject The initialization object.
     */
    static init(initObject: ECSQLInitObject): void;
}
