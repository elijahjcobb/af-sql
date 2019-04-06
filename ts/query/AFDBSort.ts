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
import { AFDBSortDirection } from "./AFDBSortDirection";
import { AFObject } from "af-collections";
import { AFDBCommandable } from "./AFDBCommandable";

export class AFDBSort extends AFObject implements AFDBCommandable {

	private readonly key: string;
	private readonly direction: AFDBSortDirection;

	public constructor(key: string, direction: AFDBSortDirection) {

		super();

		this.key = key;
		this.direction = direction;

	}

	public generateSQLCommand(): string {

		return `ORDER BY ${this.key} ${this.direction}`;

	}

}