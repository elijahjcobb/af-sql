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
import { ECSQLObject } from "../object/ECSQLObject";

export class ECSQLGenericQuery <T extends ECSQLObject> {

	public constructor(instance: ECSQLObject) {

		console.log(instance.toString());

	}


}