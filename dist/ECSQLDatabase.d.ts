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
import { ECErrorStack } from "@elijahjcobb/error";
export declare type ECSQLInitObject = {
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
};
export declare class ECSQLDatabase {
    private static databasePool;
    static query(command: string): Promise<any>;
    static handleError(error: object): ECErrorStack | boolean;
    static init(initObject: ECSQLInitObject): void;
}
