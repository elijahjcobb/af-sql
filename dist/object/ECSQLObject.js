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
const __1 = require("..");
const ECSQLDatabase_1 = require("../ECSQLDatabase");
const encryption_1 = require("@elijahjcobb/encryption");
const error_1 = require("@elijahjcobb/error");
const collections_1 = require("@elijahjcobb/collections");
/**
 * An abstract class to represent a object that would be received from a SQL table. Extend this class and you will
 * have a class for any SQL table in under 20 lines of code!!!
 */
class ECSQLObject extends collections_1.ECPrototype {
    /**
     * Get a map that represents this database object that is formatted for the SQL database.
     * @return {ECMap<string, number | string | boolean>}
     */
    getFormattedMap() {
        let unformattedMap = this.encode();
        let map = new collections_1.ECMap();
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
                        let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.FailedToStringifyJSON, new Error(`Could not stringify JSON for key: ${key}.`));
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
     * @param {string} key The key to be updated.
     * @return {Promise<void>} A promise.
     */
    updateKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let formattedMap = this.getFormattedMap();
            let value = formattedMap.get(key);
            if (value == undefined) {
                let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.InvalidRequest, new Error(`You cannot update '${key}' on ${this.getTable()} because ${this.getTable()} does not have a value for '${key}'.`));
                stack.addGenericError();
                throw stack;
            }
            let updatedAt = Date.now();
            let command = `UPDATE ${this.getTable()} SET ${key}=${value}, updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;
            yield ECSQLDatabase_1.ECSQLDatabase.query(command);
            this.updatedAt = updatedAt;
            yield this.onUpdated();
        });
    }
    /**
     * Used to decode the internal structure of an object. This is automatically called when you call
     * populateFromDatabaseResponse() as it calls this method than the decode() method.
     * @param {ECMap<string, any>} content The content that was received from the database.
     */
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
    /**
     * Call this method when you are creating objects from a ECSQLQuery's response.
     * @param {ECSQLResponse} response An ECSQLResponse instance that was returned from a ECSQLQuery instance.
     */
    populateFromDatabaseResponse(response) {
        let content = response.getContent();
        this.decodeInternalStructure(content);
        this.decode(content);
    }
    /**
     * If you are going to override the toJSON method that is called use this method. It takes a map and returns
     * a map instance. So you can easily tack on the internal structure of the database object.
     *
     * @param {ECMap<string, any>} map The map to add items too.
     * @return {ECMap<string, any>} Returns the map.
     */
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
     * Create a query using the table the object is contained in.
     * @return {ECSQLQuery} A new ECSQLQuery instance.
     */
    createQuery() {
        return new __1.ECSQLQuery(this.getTable());
    }
    /**
     * Convert this object to a JSON representation.
     * @return {object} A native JavaScript object.
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
     * Convert this instance to a ECMap.
     * @return {ECMap<string, any>}
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
                let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.InvalidRequest, new Error(`You cannot create a ${this.getTable()} that already exists in the database.`));
                stack.addGenericError();
                throw stack;
            }
            let map = this.getFormattedMap();
            let recurseCount = 0;
            let createProcess = () => __awaiter(this, void 0, void 0, function* () {
                let keys = map.keys().toArrayList();
                let values = map.values().toArrayList();
                let newID = encryption_1.ECGenerator.randomId();
                keys.add("id");
                values.add("'" + newID + "'");
                keys.add("createdAt");
                keys.add("updatedAt");
                values.add(Date.now() + "");
                values.add(Date.now() + "");
                let table = this.getTable();
                let command = `INSERT INTO ${table} (${keys.toString(",")}) VALUES (${values.toString(",")});`;
                try {
                    yield ECSQLDatabase_1.ECSQLDatabase.query(command);
                }
                catch (e) {
                    if (typeof e === "boolean") {
                        recurseCount++;
                        if (recurseCount > 100) {
                            let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.SQLServer, error_1.ECErrorType.InternalSQLError, new Error("ECSQLObject create recursed more than 100 times."));
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
                let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.InvalidRequest, new Error(`You cannot update a ${this.getTable()} that does not exist in the database.`));
                stack.addGenericError();
                throw stack;
            }
            let updatedAt = Date.now();
            let map = this.getFormattedMap();
            map.set("updatedAt", updatedAt + "");
            let parameters = new collections_1.ECArrayList();
            map.forEach((key, value) => parameters.add(key + "=" + value));
            let command = `UPDATE ${this.getTable()} SET ${parameters.toString(", ")} WHERE id='${this.id}'`;
            yield ECSQLDatabase_1.ECSQLDatabase.query(command);
            this.updatedAt = updatedAt;
            yield this.onUpdated();
        });
    }
    /**
     * Delete this instance from the database and retain all values on this class.
     * This method will set this.id to undefined as it know longer has a link in the database.
     * @return {Promise<void>} A promise
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.InvalidRequest, new Error(`You cannot delete a ${this.getTable()} that does not exist in the database.`));
                stack.addGenericError();
                throw stack;
            }
            yield this.onDeleted();
            let command = `DELETE FROM ${this.getTable()} WHERE id='${this.id}';`;
            yield ECSQLDatabase_1.ECSQLDatabase.query(command);
            this.id = undefined;
        });
    }
    /**
     * If the instance exists in the table update() will fire, if not, create() will fire.
     * @returns {Promise<void>} A promise.
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
     * @return {Promise<void>} A promise.
     */
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                let stack = error_1.ECErrorStack.newWithMessageAndType(error_1.ECErrorOriginType.BackEnd, error_1.ECErrorType.InvalidRequest, new Error(`You cannot refresh a ${this.getTable()} that does not exist in the database.`));
                stack.addGenericError();
                throw stack;
            }
            let query = new __1.ECSQLQuery(this.getTable());
            let response = yield query.getObjectWithId(this.id);
            this.populateFromDatabaseResponse(response);
        });
    }
    /**
     * Will set the updatedAt value for this object in the database to the current time.
     * @return {Promise<void>} A promise.
     */
    fireUpdatedAt() {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedAt = Date.now();
            let command = `UPDATE ${this.getTable()} SET updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;
            yield ECSQLDatabase_1.ECSQLDatabase.query(command);
            this.updatedAt = updatedAt;
        });
    }
}
exports.ECSQLObject = ECSQLObject;
