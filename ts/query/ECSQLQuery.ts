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

import { ECSQLFilter } from "./ECSQLFilter";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECSQLSort } from "./ECSQLSort";
import { ECSQLDatabase } from "../ECSQLDatabase";
import { ECSQLResponse } from "./ECSQLResponse";
import { ECSQLOperator } from "./ECSQLOperator";
import { ECSQLCondition } from "../ECSQLCondition";
import { ECPrototype, ECArrayList, ECArray } from "@elijahjcobb/collections";
import { ECErrorType, ECErrorOriginType, ECErrorStack } from "@elijahjcobb/error";

/**
 * A class that queries the SQL database from filters, a sort, limit, and conditionals.
 */
export class ECSQLQuery extends ECPrototype implements ECSQLCommandable {

	private readonly table: string;
	private filters: ECArrayList<ECSQLFilter>;
	private sort: ECSQLSort;
	private limit: number;
	private conditional: ECSQLCondition;

	/**
	 * Create a new ECSQLQuery instance.
	 * @param {string} table
	 */
	public constructor(table: string) {

		super();

		this.table = table;
		this.filters = new ECArrayList<ECSQLFilter>();

	}

	/**
	 * Set the limit of rows that will be returned.
	 * @param {number} limit The number of rows to be returned.
	 */
	public setLimit(limit: number): void {

		this.limit = limit;

	}

	/**
	 * Se the conditional for the filters that are present.
	 * @param {ECSQLCondition} conditional The conditional for the filters.
	 */
	public setConditional(conditional: ECSQLCondition): void {

		this.conditional = conditional;

	}

	/**
	 * Add an ECSQLFilter instance to the ECSQLQuery.
	 * @param {ECSQLFilter} filter The filter instance to be added.
	 */
	public addFilter(filter: ECSQLFilter): void {

		this.filters.add(filter);

	}

	/**
	 * Set the ECSQLSort instance to be used in the ECSQLQuery.
	 * @param {ECSQLSort} sort The sort method to be used.
	 */
	public setSort(sort: ECSQLSort): void {

		this.sort = sort;

	}

	/**
	 * Generate the entire SQL command from all filters, sort, and limit.
	 * @param {boolean} isCount Whether or not there is a count limit.
	 * @return {string} The SQL command.
	 */
	public generateSQLCommand(isCount?: boolean): string {

		let command: string = "";

		if (isCount) {
			command += "SELECT COUNT(*) FROM ";
		} else {
			command += "SELECT * FROM ";
		}

		command += this.table;

		let conditional: string = this.conditional || "AND";

		if (this.filters.size() > 0) {

			command += " WHERE ";
			let filterCommands: string[] = [];
			this.filters.forEach((filter: ECSQLFilter) => filterCommands.push(filter.generateSQLCommand()));
			command += filterCommands.join(" " + conditional + " ");

		}

		if (this.sort) {

			command += " ";
			command += this.sort.generateSQLCommand();

		}

		if (this.limit !== undefined) {

			command += " LIMIT ";
			command += this.limit;

		}

		command += ";";

		return command;

	}

	/**
	 * Get the object with a specified id.
	 * @param {string} id The id of the object to be retrieved.
	 * @param {boolean} allowUndefined Whether or not an error should be thrown if the object is undefined.
	 * @return {Promise<ECSQLResponse>} A promise containing a ECSQLResponse instance.
	 */
	public async getObjectWithId(id: string, allowUndefined?: boolean): Promise<ECSQLResponse> {

		this.limit = 1;
		this.filters.removeAll();
		this.sort = undefined;
		this.filters.add(new ECSQLFilter("id", ECSQLOperator.Equal, id));
		let objects: object[] = await ECSQLDatabase.query(this.generateSQLCommand());
		let responses: ECArrayList<ECSQLResponse> = new ECArrayList<ECSQLResponse>();
		objects.forEach((object: object) => responses.add(new ECSQLResponse(this.table, object)));

		let response: ECSQLResponse = responses.get(0);
		if (!response && !allowUndefined) throw ECErrorStack.newWithMessageAndType(ECErrorOriginType.FrontEnd, ECErrorType.ObjectDoesNotExist, new Error(`${this.table} with id '${id}' does not exist.`));

		return response;

	}

	/**
	 * Get the first object from the query instance.
	 * @param {boolean} allowUndefined Whether or not an error should be thrown if the object is undefined.
	 * @return {Promise<ECSQLResponse>} A promise containing a ECSQLResponse instance.
	 */
	public async getFirstObject(allowUndefined?: boolean): Promise<ECSQLResponse> {

		this.limit = 1;
		let objects: object[] = await ECSQLDatabase.query(this.generateSQLCommand());

		let responses: ECArrayList<ECSQLResponse> = new ECArrayList<ECSQLResponse>();
		objects.forEach((object: object) => responses.add(new ECSQLResponse(this.table, object)));

		let response: ECSQLResponse = responses.get(0);
		if (!response && !allowUndefined) throw ECErrorStack.newWithMessageAndType(ECErrorOriginType.FrontEnd, ECErrorType.ObjectDoesNotExist, new Error(`Query for ${this.table.toLowerCase()} does not return an object.`));

		return response;

	}

	/**
	 * Get all objects within the query whose id is contained in the ids specified.
	 * @param {string[]} ids A native JavaScript string array of ids.
	 * @return {Promise<ECArray<ECSQLResponse>>} A promise containing an ECArray of ECSQLResponse instances.
	 */
	public async getObjectsWithIds(ids: string[]): Promise<ECArray<ECSQLResponse>> {

		this.limit = undefined;
		this.filters.removeAll();
		this.sort = undefined;
		this.filters.add(new ECSQLFilter("id", ECSQLOperator.ContainedIn, ids));

		let objects: object[] = await ECSQLDatabase.query(this.generateSQLCommand());
		let responses: ECArrayList<ECSQLResponse> = new ECArrayList<ECSQLResponse>();
		objects.forEach((object: object) => responses.add(new ECSQLResponse(this.table, object)));

		return responses.toAFArray();

	}

	/**
	 * Get all objects that follow the specified query.
	 * @return {Promise<ECArray<ECSQLResponse>>} A promise returning an ECArray of ECSQLResponse instances.
	 */
	public async getAllObjects(): Promise<ECArray<ECSQLResponse>> {

		let objects: object[] = await ECSQLDatabase.query(this.generateSQLCommand());
		let responses: ECArrayList<ECSQLResponse> = new ECArrayList<ECSQLResponse>();
		objects.forEach((object: object) => responses.add(new ECSQLResponse(this.table, object)));

		return responses.toAFArray();

	}

	/**
	 * Count how many objects follow the specified query.
	 * @return {Promise<number>} A promise containing a number.
	 */
	public async count(): Promise<number> {

		let responses: object[] = await ECSQLDatabase.query(this.generateSQLCommand(true));
		let responseObject: object = responses[0];

		return responseObject["COUNT(*)"];
	}

	/**
	 * Check if the query returns any objects at all.
	 * @return {Promise<boolean>} A promise containing a boolean.
	 */
	public async exists(): Promise<boolean> {

		return (await this.count()) > 0;

	}

}