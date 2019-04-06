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

import { AFMap } from "af-collections";
import { AFErrorStack, AFError, AFErrorOriginType, AFErrorType } from "af-error";

export class AFDBDuplicateKeyHelper {

	private map: AFMap<string, string> = new AFMap<string, string>();

	public constructor() {

		this.map.set("customer_email_uindex", "A user with this email already exists.");
		this.map.set("customer_phone_uindex", "A user with this phone already exists.");
		this.map.set("client_email_uindex", "A client with this email already exists.");
		this.map.set("client_phone_uindex", "A client with this phone already exists.");
		this.map.set("test_foo_uindex", "A test with this foo already exists.");
		this.map.set("primary", "An object with this id already exists.");

	}

	public getErrorStack(error: object): AFErrorStack {

		let message: string = error["sqlMessage"];
		let duplicatedKey: string = message.substring(message.indexOf("key '") + 5, message.length - 1).toLowerCase();

		if (this.map.containsKey(duplicatedKey)) {

			return AFErrorStack.newWithMessageAndType(AFErrorOriginType.User, AFErrorType.ValueAlreadyExists, new Error(this.map.get(duplicatedKey)));

		} else {

			return AFErrorStack.newWithMessageAndType( AFErrorOriginType.User, AFErrorType.ValueAlreadyExists, new Error(`Duplicated key was used (${duplicatedKey}).`));

		}

	}

	public getError(error: object): AFError {

		let message: string = error["sqlMessage"];
		let duplicatedKey: string = message.substring(message.indexOf("key '") + 5, message.length - 1).toLowerCase();

		if (this.map.containsKey(duplicatedKey)) {

			return new AFError(AFErrorOriginType.User, AFErrorType.ValueAlreadyExists, new Error(this.map.get(duplicatedKey)));

		} else {

			return new AFError(AFErrorOriginType.User, AFErrorType.ValueAlreadyExists, new Error(`Duplicated key was used (${duplicatedKey}).`));

		}

	}

}