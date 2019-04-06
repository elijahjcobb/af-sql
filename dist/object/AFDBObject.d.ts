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
import { AFDBResponse } from "../query/AFDBResponse";
import { AFDBQuery } from "../query/AFDBQuery";
import { AFDBTable } from "../AFDBTable";
import { AFDBValue } from "./AFDBValue";
import { AFObject, AFMap } from "af-collections";
export declare abstract class AFDBObject extends AFObject {
    id: string;
    updatedAt: number;
    createdAt: number;
    /**
     * Get a map that represents this database object that is formatted for the SQL database.
     * @return {AFMap<string, number | string | boolean>}
     */
    private getFormattedMap;
    /**
     * Abstract methods required for notification system.
     */
    protected abstract onCreated(): Promise<void>;
    protected abstract onUpdated(): Promise<void>;
    protected abstract onDeleted(): Promise<void>;
    /**
     * Get the table this instance belongs to.
     * @return {string}
     */
    protected abstract getTable(): AFDBTable;
    /**
     *
     * @return {AFMap<string, any>}
     */
    protected abstract encode(): AFMap<string, AFDBValue>;
    /**
     * Update the value for a specific item on this object by key.
     * @param {string} key
     * @return {Promise<void>}
     */
    protected updateKey(key: string): Promise<void>;
    protected decodeInternalStructure(content: AFMap<string, any>): void;
    /**
     * Decode a database object to this instance of a database class.
     * @param content
     */
    protected abstract decode(content: AFMap<string, any>): void;
    populateFromDatabaseResponse(response: AFDBResponse): void;
    addInternalStructureToMap(map: AFMap<string, any>): AFMap<string, any>;
    /**
     * Create a query using the table this object is contained in.
     * @return {AFDBQuery}
     */
    createQuery(): AFDBQuery;
    /**
     * Convert this object to a JSON representation.
     * @return {object}
     */
    toJSON(): object;
    /**
     * Convert this to a Map.
     * @return {AFMap<string, any>}
     */
    toMap(): AFMap<string, any>;
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
     * @return {Promise<void>}
     */
    delete(): Promise<void>;
    /**
     * If this exists, update, if it does not exist, create.
     * @returns {Promise<void>}
     */
    save(): Promise<void>;
    /**
     * Refresh this instance with all information from the database.
     * @return {Promise<void>}
     */
    refresh(): Promise<void>;
    fireUpdatedAt(): Promise<void>;
}
