/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import { ECSQLResponse, ECSQLQuery } from "..";
import { ECSQLDatabase } from "../ECSQLDatabase";
import { ECGenerator } from "@elijahjcobb/encryption";
import { ECSQLValue } from "./ECSQLValue";
import { ECErrorStack, ECErrorOriginType, ECErrorType } from "@elijahjcobb/error";
import { ECArrayList, ECPrototype, ECMap } from "@elijahjcobb/collections";

/**
 * An abstract class to represent a object that would be received from a SQL table. Extend this class and you will
 * have a class for any SQL table in under 20 lines of code!!!
 */
export abstract class ECSQLObject extends ECPrototype {

	public id: string;
	public updatedAt: number;
	public createdAt: number;

	/**
	 * Get a map that represents this database object that is formatted for the SQL database.
	 * @return {ECMap<string, number | string | boolean>}
	 */
	private getFormattedMap(): ECMap<string, number | string | boolean> {

		let unformattedMap: ECMap<string, any> = this.encode();

		let map: ECMap<string, number | string | boolean> = new ECMap<string, number | string | boolean>();

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

						let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.FailedToStringifyJSON, new Error(`Could not stringify JSON for key: ${key}.`));
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
	 * Get the table as a string this instance belongs to.
	 * @return {string}
	 */
	protected abstract getTable(): string;

	/**
	 * A method abstracted. Return an ECMap instance where the variable name is the key and the value is the value.
	 * Think of this method as encoding your object before it gets sent to the database.
	 * @return {ECMap<string, ECSQLValue>}
	 */
	protected abstract encode(): ECMap<string, ECSQLValue>;

	/**
	 * Update the value for a specific item on this object by key.
	 * @param {string} key The key to be updated.
	 * @return {Promise<void>} A promise.
	 */
	protected async updateKey(key: string): Promise<void> {

		let formattedMap: ECMap<string, string | boolean | number> = this.getFormattedMap();
		let value: any = formattedMap.get(key);

		if (value == undefined) {

			let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.InvalidRequest, new Error(`You cannot update '${key}' on ${this.getTable()} because ${this.getTable()} does not have a value for '${key}'.`));
			stack.addGenericError();

			throw stack;

		}

		let updatedAt: number = Date.now();
		let command: string = `UPDATE ${this.getTable()} SET ${key}=${value}, updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;

		await ECSQLDatabase.query(command);
		this.updatedAt = updatedAt;

		await this.onUpdated();

	}

	/**
	 * Used to decode the internal structure of an object. This is automatically called when you call
	 * populateFromDatabaseResponse() as it calls this method than the decode() method.
	 * @param {ECMap<string, any>} content The content that was received from the database.
	 */
	protected decodeInternalStructure(content: ECMap<string, any>): void {

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
	 *
	 * Use this method to decode database values onto your object. Don't worry about internal structure items as
	 * they are automatically handled.
	 *
	 * @param content The content that was received from the database.
	 */
	protected abstract decode(content: ECMap<string, any>): void;

	/**
	 * Abstracted methods required as an event system.
	 * onCreated will be called after an object is created.
	 * onUpdated will be called after an object is updated.
	 * onDeleted will be called after an object is deleted.
	 */
	protected abstract async onCreated(): Promise<void>;
	protected abstract async onUpdated(): Promise<void>;
	protected abstract async onDeleted(): Promise<void>;

	/**
	 * Call this method when you are creating objects from a ECSQLQuery's response.
	 * @param {ECSQLResponse} response An ECSQLResponse instance that was returned from a ECSQLQuery instance.
	 */
	public populateFromDatabaseResponse(response: ECSQLResponse): void {

		let content: ECMap<string, any> = response.getContent();

		this.decodeInternalStructure(content);
		this.decode(content);


	}

	/**
	 * If you are going to override the toJSON method that is called use this method. It takes a map and returns
	 * a map instance. So you can easily tack on the internal structure of the database object.
	 *
	 * @param {ECMap<string, any>} map The map to add items too.
	 * @return {ECMap<string, any>} Returns the map.
	 */
	public addInternalStructureToMap(map: ECMap<string, any>): ECMap<string, any> {

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
	 * Create a query using the table the object is contained in.
	 * @return {ECSQLQuery} A new ECSQLQuery instance.
	 */
	public createQuery(): ECSQLQuery {

		return new ECSQLQuery(this.getTable());

	}

	/**
	 * Convert this object to a JSON representation.
	 * @return {object} A native JavaScript object.
	 */
	public toJSON(): object {

		let map: ECMap<string, any> = this.toMap();

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
	 * Convert this instance to a ECMap.
	 * @return {ECMap<string, any>}
	 */
	public toMap(): ECMap<string, any> {

		return this.encode();

	}

	/**
	 * Create this instance in the database table this instance belongs to.
	 * @return {Promise<void>}
	 */
	public async create(): Promise<void> {

		if (this.id !== undefined && this.id !== null) {

			let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.InvalidRequest, new Error(`You cannot create a ${this.getTable()} that already exists in the database.`));
			stack.addGenericError();

			throw stack;

		}

		let map: ECMap<string, any> = this.getFormattedMap();

		let recurseCount: number = 0;

		let createProcess: () => Promise<string> = async (): Promise<string> => {

			let keys: ECArrayList<string> = map.keys().toArrayList();
			let values: ECArrayList<any> = map.values().toArrayList();

			let newID: string = ECGenerator.randomId();

			keys.add("id");
			values.add("'" + newID + "'");

			keys.add("createdAt");
			keys.add("updatedAt");

			values.add(Date.now() + "");
			values.add(Date.now() + "");

			let table: string = this.getTable();
			let command: string = `INSERT INTO ${table} (${keys.toString(",")}) VALUES (${values.toString(",")});`;

			try {

				await ECSQLDatabase.query(command);

			} catch (e) {

				if (typeof e === "boolean") {

					recurseCount ++;

					if (recurseCount > 100) {

						let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.SQLServer, ECErrorType.InternalSQLError, new Error("ECSQLObject create recursed more than 100 times."));
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

			let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.InvalidRequest, new Error(`You cannot update a ${this.getTable()} that does not exist in the database.`));
			stack.addGenericError();

			throw stack;

		}

		let updatedAt: number = Date.now();

		let map: ECMap<string, any> = this.getFormattedMap();
		map.set("updatedAt", updatedAt + "");
		let parameters: ECArrayList<string> = new ECArrayList<string>();
		map.forEach((key: string, value: any) => parameters.add(key + "=" + value));

		let command: string = `UPDATE ${this.getTable()} SET ${parameters.toString(", ")} WHERE id='${this.id}'`;
		await ECSQLDatabase.query(command);
		this.updatedAt = updatedAt;

		await this.onUpdated();

	}

	/**
	 * Delete this instance from the database and retain all values on this class.
	 * This method will set this.id to undefined as it know longer has a link in the database.
	 * @return {Promise<void>} A promise
	 */
	public async delete(): Promise<void> {

		if (!this.id) {

			let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.InvalidRequest, new Error(`You cannot delete a ${this.getTable()} that does not exist in the database.`));
			stack.addGenericError();

			throw stack;

		}

		await this.onDeleted();

		let command: string = `DELETE FROM ${this.getTable()} WHERE id='${this.id}';`;
		await ECSQLDatabase.query(command);

		this.id = undefined;


	}

	/**
	 * If the instance exists in the table update() will fire, if not, create() will fire.
	 * @returns {Promise<void>} A promise.
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
	 * @return {Promise<void>} A promise.
	 */
	public async refresh(): Promise<void> {

		if (!this.id) {

			let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.InvalidRequest, new Error(`You cannot refresh a ${this.getTable()} that does not exist in the database.`));
			stack.addGenericError();

			throw stack;

		}

		let query: ECSQLQuery = new ECSQLQuery(this.getTable());
		let response: ECSQLResponse = await query.getObjectWithId(this.id);
		this.populateFromDatabaseResponse(response);

	}

	/**
	 * Will set the updatedAt value for this object in the database to the current time.
	 * @return {Promise<void>} A promise.
	 */
	public async fireUpdatedAt(): Promise<void> {

		let updatedAt: number = Date.now();
		let command: string = `UPDATE ${this.getTable()} SET updatedAt=${updatedAt + ""} WHERE id='${this.id}'`;
		await ECSQLDatabase.query(command);
		this.updatedAt = updatedAt;

	}

}