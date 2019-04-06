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

import { ECPrototype } from "@elijahjcobb/collections";

export class ECSQLConstruct extends ECPrototype {

	private readonly key: string;
	private readonly value: any;
	private readonly optional: boolean;

	public constructor(key: string, value?: any, optional?: boolean) {

		super();

		this.key = key;
		this.value = value;
		this.optional = optional === undefined ? false : optional;

	}

	public getKey(): string {

		return this.key;

	}

	public getValue(): any {

		return this.value;

	}

	public getOptional(): boolean {

		return this.optional;

	}
	
}