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
import { ECSQLSortDirection } from "./ECSQLSortDirection";
import { ECPrototype } from "@elijahjcobb/collections";
import { ECSQLCommandable } from "./ECSQLCommandable";

export class ECSQLSort extends ECPrototype implements ECSQLCommandable {

	private readonly key: string;
	private readonly direction: ECSQLSortDirection;

	public constructor(key: string, direction: ECSQLSortDirection) {

		super();

		this.key = key;
		this.direction = direction;

	}

	public generateSQLCommand(): string {

		return `ORDER BY ${this.key} ${this.direction}`;

	}

}