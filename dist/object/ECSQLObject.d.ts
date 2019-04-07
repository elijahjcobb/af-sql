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
import { ECSQLResponse, ECSQLQuery } from "..";
import { ECSQLValue } from "./ECSQLValue";
import { ECPrototype, ECMap } from "@elijahjcobb/collections";
import { ECSQLEventHandlers } from "./ECSQLEventHandlers";
/**
 * An abstract class to represent a object that would be received from a SQL table. Extend this class and you will
 * have a class for any SQL table in under 20 lines of code!!!
 */
export declare abstract class ECSQLObject extends ECPrototype implements ECSQLEventHandlers {
    id: string;
    updatedAt: number;
    createdAt: number;
    /**
     * Get a map that represents this database object that is formatted for the SQL database.
     * @return {ECMap<string, number | string | boolean>}
     */
    private getFormattedMap;
    /**
     * Get the table as a string this instance belongs to.
     * @return {string}
     */
    protected abstract getTable(): string;
    /**
     * A method abstracted. Return an ECMap instance where the variable name is the key and the value is the value.
     * Think of this method as encoding your object before it gets sent to the database.
     * @return {ECMap<string, ECSQLValue>}
     */
    protected abstract encode(): ECMap<string, ECSQLValue>;
    /**
     * Update the value for a specific item on this object by key.
     * @param {string} key The key to be updated.
     * @return {Promise<void>} A promise.
     */
    protected updateKey(key: string): Promise<void>;
    /**
     * Used to decode the internal structure of an object. This is automatically called when you call
     * populateFromDatabaseResponse() as it calls this method than the decode() method.
     * @param {ECMap<string, any>} content The content that was received from the database.
     */
    protected decodeInternalStructure(content: ECMap<string, any>): void;
    /**
     * Decode a database object to this instance of a database class.
     *
     * Use this method to decode database values onto your object. Don't worry about internal structure items as
     * they are automatically handled.
     *
     * @param content The content that was received from the database.
     */
    protected abstract decode(content: ECMap<string, any>): void;
    /**
     * Abstracted methods required by ECSQLEventHandlers interface. You must implement these methods.
     * Check the documentation in ECSQLEventHandlers for more information.
     */
    abstract onCreated(): Promise<void>;
    abstract onUpdated(): Promise<void>;
    abstract onDeleted(): Promise<void>;
    /**
     * Call this method when you are creating objects from a ECSQLQuery's response.
     * @param {ECSQLResponse} response An ECSQLResponse instance that was returned from a ECSQLQuery instance.
     */
    populateFromDatabaseResponse(response: ECSQLResponse): void;
    /**
     * If you are going to override the toJSON method that is called use this method. It takes a map and returns
     * a map instance. So you can easily tack on the internal structure of the database object.
     *
     * @param {ECMap<string, any>} map The map to add items too.
     * @return {ECMap<string, any>} Returns the map.
     */
    addInternalStructureToMap(map: ECMap<string, any>): ECMap<string, any>;
    /**
     * Create a query using the table the object is contained in.
     * @return {ECSQLQuery} A new ECSQLQuery instance.
     */
    createQuery(): ECSQLQuery;
    /**
     * Convert this object to a JSON representation.
     * @return {object} A native JavaScript object.
     */
    toJSON(): object;
    /**
     * Convert this instance to a ECMap.
     * @return {ECMap<string, any>}
     */
    toMap(): ECMap<string, any>;
    /**
     * Create this instance in the database table this instance belongs to.
     * @return {Promise<void>}
     */
    create(): Promise<void>;
    /**
     * Update all values on this instance.
     * @return {Promise<void>}
     */
    update(): Promise<void>;
    /**
     * Delete this instance from the database and retain all values on this class.
     * This method will set this.id to undefined as it know longer has a link in the database.
     * @return {Promise<void>} A promise
     */
    delete(): Promise<void>;
    /**
     * If the instance exists in the table update() will fire, if not, create() will fire.
     * @returns {Promise<void>} A promise.
     */
    save(): Promise<void>;
    /**
     * Refresh this instance with all information from the database.
     * @return {Promise<void>} A promise.
     */
    refresh(): Promise<void>;
    /**
     * Will set the updatedAt value for this object in the database to the current time.
     * @return {Promise<void>} A promise.
     */
    fireUpdatedAt(): Promise<void>;
}
