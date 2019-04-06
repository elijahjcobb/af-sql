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
import { ECErrorStack, ECError } from "@elijahjcobb/error";
export declare class ECSQLDuplicateKeyHelper {
    private map;
    constructor();
    getErrorStack(error: object): ECErrorStack;
    getError(error: object): ECError;
}
