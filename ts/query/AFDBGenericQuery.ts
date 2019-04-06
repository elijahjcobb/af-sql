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
import { AFDBObject } from "../object/AFDBObject";

export class AFDBGenericQuery <T extends AFDBObject> {

	public constructor(instance: AFDBObject) {

		console.log(instance.toString());

	}


}