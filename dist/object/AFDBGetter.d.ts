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
import { AFDBObject } from "./AFDBObject";
import { AFDBQuery } from "../query/AFDBQuery";
import { AFArrayList } from "af-collections";
export interface AFDBGetter {
    getWithId(): Promise<AFDBObject>;
    get(query: AFDBQuery): Promise<AFArrayList<AFDBObject>>;
}
