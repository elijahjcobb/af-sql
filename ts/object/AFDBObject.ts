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

import { AFDBResponse } from "../query/AFDBResponse";
import { AFDB } from "../AFDB";
import { AFGenerator } from "af-encryption";
import { AFDBQuery } from "../query/AFDBQuery";
import { AFDBTable } from "../AFDBTable";
import { AFDBValue } from "./AFDBValue";
import { AFErrorStack, AFErrorOriginType, AFErrorType } from "af-error";
import { AFArrayList, AFObject, AFMap } from "af-collections";

export abstract class AFDBObject extends AFObject {

	public id: string;
	public updatedAt: number;
	public createdAt: number;

	/**
	 * Get a map that represents this database object that is formatted for the SQL database.
	 * @return {AFMap<string, number | string | boolean>}
	 */
	private getFormattedMap(): AFMap<string, number | string | boolean> {

		let unformattedMap: AFMap<string, any> = this.encode();

		let map: AFMap<string, number | string | boolean> = new AFMap<string, number | string | boolean>();

		unformattedMap.forEach((key: string, value: any) => {

			if (value === null || value === undefined) {

				map.set(key, "null");

			} else {

				let newValue: string | number | boolean;

				if (typeof value === "object") {

					try {

						let json: string = JSON.stringify(value);
						newValue = "'" + json.replace(RegExp("'", "g"), "\\'") + "'";

					} catch (e) {

						let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.FailedToStringifyJSON, new Error(`Could not stringify JSON for key: ${key}.`));
						stack.addGenericError();

						throw stack;

					}

				} else if (typeof value === "string") {

					newValue = "'" + value.replace(RegExp("'", "g"), "\\'") + "'";

				} else {

					newValue = value;

				}

				map.set(key, newValue);

			}

		});

		return map;

	}

	/**
	 * Abstract methods required for notification system.
	 */
	protected abstract async onCreated(): Promise<void>;
	protected abstract async onUpdated(): Promise<void>;
	protected abstract async onDeleted(): Promise<void>;

	/**
	 * Get the table this instance belongs to.
	 * @return {string}
	 */
	protected abstract getTable(): AFDBTable;

	/**
	 *
	 * @return {AFMap<string, any>}
	 */
	protected abstract encode(): AFMap<string, AFDBValue>;

	/**
	 * Update the value for a specific item on this object by key.
	 * @param {string} key
	 * @return {Promise<void>}
	 */
	protected async updateKey(key: string): Promise<void> {

		let formattedMap: AFMap<string, string | boolean | number> = this.getFormattedMap();
		let value: any = formattedMap.get(key);

		if (value == undefined) {

			let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.InvalidRequest, new Error(`You cannot update '${key}' on ${this.getTable()} because ${this.getTable()} does not have a value for '${key}'.`));
			stack.addGenericError();

			throw stack;

		}

		let updatedAt: number = Date.now();
		let command: string = `UPDATE ${this.getTable()} SET ${key}=${value}, updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;

		await AFDB.query(command);
		this.updatedAt = updatedAt;

		await this.onUpdated();

	}

	protected decodeInternalStructure(content: AFMap<string, any>): void {

		this.id = content.get("id");

		try {
			this.updatedAt = parseInt(content.get("updatedAt"));
		} catch (e) {}


		try {
			this.createdAt = parseInt(content.get("createdAt"));
		} catch (e) {}

		if (this.createdAt < 10 || this.createdAt === null || this.createdAt === undefined) this.createdAt = Date.now();
		if (this.updatedAt < 10 || this.updatedAt === null || this.updatedAt === undefined) this.updatedAt = Date.now();

	}

	/**
	 * Decode a database object to this instance of a database class.
	 * @param content
	 */
	protected abstract decode(content: AFMap<string, any>): void;

	public populateFromDatabaseResponse(response: AFDBResponse): void {

		let content: AFMap<string, any> = response.getContent();

		this.decodeInternalStructure(content);
		this.decode(content);


	}

	public addInternalStructureToMap(map: AFMap<string, any>): AFMap<string, any> {

		map.set("id", this.id);
		map.set("createdAt", {
			value: this.createdAt,
			readable: new Date(this.createdAt).toString()
		});
		map.set("updatedAt", {
			value: this.updatedAt,
			readable: new Date(this.updatedAt).toString()
		});

		return map;

	}

	/**
	 * Create a query using the table this object is contained in.
	 * @return {AFDBQuery}
	 */
	public createQuery(): AFDBQuery {

		return new AFDBQuery(this.getTable());

	}

	/**
	 * Convert this object to a JSON representation.
	 * @return {object}
	 */
	public toJSON(): object {

		let map: AFMap<string, any> = this.toMap();

		map.set("id", this.id);
		map.set("createdAt", {
			value: this.createdAt,
			readable: new Date(this.createdAt).toString()
		});
		map.set("updatedAt", {
			value: this.updatedAt,
			readable: new Date(this.updatedAt).toString()
		});

		return map.toJSON();

	}

	/**
	 * Convert this to a Map.
	 * @return {AFMap<string, any>}
	 */
	public toMap(): AFMap<string, any> {

		return this.encode();

	}

	/**
	 * Create this instance in the database table this instance belongs to.
	 * @return {Promise<void>}
	 */
	public async create(): Promise<void> {

		if (this.id !== undefined && this.id !== null) {

			let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.InvalidRequest, new Error(`You cannot create a ${this.getTable()} that already exists in the database.`));
			stack.addGenericError();

			throw stack;

		}

		let map: AFMap<string, any> = this.getFormattedMap();

		let recurseCount: number = 0;

		let createProcess: () => Promise<string> = async (): Promise<string> => {

			let keys: AFArrayList<string> = map.keys().toAFArrayList();
			let values: AFArrayList<any> = map.values().toAFArrayList();

			let newID: string = AFGenerator.randomId();

			keys.add("id");
			values.add("'" + newID + "'");

			keys.add("createdAt");
			keys.add("updatedAt");

			values.add(Date.now() + "");
			values.add(Date.now() + "");

			let table: string = this.getTable();
			let command: string = `INSERT INTO ${table} (${keys.toString(",")}) VALUES (${values.toString(",")});`;

			try {

				await AFDB.query(command);

			} catch (e) {

				if (typeof e === "boolean") {

					recurseCount ++;

					if (recurseCount > 100) {

						let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.SQLServer, AFErrorType.InternalSQLError, new Error("AFDBObject create recursed more than 100 times."));
						stack.addGenericError();

						throw stack;

					}

					return await createProcess();

				} else {

					throw e;

				}

			}

			return newID;

		};

		this.id = await createProcess();
		this.createdAt = Date.now();
		this.updatedAt = Date.now();

		await this.onCreated();

	}

	/**
	 * Update all values on this instance.
	 * @return {Promise<void>}
	 */
	public async update(): Promise<void> {

		if (!this.id) {

			let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.InvalidRequest, new Error(`You cannot update a ${this.getTable()} that does not exist in the database.`));
			stack.addGenericError();

			throw stack;

		}

		let updatedAt: number = Date.now();

		let map: AFMap<string, any> = this.getFormattedMap();
		map.set("updatedAt", updatedAt + "");
		let parameters: AFArrayList<string> = new AFArrayList<string>();
		map.forEach((key: string, value: any) => parameters.add(key + "=" + value));

		let command: string = `UPDATE ${this.getTable()} SET ${parameters.toString(", ")} WHERE id='${this.id}'`;
		await AFDB.query(command);
		this.updatedAt = updatedAt;

		await this.onUpdated();

	}

	/**
	 * Delete this instance from the database and retain all values on this class.
	 * @return {Promise<void>}
	 */
	public async delete(): Promise<void> {

		if (!this.id) {

			let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.InvalidRequest, new Error(`You cannot delete a ${this.getTable()} that does not exist in the database.`));
			stack.addGenericError();

			throw stack;

		}

		await this.onDeleted();

		let command: string = `DELETE FROM ${this.getTable()} WHERE id='${this.id}';`;
		await AFDB.query(command);

		this.id = undefined;


	}

	/**
	 * If this exists, update, if it does not exist, create.
	 * @returns {Promise<void>}
	 */
	public async save(): Promise<void> {

		if (this.id) {

			await this.update();

		} else {

			await this.create();

		}

	}

	/**
	 * Refresh this instance with all information from the database.
	 * @return {Promise<void>}
	 */
	public async refresh(): Promise<void> {

		if (!this.id) {

			let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.InvalidRequest, new Error(`You cannot refresh a ${this.getTable()} that does not exist in the database.`));
			stack.addGenericError();

			throw stack;

		}

		let query: AFDBQuery = new AFDBQuery(this.getTable());
		let response: AFDBResponse = await query.getObjectWithId(this.id);
		this.populateFromDatabaseResponse(response);

	}


	public async fireUpdatedAt(): Promise<void> {

		let updatedAt: number = Date.now();
		let command: string = `UPDATE ${this.getTable()} SET updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;
		await AFDB.query(command);
		this.updatedAt = updatedAt;

	}

}