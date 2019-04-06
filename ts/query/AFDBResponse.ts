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

import { AFMap, AFObject } from "af-collections";

export class AFDBResponse extends AFObject {

	private readonly content: AFMap<string, any>;
	private readonly table: string;

	public constructor(table: string, content: object) {

		super();

		let formattedContent: AFMap<string, any> = new AFMap<string, any>();
		let keys: string[] = Object.keys(content);

		for (let i: number = 0; i < keys.length; i ++) {

			let key: string = keys[i];
			let value: string | number | boolean = content[key];

			if (typeof value === "string") {

				value = decodeURIComponent(value);

				try {

					let json: object = JSON.parse(value);
					formattedContent.set(key, json);

				} catch (e) {

					formattedContent.set(key, value);

				}

			} else {

				formattedContent.set(key, value);

			}

		}

		this.content = formattedContent;
		this.table = table;
		this.table = table;

	}

	public getContent(): AFMap<string, any> {

		return this.content;

	}

	public getTable(): string {

		return this.table;

	}

}