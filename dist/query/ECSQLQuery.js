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
const ECSQLFilter_1 = require("./ECSQLFilter");
const ECSQLDatabase_1 = require("../ECSQLDatabase");
const ECSQLResponse_1 = require("./ECSQLResponse");
const ECSQLOperator_1 = require("./ECSQLOperator");
const collections_1 = require("@elijahjcobb/collections");
const error_1 = require("@elijahjcobb/error");
/**
 * A class that queries the SQL database from filters, a sort, limit, and conditionals.
 */
class ECSQLQuery extends collections_1.ECPrototype {
    /**
     * Create a new ECSQLQuery instance.
     * @param {string} table
     */
    constructor(table) {
        super();
        this.table = table;
        this.filters = new collections_1.ECArrayList();
    }
    /**
     * Set the limit of rows that will be returned.
     * @param {number} limit The number of rows to be returned.
     */
    setLimit(limit) {
        this.limit = limit;
    }
    /**
     * Se the conditional for the filters that are present.
     * @param {ECSQLCondition} conditional The conditional for the filters.
     */
    setConditional(conditional) {
        this.conditional = conditional;
    }
    /**
     * Add an ECSQLFilter instance to the ECSQLQuery.
     * @param {ECSQLFilter} filter The filter instance to be added.
     */
    addFilter(filter) {
        this.filters.add(filter);
    }
    /**
     * Set the ECSQLSort instance to be used in the ECSQLQuery.
     * @param {ECSQLSort} sort The sort method to be used.
     */
    setSort(sort) {
        this.sort = sort;
    }
    /**
     * Generate the entire SQL command from all filters, sort, and limit.
     * @param {boolean} isCount Whether or not there is a count limit.
     * @return {string} The SQL command.
     */
    generateSQLCommand(isCount) {
        let command = "";
        if (isCount) {
            command += "SELECT COUNT(*) FROM ";
        }
        else {
            command += "SELECT * FROM ";
        }
        command += this.table;
        let conditional = this.conditional || "AND";
        if (this.filters.size() > 0) {
            command += " WHERE ";
            let filterCommands = [];
            this.filters.forEach((filter) => filterCommands.push(filter.generateSQLCommand()));
            command += filterCommands.join(" " + conditional + " ");
        }
        if (this.sort) {
            command += " ";
            command += this.sort.generateSQLCommand();
        }
        if (this.limit !== undefined) {
            command += " LIMIT ";
            command += this.limit;
        }
        command += ";";
        return command;
    }
    /**
     * Get the object with a specified id.
     * @param {string} id The id of the object to be retrieved.
     * @param {boolean} allowUndefined Whether or not an error should be thrown if the object is undefined.
     * @return {Promise<ECSQLResponse>} A promise containing a ECSQLResponse instance.
     */
    getObjectWithId(id, allowUndefined) {
        return __awaiter(this, void 0, void 0, function* () {
            this.limit = 1;
            this.filters.removeAll();
            this.sort = undefined;
            this.filters.add(new ECSQLFilter_1.ECSQLFilter("id", ECSQLOperator_1.ECSQLOperator.Equal, id));
            let objects = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand());
            let responses = new collections_1.ECArrayList();
            objects.forEach((object) => responses.add(new ECSQLResponse_1.ECSQLResponse(this.table, object)));
            let response = responses.get(0);
            if (!response && !allowUndefined)
                throw error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.FrontEnd, error_1.ECErrorType.ObjectDoesNotExist, new Error(`${this.table} with id '${id}' does not exist.`));
            return response;
        });
    }
    /**
     * Get the first object from the query instance.
     * @param {boolean} allowUndefined Whether or not an error should be thrown if the object is undefined.
     * @return {Promise<ECSQLResponse>} A promise containing a ECSQLResponse instance.
     */
    getFirstObject(allowUndefined) {
        return __awaiter(this, void 0, void 0, function* () {
            this.limit = 1;
            let objects = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand());
            let responses = new collections_1.ECArrayList();
            objects.forEach((object) => responses.add(new ECSQLResponse_1.ECSQLResponse(this.table, object)));
            let response = responses.get(0);
            if (!response && !allowUndefined)
                throw error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.FrontEnd, error_1.ECErrorType.ObjectDoesNotExist, new Error(`Query for ${this.table.toLowerCase()} does not return an object.`));
            return response;
        });
    }
    /**
     * Get all objects within the query whose id is contained in the ids specified.
     * @param {string[]} ids A native JavaScript string array of ids.
     * @return {Promise<ECArray<ECSQLResponse>>} A promise containing an ECArray of ECSQLResponse instances.
     */
    getObjectsWithIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            this.limit = undefined;
            this.filters.removeAll();
            this.sort = undefined;
            this.filters.add(new ECSQLFilter_1.ECSQLFilter("id", ECSQLOperator_1.ECSQLOperator.ContainedIn, ids));
            let objects = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand());
            let responses = new collections_1.ECArrayList();
            objects.forEach((object) => responses.add(new ECSQLResponse_1.ECSQLResponse(this.table, object)));
            return responses.toAFArray();
        });
    }
    /**
     * Get all objects that follow the specified query.
     * @return {Promise<ECArray<ECSQLResponse>>} A promise returning an ECArray of ECSQLResponse instances.
     */
    getAllObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand());
            let responses = new collections_1.ECArrayList();
            objects.forEach((object) => responses.add(new ECSQLResponse_1.ECSQLResponse(this.table, object)));
            return responses.toAFArray();
        });
    }
    /**
     * Count how many objects follow the specified query.
     * @return {Promise<number>} A promise containing a number.
     */
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            let responses = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand(true));
            let responseObject = responses[0];
            return responseObject["COUNT(*)"];
        });
    }
    /**
     * Check if the query returns any objects at all.
     * @return {Promise<boolean>} A promise containing a boolean.
     */
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.count()) > 0;
        });
    }
}
exports.ECSQLQuery = ECSQLQuery;
