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
import { ECSQLObject } from "./ECSQLObject";
import { ECSQLQuery } from "../query/ECSQLQuery";
import { ECArrayList } from "@elijahjcobb/collections";

export interface ECSQLGetter {

	getWithId(): Promise<ECSQLObject>;
	get(query: ECSQLQuery): Promise<ECArrayList<ECSQLObject>>;

}