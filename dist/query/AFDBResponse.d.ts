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
import { AFMap, AFObject } from "af-collections";
export declare class AFDBResponse extends AFObject {
    private readonly content;
    private readonly table;
    constructor(table: string, content: object);
    getContent(): AFMap<string, any>;
    getTable(): string;
}
