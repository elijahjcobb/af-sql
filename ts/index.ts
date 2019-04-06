/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */

//Imports
import { ECSQLInitObject, ECSQLDatabase } from "./ECSQLDatabase";

//Object
export { ECSQLConstruct } from "./object/ECSQLConstruct";
export { ECSQLGetter } from "./object/ECSQLGetter";
export { ECSQLObject } from "./object/ECSQLObject";
export { ECSQLValue } from "./object/ECSQLValue";

//Query
export { ECSQLCommandable } from "./query/ECSQLCommandable";
export { ECSQLFilter } from "./query/ECSQLFilter";
export { ECSQLGenericQuery } from "./query/ECSQLGenericQuery";
export { ECSQLOperator } from "./query/ECSQLOperator";
export { ECSQLQuery } from "./query/ECSQLQuery";
export { ECSQLResponse } from "./query/ECSQLResponse";
export { ECSQLSort } from "./query/ECSQLSort";
export { ECSQLSortDirection } from "./query/ECSQLSortDirection";

//Root
export { ECSQLInitObject, ECSQLDatabase };
export { ECSQLCondition } from "./ECSQLCondition";
export { ECSQLDuplicateKeyHelper } from "./ECSQLDuplicateKeyHelper";

let initHandler: (initObject: ECSQLInitObject) => void = (initObject: ECSQLInitObject): void => {

	ECSQLDatabase.init(initObject);

};

export { initHandler as ECSQLInitialize };