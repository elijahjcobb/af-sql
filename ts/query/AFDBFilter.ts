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
import { AFDBOperator } from "./AFDBOperator";
import { AFDBCommandable } from "./AFDBCommandable";
import { AFObject } from "af-collections";
import { AFErrorStack, AFErrorOriginType, AFErrorType } from "af-error";

export class AFDBFilter extends AFObject implements AFDBCommandable {

	private readonly key: string;
	private readonly value: any;
	private readonly operator: AFDBOperator;

	public constructor(key: string, operator: AFDBOperator, value: string | number | any[]) {

		super();

		this.key = key;
		this.value = value;
		this.operator = operator;

	}

	public generateSQLCommand(): string {

		let command: string = this.key.replace(RegExp("'", "g"), "");

		if (this.operator === AFDBOperator.ContainedIn) {

			if (!Array.isArray(this.value)) {

				let stack: AFErrorStack = AFErrorStack.newWithMessageAndType(AFErrorOriginType.BackEnd, AFErrorType.ParameterIncorrectFormat, new Error("If you use the in operator, you must supply an array as the value."));
				stack.add(AFErrorOriginType.BackEnd, AFErrorType.InternalSQLError, new Error("Internal server error."));

				throw stack;

			}

			let values: any[] = [];
			(this.value as any[]).forEach((value: string) => values.push(value.replace(RegExp("'", "g"), "\\'")));

			command += " IN ('";
			command += values.join("','");
			command += "')";

		} else {

			command += this.operator;

			if (typeof this.value === "string") {
				command += "'";
				command += (this.value as string).replace(RegExp("'", "g"), "\\'") + "'";
			} else {
				command += this.value;
			}

		}

		return command;

	}

}