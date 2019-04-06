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

import SQL = require("mysql");

import { ECErrorStack, ECError, ECErrorOriginType, ECErrorType } from "@elijahjcobb/error";
import { ECSQLDuplicateKeyHelper } from "./ECSQLDuplicateKeyHelper";

export type ECSQLInitObject = {
	host: string,
	username: string,
	password: string,
	database: string,
	port: number
};

export class ECSQLDatabase {

	private static databasePool: SQL.Pool;

	public static async query(command: string): Promise<any> {

		return new Promise((resolve: Function, reject: Function): void => {

			ECSQLDatabase.databasePool.query(command, (error: object, results: object[]) => {

				if (!error) {

					resolve(results);

				} else {

					reject(ECSQLDatabase.handleError(error));

				}

			});

		});

	}

	public static handleError(error: object): ECErrorStack | boolean {

		let code: number | string = error["errno"];
		let sqlMessage: string = error["sqlMessage"];
		let message: string = error["message"];

		let stack: ECErrorStack = new ECErrorStack();
		
		if (code === 1062) {


			if (sqlMessage.indexOf("'PRIMARY'") !== -1) {

				return true;

			} else {

				stack.addError(new ECSQLDuplicateKeyHelper().getError(error));

			}

		} else {

			if (code === "ECONNREFUSED") {
				stack.add(ECErrorOriginType.SQLServer, ECErrorType.InternalSQLError, new Error("The SQL Database is not online."));
			} else {
				stack.add(ECErrorOriginType.SQLServer, ECErrorType.InternalSQLError, new Error(`Code: ${code}, SQLMessage: ${sqlMessage}, Message: ${message}`));
			}

			stack.add(ECErrorOriginType.SQLServer, ECErrorType.InternalSQLError, new Error("Internal Database Error."));
		}

		return stack;
	}

	public static init(initObject: ECSQLInitObject): void {

		ECSQLDatabase.databasePool = SQL.createPool({
			connectionLimit: 100,
			host: initObject.host,
			user: initObject.username,
			password: initObject.password,
			database: initObject.database,
			port: 0
		});

	}

}