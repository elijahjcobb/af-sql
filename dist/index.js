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
 * Imports
 */
const ECSQLDatabase_1 = require("./ECSQLDatabase");
exports.ECSQLDatabase = ECSQLDatabase_1.ECSQLDatabase;
/**
 * Object Representation
 */
var ECSQLObject_1 = require("./object/ECSQLObject");
exports.ECSQLObject = ECSQLObject_1.ECSQLObject;
var ECSQLFilter_1 = require("./query/ECSQLFilter");
exports.ECSQLFilter = ECSQLFilter_1.ECSQLFilter;
var ECSQLOperator_1 = require("./query/ECSQLOperator");
exports.ECSQLOperator = ECSQLOperator_1.ECSQLOperator;
var ECSQLQuery_1 = require("./query/ECSQLQuery");
exports.ECSQLQuery = ECSQLQuery_1.ECSQLQuery;
var ECSQLResponse_1 = require("./query/ECSQLResponse");
exports.ECSQLResponse = ECSQLResponse_1.ECSQLResponse;
var ECSQLSort_1 = require("./query/ECSQLSort");
exports.ECSQLSort = ECSQLSort_1.ECSQLSort;
var ECSQLSortDirection_1 = require("./query/ECSQLSortDirection");
exports.ECSQLSortDirection = ECSQLSortDirection_1.ECSQLSortDirection;
var ECSQLCondition_1 = require("./ECSQLCondition");
exports.ECSQLCondition = ECSQLCondition_1.ECSQLCondition;
var ECSQLDuplicateKeyHelper_1 = require("./ECSQLDuplicateKeyHelper");
exports.ECSQLDuplicateKeyHelper = ECSQLDuplicateKeyHelper_1.ECSQLDuplicateKeyHelper;
/**
 * Initialize a database connection.
 * @param {ECSQLInitObject} initObject A initialization object that follows ECSQLInitObject type requirements.
 */
let initHandler = (initObject) => {
    ECSQLDatabase_1.ECSQLDatabase.init(initObject);
};
exports.ECSQLInitialize = initHandler;
