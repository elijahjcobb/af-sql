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

import { AFErrorType, AFErrorOriginType, AFErrorStack } from "af-error";
import { AFDBDuplicateKeyHelper } from "./AFDBDuplicateKeyHelper";

export type AFDBInitObject = {
	host: string,
	username: string,
	password: string,
	database: string,
	port: number
};

export class AFDB {

	private static databasePool: SQL.Pool;

	public static async query(command: string): Promise<any> {

		return new Promise((resolve: Function, reject: Function): void => {

			AFDB.databasePool.query(command, (error: object, results: object[]) => {

				if (!error) {

					resolve(results);

				} else {

					reject(AFDB.handleError(error));

				}

			});

		});

	}

	public static handleError(error: object): AFErrorStack | boolean {

		let code: number | string = error["errno"];
		let sqlMessage: string = error["sqlMessage"];
		let message: string = error["message"];

		let stack: AFErrorStack = new AFErrorStack();
		
		if (code === 1062) {


			if (sqlMessage.indexOf("'PRIMARY'") !== -1) {

				return true;

			} else {

				stack.addError(new AFDBDuplicateKeyHelper().getError(error));

			}

		} else {

			if (code === "ECONNREFUSED") {
				stack.add(AFErrorOriginType.SQLServer, AFErrorType.InternalSQLError, new Error("The SQL Database is not online."));
			} else {
				stack.add(AFErrorOriginType.SQLServer, AFErrorType.InternalSQLError, new Error(`Code: ${code}, SQLMessage: ${sqlMessage}, Message: ${message}`));
			}

			stack.add(AFErrorOriginType.SQLServer, AFErrorType.InternalSQLError, new Error("Internal Database Error."));
		}

		return stack;
	}

	public static init(initObject: AFDBInitObject): void {

		AFDB.databasePool = SQL.createPool({
			connectionLimit: 100,
			host: initObject.host,
			user: initObject.username,
			password: initObject.password,
			database: initObject.database,
			port: 0
		});

	}

}