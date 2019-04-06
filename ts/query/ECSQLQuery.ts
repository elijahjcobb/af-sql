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

import { ECSQLFilter } from "./ECSQLFilter";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECSQLSort } from "./ECSQLSort";
import { ECSQLDatabase } from "../ECSQLDatabase";
import { ECSQLResponse } from "./ECSQLResponse";
import { ECSQLOperator } from "./ECSQLOperator";
import { ECSQLCondition } from "../ECSQLCondition";
import { ECPrototype, ECArrayList, ECArray } from "@elijahjcobb/collections";
import { ECErrorType, ECErrorOriginType, ECErrorStack } from "@elijahjcobb/error";

export class ECSQLQuery extends ECPrototype implements ECSQLCommandable {

	private readonly table: string;
	private filters: ECArrayList<ECSQLFilter>;
	private sort: ECSQLSort;
	private limit: number;
	private conditional: ECSQLCondition;

	public constructor(table: string) {

		super();

		this.table = table;
		this.filters = new ECArrayList<ECSQLFilter>();

	}

	public setLimit(limit: number): void {

		this.limit = limit;

	}

	public setConditional(conditional: ECSQLCondition): void {

		this.conditional = conditional;

	}

	public addFilter(filter: ECSQLFilter): void {

		this.filters.add(filter);

	}

	public setSort(sort: ECSQLSort): void {

		this.sort = sort;

	}

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

	public async getFirstObject(allowUndefined?: boolean): Promise<ECSQLResponse> {

		this.limit = 1;
		let objects: object[] = await ECSQLDatabase.query(this.generateSQLCommand());

		let responses: ECArrayList<ECSQLResponse> = new ECArrayList<ECSQLResponse>();
		objects.forEach((object: object) => responses.add(new ECSQLResponse(this.table, object)));

		let response: ECSQLResponse = responses.get(0);
		if (!response && !allowUndefined) throw ECErrorStack.newWithMessageAndType(ECErrorOriginType.FrontEnd, ECErrorType.ObjectDoesNotExist, new Error(`Query for ${this.table.toLowerCase()} does not return an object.`));

		return response;

	}

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

	public async getAllObjects(): Promise<ECArray<ECSQLResponse>> {

		let objects: object[] = await ECSQLDatabase.query(this.generateSQLCommand());
		let responses: ECArrayList<ECSQLResponse> = new ECArrayList<ECSQLResponse>();
		objects.forEach((object: object) => responses.add(new ECSQLResponse(this.table, object)));

		return responses.toAFArray();

	}

	public async count(): Promise<number> {

		let responses: object[] = await ECSQLDatabase.query(this.generateSQLCommand(true));
		let responseObject: object = responses[0];

		return responseObject["COUNT(*)"];
	}

	public async exists(): Promise<boolean> {

		return (await this.count()) > 0;

	}

}