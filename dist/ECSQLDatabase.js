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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQL = require("mysql");
const error_1 = require("@elijahjcobb/error");
const ECSQLDuplicateKeyHelper_1 = require("./ECSQLDuplicateKeyHelper");
/**
 * A class to communicate with a SQL database.
 */
class ECSQLDatabase {
    /**
     * Query the database.
     * @param {string} command The command to be sent to the database.
     * @return {Promise<any>} A promise containing type any.
     */
    static query(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                ECSQLDatabase.databasePool.query(command, (error, results) => {
                    if (!error) {
                        resolve(results);
                    }
                    else {
                        reject(ECSQLDatabase.handleError(error));
                    }
                });
            });
        });
    }
    /**
     * Handle errors and wrap when needed.
     * @param {object} error The error object.
     * @return {ECErrorStack | boolean} Returns an ACErrorStack instance or a boolean if the offending error was a
     * primary key index. Primary keys are provided with key "id" and offending duplicates are handled internally.
     */
    static handleError(error) {
        let code = error["errno"];
        let sqlMessage = error["sqlMessage"];
        let message = error["message"];
        let stack = new error_1.ECErrorStack();
        if (code === 1062) {
            if (sqlMessage.indexOf("'PRIMARY'") !== -1) {
                return true;
            }
            else {
                stack.addError(new ECSQLDuplicateKeyHelper_1.ECSQLDuplicateKeyHelper().getError(error));
            }
        }
        else {
            if (code === "ECONNREFUSED") {
                stack.add(error_1.ECErrorOriginType.SQLServer, error_1.ECErrorType.InternalSQLError, new Error("The SQL Database is not online."));
            }
            else {
                stack.add(error_1.ECErrorOriginType.SQLServer, error_1.ECErrorType.InternalSQLError, new Error(`Code: ${code}, SQLMessage: ${sqlMessage}, Message: ${message}`));
            }
            stack.add(error_1.ECErrorOriginType.SQLServer, error_1.ECErrorType.InternalSQLError, new Error("Internal Database Error."));
        }
        return stack;
    }
    /**
     * A helper method to initialize the communication with the database.
     * @param {ECSQLInitObject} initObject The initialization object.
     */
    static init(initObject) {
        ECSQLDatabase.databasePool = SQL.createPool({
            connectionLimit: 100,
            host: initObject.host,
            user: initObject.username,
            password: initObject.password,
            database: initObject.database,
            port: initObject.port
        });
    }
}
exports.ECSQLDatabase = ECSQLDatabase;
