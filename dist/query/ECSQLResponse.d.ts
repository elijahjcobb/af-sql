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
import { ECMap, ECPrototype } from "@elijahjcobb/collections";
export declare class ECSQLResponse extends ECPrototype {
    private readonly content;
    private readonly table;
    constructor(table: string, content: object);
    getContent(): ECMap<string, any>;
    getTable(): string;
}
