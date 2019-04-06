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
import { ECSQLSortDirection } from "./ECSQLSortDirection";
import { ECPrototype } from "@elijahjcobb/collections";
import { ECSQLCommandable } from "./ECSQLCommandable";
export declare class ECSQLSort extends ECPrototype implements ECSQLCommandable {
    private readonly key;
    private readonly direction;
    constructor(key: string, direction: ECSQLSortDirection);
    generateSQLCommand(): string;
}
