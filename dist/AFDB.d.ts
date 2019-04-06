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
import { AFErrorStack } from "af-error";
export declare class AFDB {
    private static databasePool;
    static query(command: string): Promise<any>;
    static handleError(error: object): AFErrorStack | boolean;
    static init(): void;
}
