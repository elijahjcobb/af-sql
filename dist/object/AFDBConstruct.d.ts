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
import { AFObject } from "af-collections";
export declare class AFDBConstruct extends AFObject {
    private readonly key;
    private readonly value;
    private readonly optional;
    constructor(key: string, value?: any, optional?: boolean);
    getKey(): string;
    getValue(): any;
    getOptional(): boolean;
}
