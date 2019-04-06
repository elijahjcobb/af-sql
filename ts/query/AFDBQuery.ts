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

import { AFDBFilter } from "./AFDBFilter";
import { AFDBCommandable } from "./AFDBCommandable";
import { AFDBSort } from "./AFDBSort";
import { AFDB } from "../AFDB";
import { AFDBResponse } from "./AFDBResponse";
import { AFDBOperator } from "./AFDBOperator";
import { AFDBTable } from "../AFDBTable";
import { AFDBCondition } from "../AFDBCondition";
import { AFObject, AFArrayList, AFArray } from "af-collections";
import { AFErrorType, AFErrorOriginType, AFErrorStack } from "af-error";

export class AFDBQuery extends AFObject implements AFDBCommandable {

	private readonly table: string;
	private filters: AFArrayList<AFDBFilter>;
	private sort: AFDBSort;
	private limit: number;
	private conditional: AFDBCondition;

	public constructor(table: AFDBTable) {

		super();

		this.table = table;
		this.filters = new AFArrayList<AFDBFilter>();

	}

	public setLimit(limit: number): void {

		this.limit = limit;

	}

	public setConditional(conditional: AFDBCondition): void {

		this.conditional = conditional;

	}

	public addFilter(filter: AFDBFilter): void {

		this.filters.add(filter);

	}

	public setSort(sort: AFDBSort): void {

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
			this.filters.forEach((filter: AFDBFilter) => filterCommands.push(filter.generateSQLCommand()));
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

	public async getObjectWithId(id: string, allowUndefined?: boolean): Promise<AFDBResponse> {

		this.limit = 1;
		this.filters.removeAll();
		this.sort = undefined;
		this.filters.add(new AFDBFilter("id", AFDBOperator.Equal, id));
		let objects: object[] = await AFDB.query(this.generateSQLCommand());
		let responses: AFArrayList<AFDBResponse> = new AFArrayList<AFDBResponse>();
		objects.forEach((object: object) => responses.add(new AFDBResponse(this.table, object)));

		let response: AFDBResponse = responses.get(0);
		if (!response && !allowUndefined) throw AFErrorStack.newWithMessageAndType(AFErrorOriginType.FrontEnd, AFErrorType.ObjectDoesNotExist, new Error(`${this.table} with id '${id}' does not exist.`));

		return response;

	}

	public async getFirstObject(allowUndefined?: boolean): Promise<AFDBResponse> {

		this.limit = 1;
		let objects: object[] = await AFDB.query(this.generateSQLCommand());

		let responses: AFArrayList<AFDBResponse> = new AFArrayList<AFDBResponse>();
		objects.forEach((object: object) => responses.add(new AFDBResponse(this.table, object)));

		let response: AFDBResponse = responses.get(0);
		if (!response && !allowUndefined) throw AFErrorStack.newWithMessageAndType(AFErrorOriginType.FrontEnd, AFErrorType.ObjectDoesNotExist, new Error(`Query for ${this.table.toLowerCase()} does not return an object.`));

		return response;

	}

	public async getObjectsWithIds(ids: string[]): Promise<AFArray<AFDBResponse>> {

		this.limit = undefined;
		this.filters.removeAll();
		this.sort = undefined;
		this.filters.add(new AFDBFilter("id", AFDBOperator.ContainedIn, ids));

		let objects: object[] = await AFDB.query(this.generateSQLCommand());
		let responses: AFArrayList<AFDBResponse> = new AFArrayList<AFDBResponse>();
		objects.forEach((object: object) => responses.add(new AFDBResponse(this.table, object)));

		return responses.toAFArray();

	}

	public async getAllObjects(): Promise<AFArray<AFDBResponse>> {

		let objects: object[] = await AFDB.query(this.generateSQLCommand());
		let responses: AFArrayList<AFDBResponse> = new AFArrayList<AFDBResponse>();
		objects.forEach((object: object) => responses.add(new AFDBResponse(this.table, object)));

		return responses.toAFArray();

	}

	public async count(): Promise<number> {

		let responses: object[] = await AFDB.query(this.generateSQLCommand(true));
		let responseObject: object = responses[0];

		return responseObject["COUNT(*)"];
	}

	public async exists(): Promise<boolean> {

		return (await this.count()) > 0;

	}

}