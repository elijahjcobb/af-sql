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
const AFDB_1 = require("../AFDB");
const af_encryption_1 = require("af-encryption");
const AFDBQuery_1 = require("../query/AFDBQuery");
const af_error_1 = require("af-error");
const af_collections_1 = require("af-collections");
class AFDBObject extends af_collections_1.AFObject {
    /**
     * Get a map that represents this database object that is formatted for the SQL database.
     * @return {AFMap<string, number | string | boolean>}
     */
    getFormattedMap() {
        let unformattedMap = this.encode();
        let map = new af_collections_1.AFMap();
        unformattedMap.forEach((key, value) => {
            if (value === null || value === undefined) {
                map.set(key, "null");
            }
            else {
                let newValue;
                if (typeof value === "object") {
                    try {
                        let json = JSON.stringify(value);
                        newValue = "'" + json.replace(RegExp("'", "g"), "\\'") + "'";
                    }
                    catch (e) {
                        let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.FailedToStringifyJSON, new Error(`Could not stringify JSON for key: ${key}.`));
                        stack.addGenericError();
                        throw stack;
                    }
                }
                else if (typeof value === "string") {
                    newValue = "'" + value.replace(RegExp("'", "g"), "\\'") + "'";
                }
                else {
                    newValue = value;
                }
                map.set(key, newValue);
            }
        });
        return map;
    }
    /**
     * Update the value for a specific item on this object by key.
     * @param {string} key
     * @return {Promise<void>}
     */
    updateKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let formattedMap = this.getFormattedMap();
            let value = formattedMap.get(key);
            if (value == undefined) {
                let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.InvalidRequest, new Error(`You cannot update '${key}' on ${this.getTable()} because ${this.getTable()} does not have a value for '${key}'.`));
                stack.addGenericError();
                throw stack;
            }
            let updatedAt = Date.now();
            let command = `UPDATE ${this.getTable()} SET ${key}=${value}, updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;
            yield AFDB_1.AFDB.query(command);
            this.updatedAt = updatedAt;
            yield this.onUpdated();
        });
    }
    decodeInternalStructure(content) {
        this.id = content.get("id");
        try {
            this.updatedAt = parseInt(content.get("updatedAt"));
        }
        catch (e) { }
        try {
            this.createdAt = parseInt(content.get("createdAt"));
        }
        catch (e) { }
        if (this.createdAt < 10 || this.createdAt === null || this.createdAt === undefined)
            this.createdAt = Date.now();
        if (this.updatedAt < 10 || this.updatedAt === null || this.updatedAt === undefined)
            this.updatedAt = Date.now();
    }
    populateFromDatabaseResponse(response) {
        let content = response.getContent();
        this.decodeInternalStructure(content);
        this.decode(content);
    }
    addInternalStructureToMap(map) {
        map.set("id", this.id);
        map.set("createdAt", {
            value: this.createdAt,
            readable: new Date(this.createdAt).toString()
        });
        map.set("updatedAt", {
            value: this.updatedAt,
            readable: new Date(this.updatedAt).toString()
        });
        return map;
    }
    /**
     * Create a query using the table this object is contained in.
     * @return {AFDBQuery}
     */
    createQuery() {
        return new AFDBQuery_1.AFDBQuery(this.getTable());
    }
    /**
     * Convert this object to a JSON representation.
     * @return {object}
     */
    toJSON() {
        let map = this.toMap();
        map.set("id", this.id);
        map.set("createdAt", {
            value: this.createdAt,
            readable: new Date(this.createdAt).toString()
        });
        map.set("updatedAt", {
            value: this.updatedAt,
            readable: new Date(this.updatedAt).toString()
        });
        return map.toJSON();
    }
    /**
     * Convert this to a Map.
     * @return {AFMap<string, any>}
     */
    toMap() {
        return this.encode();
    }
    /**
     * Create this instance in the database table this instance belongs to.
     * @return {Promise<void>}
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id !== undefined && this.id !== null) {
                let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.InvalidRequest, new Error(`You cannot create a ${this.getTable()} that already exists in the database.`));
                stack.addGenericError();
                throw stack;
            }
            let map = this.getFormattedMap();
            let recurseCount = 0;
            let createProcess = () => __awaiter(this, void 0, void 0, function* () {
                let keys = map.keys().toAFArrayList();
                let values = map.values().toAFArrayList();
                let newID = af_encryption_1.AFGenerator.randomId();
                keys.add("id");
                values.add("'" + newID + "'");
                keys.add("createdAt");
                keys.add("updatedAt");
                values.add(Date.now() + "");
                values.add(Date.now() + "");
                let table = this.getTable();
                let command = `INSERT INTO ${table} (${keys.toString(",")}) VALUES (${values.toString(",")});`;
                try {
                    yield AFDB_1.AFDB.query(command);
                }
                catch (e) {
                    if (typeof e === "boolean") {
                        recurseCount++;
                        if (recurseCount > 100) {
                            let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.SQLServer, af_error_1.AFErrorType.InternalSQLError, new Error("AFDBObject create recursed more than 100 times."));
                            stack.addGenericError();
                            throw stack;
                        }
                        return yield createProcess();
                    }
                    else {
                        throw e;
                    }
                }
                return newID;
            });
            this.id = yield createProcess();
            this.createdAt = Date.now();
            this.updatedAt = Date.now();
            yield this.onCreated();
        });
    }
    /**
     * Update all values on this instance.
     * @return {Promise<void>}
     */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.InvalidRequest, new Error(`You cannot update a ${this.getTable()} that does not exist in the database.`));
                stack.addGenericError();
                throw stack;
            }
            let updatedAt = Date.now();
            let map = this.getFormattedMap();
            map.set("updatedAt", updatedAt + "");
            let parameters = new af_collections_1.AFArrayList();
            map.forEach((key, value) => parameters.add(key + "=" + value));
            let command = `UPDATE ${this.getTable()} SET ${parameters.toString(", ")} WHERE id='${this.id}'`;
            yield AFDB_1.AFDB.query(command);
            this.updatedAt = updatedAt;
            yield this.onUpdated();
        });
    }
    /**
     * Delete this instance from the database and retain all values on this class.
     * @return {Promise<void>}
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.InvalidRequest, new Error(`You cannot delete a ${this.getTable()} that does not exist in the database.`));
                stack.addGenericError();
                throw stack;
            }
            yield this.onDeleted();
            let command = `DELETE FROM ${this.getTable()} WHERE id='${this.id}';`;
            yield AFDB_1.AFDB.query(command);
            this.id = undefined;
        });
    }
    /**
     * If this exists, update, if it does not exist, create.
     * @returns {Promise<void>}
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                yield this.update();
            }
            else {
                yield this.create();
            }
        });
    }
    /**
     * Refresh this instance with all information from the database.
     * @return {Promise<void>}
     */
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                let stack = af_error_1.AFErrorStack.newWithMessageAndType(af_error_1.AFErrorOriginType.BackEnd, af_error_1.AFErrorType.InvalidRequest, new Error(`You cannot refresh a ${this.getTable()} that does not exist in the database.`));
                stack.addGenericError();
                throw stack;
            }
            let query = new AFDBQuery_1.AFDBQuery(this.getTable());
            let response = yield query.getObjectWithId(this.id);
            this.populateFromDatabaseResponse(response);
        });
    }
    fireUpdatedAt() {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedAt = Date.now();
            let command = `UPDATE ${this.getTable()} SET updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;
            yield AFDB_1.AFDB.query(command);
            this.updatedAt = updatedAt;
        });
    }
}
exports.AFDBObject = AFDBObject;
