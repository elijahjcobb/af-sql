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
import { AFDBOperator } from "./AFDBOperator";
import { AFDBCommandable } from "./AFDBCommandable";
import { AFObject } from "af-collections";
export declare class AFDBFilter extends AFObject implements AFDBCommandable {
    private readonly key;
    private readonly value;
    private readonly operator;
    constructor(key: string, operator: AFDBOperator, value: string | number | any[]);
    generateSQLCommand(): string;
}
