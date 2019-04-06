"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const ECSQLDatabase_1 = require("./ECSQLDatabase");
exports.ECSQLDatabase = ECSQLDatabase_1.ECSQLDatabase;
//Object
var ECSQLConstruct_1 = require("./object/ECSQLConstruct");
exports.ECSQLConstruct = ECSQLConstruct_1.ECSQLConstruct;
var ECSQLObject_1 = require("./object/ECSQLObject");
exports.ECSQLObject = ECSQLObject_1.ECSQLObject;
var ECSQLFilter_1 = require("./query/ECSQLFilter");
exports.ECSQLFilter = ECSQLFilter_1.ECSQLFilter;
var ECSQLGenericQuery_1 = require("./query/ECSQLGenericQuery");
exports.ECSQLGenericQuery = ECSQLGenericQuery_1.ECSQLGenericQuery;
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
let initHandler = (initObject) => {
    ECSQLDatabase_1.ECSQLDatabase.init(initObject);
};
exports.ECSQLInitialize = initHandler;
