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
import { ECSQLOperator } from "./ECSQLOperator";
import { ECSQLCommandable } from "./ECSQLCommandable";
import { ECPrototype } from "@elijahjcobb/collections";
import { ECErrorStack, ECErrorOriginType, ECErrorType } from "@elijahjcobb/error";

export class ECSQLFilter extends ECPrototype implements ECSQLCommandable {

	private readonly key: string;
	private readonly value: any;
	private readonly operator: ECSQLOperator;

	public constructor(key: string, operator: ECSQLOperator, value: string | number | any[]) {

		super();

		this.key = key;
		this.value = value;
		this.operator = operator;

	}

	public generateSQLCommand(): string {

		let command: string = this.key.replace(RegExp("'", "g"), "");

		if (this.operator === ECSQLOperator.ContainedIn) {

			if (!Array.isArray(this.value)) {

				let stack: ECErrorStack = ECErrorStack.newWithMessageAndType(ECErrorOriginType.BackEnd, ECErrorType.ParameterIncorrectFormat, new Error("If you use the in operator, you must supply an array as the value."));
				stack.add(ECErrorOriginType.BackEnd, ECErrorType.InternalSQLError, new Error("Internal server error."));

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