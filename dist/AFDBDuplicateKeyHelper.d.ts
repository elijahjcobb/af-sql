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
import { AFErrorStack, AFError } from "af-error";
export declare class AFDBDuplicateKeyHelper {
    private map;
    constructor();
    getErrorStack(error: object): AFErrorStack;
    getError(error: object): AFError;
}
