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
 * Defines different errors that are possible.
 */
var AFErrorType;
(function (AFErrorType) {
    AFErrorType[AFErrorType["FailedToEncryptValue"] = 0] = "FailedToEncryptValue";
    AFErrorType[AFErrorType["FailedToDecryptValue"] = 1] = "FailedToDecryptValue";
    AFErrorType[AFErrorType["FailedToHashValue"] = 2] = "FailedToHashValue";
    AFErrorType[AFErrorType["FailedToStringifyJSON"] = 3] = "FailedToStringifyJSON";
    AFErrorType[AFErrorType["FailedToParseJSON"] = 4] = "FailedToParseJSON";
    AFErrorType[AFErrorType["ParameterNotFound"] = 5] = "ParameterNotFound";
    AFErrorType[AFErrorType["ParameterIncorrectFormat"] = 6] = "ParameterIncorrectFormat";
    AFErrorType[AFErrorType["ParameterDoesNotMatchRegex"] = 7] = "ParameterDoesNotMatchRegex";
    AFErrorType[AFErrorType["PasswordRequired"] = 8] = "PasswordRequired";
    AFErrorType[AFErrorType["PasswordIncorrect"] = 9] = "PasswordIncorrect";
    AFErrorType[AFErrorType["InternalUnHandled"] = 10] = "InternalUnHandled";
    AFErrorType[AFErrorType["ValueAlreadyExists"] = 11] = "ValueAlreadyExists";
    AFErrorType[AFErrorType["ObjectDoesNotExist"] = 12] = "ObjectDoesNotExist";
    AFErrorType[AFErrorType["InternalSQLError"] = 13] = "InternalSQLError";
    AFErrorType[AFErrorType["ObjectWasNotUpdated"] = 14] = "ObjectWasNotUpdated";
    AFErrorType[AFErrorType["UsernameIncorrect"] = 15] = "UsernameIncorrect";
    AFErrorType[AFErrorType["FailedToSendEmail"] = 16] = "FailedToSendEmail";
    AFErrorType[AFErrorType["PermissionDenied"] = 17] = "PermissionDenied";
    AFErrorType[AFErrorType["TokenIsExpired"] = 18] = "TokenIsExpired";
    AFErrorType[AFErrorType["FileToLarge"] = 19] = "FileToLarge";
    AFErrorType[AFErrorType["FileIncorrectType"] = 20] = "FileIncorrectType";
    AFErrorType[AFErrorType["FileDoesNotExist"] = 21] = "FileDoesNotExist";
    AFErrorType[AFErrorType["NullOrUndefined"] = 22] = "NullOrUndefined";
    AFErrorType[AFErrorType["NoAssociation"] = 23] = "NoAssociation";
    AFErrorType[AFErrorType["AnswerNotValid"] = 24] = "AnswerNotValid";
    AFErrorType[AFErrorType["InvalidRequest"] = 25] = "InvalidRequest";
    AFErrorType[AFErrorType["EndpointDoesNotExist"] = 26] = "EndpointDoesNotExist";
    AFErrorType[AFErrorType["LockedObjectManipulated"] = 27] = "LockedObjectManipulated";
})(AFErrorType = exports.AFErrorType || (exports.AFErrorType = {}));
/**
 * Defined different locations errors can occur.
 */
var AFErrorOriginType;
(function (AFErrorOriginType) {
    AFErrorOriginType[AFErrorOriginType["SQLServer"] = 0] = "SQLServer";
    AFErrorOriginType[AFErrorOriginType["BackEnd"] = 1] = "BackEnd";
    AFErrorOriginType[AFErrorOriginType["FrontEnd"] = 2] = "FrontEnd";
    AFErrorOriginType[AFErrorOriginType["User"] = 3] = "User";
    AFErrorOriginType[AFErrorOriginType["Unhandled"] = 4] = "Unhandled";
})(AFErrorOriginType = exports.AFErrorOriginType || (exports.AFErrorOriginType = {}));
