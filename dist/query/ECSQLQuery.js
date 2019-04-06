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
const ECSQLFilter_1 = require("./ECSQLFilter");
const ECSQLDatabase_1 = require("../ECSQLDatabase");
const ECSQLResponse_1 = require("./ECSQLResponse");
const ECSQLOperator_1 = require("./ECSQLOperator");
const collections_1 = require("@elijahjcobb/collections");
const error_1 = require("@elijahjcobb/error");
class ECSQLQuery extends collections_1.ECPrototype {
    constructor(table) {
        super();
        this.table = table;
        this.filters = new collections_1.ECArrayList();
    }
    setLimit(limit) {
        this.limit = limit;
    }
    setConditional(conditional) {
        this.conditional = conditional;
    }
    addFilter(filter) {
        this.filters.add(filter);
    }
    setSort(sort) {
        this.sort = sort;
    }
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
    getAllObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand());
            let responses = new collections_1.ECArrayList();
            objects.forEach((object) => responses.add(new ECSQLResponse_1.ECSQLResponse(this.table, object)));
            return responses.toAFArray();
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            let responses = yield ECSQLDatabase_1.ECSQLDatabase.query(this.generateSQLCommand(true));
            let responseObject = responses[0];
            return responseObject["COUNT(*)"];
        });
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.count()) > 0;
        });
    }
}
exports.ECSQLQuery = ECSQLQuery;
