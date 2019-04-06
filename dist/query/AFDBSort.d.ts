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
import { AFDBSortDirection } from "./AFDBSortDirection";
import { AFObject } from "af-collections";
import { AFDBCommandable } from "./AFDBCommandable";
export declare class AFDBSort extends AFObject implements AFDBCommandable {
    private readonly key;
    private readonly direction;
    constructor(key: string, direction: AFDBSortDirection);
    generateSQLCommand(): string;
}
