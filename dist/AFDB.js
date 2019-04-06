"use strict";
/**
 *
 * Ampel Feedback
 * Formative Developments, LLC.
 * 2018
 *
 * Elijah Cobb
 * elijah@ampelfeedback.com
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
const af_error_1 = require("af-error");
const AFDBDuplicateKeyHelper_1 = require("./AFDBDuplicateKeyHelper");
class AFDB {
    static query(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                AFDB.databasePool.query(command, (error, results) => {
                    if (!error) {
                        resolve(results);
                    }
                    else {
                        reject(AFDB.handleError(error));
                    }
                });
            });
        });
    }
    static handleError(error) {
        let code = error["errno"];
        let sqlMessage = error["sqlMessage"];
        let message = error["message"];
        let stack = new af_error_1.AFErrorStack();
        if (code === 1062) {
            if (sqlMessage.indexOf("'PRIMARY'") !== -1) {
                return true;
            }
            else {
                stack.addError(new AFDBDuplicateKeyHelper_1.AFDBDuplicateKeyHelper().getError(error));
            }
        }
        else {
            if (code === "ECONNREFUSED") {
                stack.add(af_error_1.AFErrorOriginType.SQLServer, af_error_1.AFErrorType.InternalSQLError, new Error("The SQL Database is not online."));
            }
            else {
                stack.add(af_error_1.AFErrorOriginType.SQLServer, af_error_1.AFErrorType.InternalSQLError, new Error(`Code: ${code}, SQLMessage: ${sqlMessage}, Message: ${message}`));
            }
            stack.add(af_error_1.AFErrorOriginType.SQLServer, af_error_1.AFErrorType.InternalSQLError, new Error("Internal Database Error."));
        }
        return stack;
    }
    static init(initObject) {
        AFDB.databasePool = SQL.createPool({
            connectionLimit: 100,
            host: initObject.host,
            user: initObject.username,
            password: initObject.password,
            database: initObject.database,
            port: 0
        });
    }
}
exports.AFDB = AFDB;
