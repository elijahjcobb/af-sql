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
import { ECSQLFilter } from "./ECSQLFilter";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECSQLSort } from "./ECSQLSort";
import { ECSQLResponse } from "./ECSQLResponse";
import { ECSQLCondition } from "../ECSQLCondition";
import { ECPrototype, ECArray } from "@elijahjcobb/collections";
export declare class ECSQLQuery extends ECPrototype implements ECSQLCommandable {
    private readonly table;
    private filters;
    private sort;
    private limit;
    private conditional;
    constructor(table: string);
    setLimit(limit: number): void;
    setConditional(conditional: ECSQLCondition): void;
    addFilter(filter: ECSQLFilter): void;
    setSort(sort: ECSQLSort): void;
    generateSQLCommand(isCount?: boolean): string;
    getObjectWithId(id: string, allowUndefined?: boolean): Promise<ECSQLResponse>;
    getFirstObject(allowUndefined?: boolean): Promise<ECSQLResponse>;
    getObjectsWithIds(ids: string[]): Promise<ECArray<ECSQLResponse>>;
    getAllObjects(): Promise<ECArray<ECSQLResponse>>;
    count(): Promise<number>;
    exists(): Promise<boolean>;
}
