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
import { AFDBFilter } from "./AFDBFilter";
import { AFDBCommandable } from "./AFDBCommandable";
import { AFDBSort } from "./AFDBSort";
import { AFDBResponse } from "./AFDBResponse";
import { AFDBTable } from "../AFDBTable";
import { AFDBCondition } from "../AFDBCondition";
import { AFObject, AFArray } from "af-collections";
export declare class AFDBQuery extends AFObject implements AFDBCommandable {
    private readonly table;
    private filters;
    private sort;
    private limit;
    private conditional;
    constructor(table: AFDBTable);
    setLimit(limit: number): void;
    setConditional(conditional: AFDBCondition): void;
    addFilter(filter: AFDBFilter): void;
    setSort(sort: AFDBSort): void;
    generateSQLCommand(isCount?: boolean): string;
    getObjectWithId(id: string, allowUndefined?: boolean): Promise<AFDBResponse>;
    getFirstObject(allowUndefined?: boolean): Promise<AFDBResponse>;
    getObjectsWithIds(ids: string[]): Promise<AFArray<AFDBResponse>>;
    getAllObjects(): Promise<AFArray<AFDBResponse>>;
    count(): Promise<number>;
    exists(): Promise<boolean>;
}
