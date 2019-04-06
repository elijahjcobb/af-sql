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
import { ECSQLOperator } from "./ECSQLOperator";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECPrototype } from "@elijahjcobb/collections";
export declare class ECSQLFilter extends ECPrototype implements ECSQLCommandable {
    private readonly key;
    private readonly value;
    private readonly operator;
    constructor(key: string, operator: ECSQLOperator, value: string | number | any[]);
    generateSQLCommand(): string;
}
