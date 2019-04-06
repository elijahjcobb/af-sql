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
export declare type AFDBInitObject = {
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
};
export declare class AFDB {
    private static databasePool;
    static query(command: string): Promise<any>;
    static handleError(error: object): AFErrorStack | boolean;
    static init(initObject: AFDBInitObject): void;
}
