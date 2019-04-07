# SQL
A package to quickly and easily handle communication with a SQL server.

## Supported Databases
This package internally uses the [`mysql`](https://www.npmjs.com/package/mysql) package. Therefor, all databases
[`mysql`](https://www.npmjs.com/package/mysql) supports, `ECSQL` will also support.

## Requirements
Every table used with this package must have the following attributes.

| Key | Type | Extra |
| --- | --- | --- |
| `id` | `string` | `primary`, `unique`, `notnull` |
| `updatedAt` | `string` | - |
| `createdAt` | `string` | - |

## Import
#### Separately
```typescript
import { ECSQLDatabase, ECSQLQuery, etc... } from "@elijahjcobb/sql";
```
#### Combined
```typescript
import ECSQL from "@elijahjcobb/sql";
let q: ECSQL.ECSQLQuery;
```

## Initialize
```typescript
/**
 * You must at a minimum import the following two properties..
 */
import { ECSQLInitialize, ECSQLInitObject } from "@elijahjcobb/sql";

/**
 * Every property on the ECSQLInitObject below is required.
 */
let initObject: ECSQLInitObject = {
	username: "user",
	password: "pass",
	host: "localhost",
	port: 12345,
	database: "foo"
};

/**
 * Call the initialize method. The internal structures
 * will keep a connection to your database.
 */
ECSQLInitialize(initObject);
```

## Query with `ECSQLQuery`
Below shows how to make a query and add all functionality this package supplies. See lower in documentation for how
this data can be used once you have it in the `ECSQLObject` subclassing portion.
```typescript
/**
 * Imports
 */
import {
	ECSQLCondition,
	ECSQLFilter,
	ECSQLOperator,
	ECSQLQuery,
	ECSQLResponse,
	ECSQLSort,
	ECSQLSortDirection
} from "@elijahjcobb/sql";
import {
	ECArray
} from "@elijahjcobb/collections";

/**
 * Create a new ECSQLQuery instance supplying the table.
 */
let query: ECSQLQuery = new ECSQLQuery("table-name");

/**
 * Add filters.
 */
query.addFilter(new ECSQLFilter("key1", ECSQLOperator.Equal, "bar"));
query.addFilter(new ECSQLFilter("key2", ECSQLOperator.ContainedIn, ["x", "y", "z"]));
query.addFilter(new ECSQLFilter("key3", ECSQLOperator.GreaterThan, 41));
query.addFilter(new ECSQLFilter("key4", ECSQLOperator.NotEqual, "foo"));

/**
 * Set the condition for the filters.
 */
query.setConditional(ECSQLCondition.AND);

/**
 * Apply a sort.
 */
query.setSort(new ECSQLSort("foo", ECSQLSortDirection.GreatestToLeast));

/**
 * Set the limit.
 */
query.setLimit(100);

/**
 * Get the ECSQLResponse objects for the given query.
 * (note, these are async functions)
 */
let responses: ECArray<ECSQLResponse> = await query.getAllObjects();
let firstResponse: ECSQLResponse = await query.getFirstObject();
```

## Manage Data with `ECSQLObject`
This will exaplain how to make a type safe class to represent a table in very very little lines of code. See how easy it is!
```typescript
/**
 * Imports
 */
import {
	ECSQLObject,
	ECSQLValue
} from "@elijahjcobb/sql";
import {
	ECMap
} from "@elijahjcobb/collections";

/**
 * A sample class you could make. Just make sure to extend ECSQLObject and implement all members it requires of you.
 */
class MySQLTableObject extends ECSQLObject {

	/**
	 * Create properties on your class.
	 */
	public myString: string;
	public myNumber: number;

	/**
	 * Provide the table name.
	 * @return {string}
	 */
	protected getTable(): string {

		return "my-table-name";

	}

	/**
	 * Populate this class with a response from the database.
	 * @param {ECMap<string, any>} content
	 */
	protected decode(content: ECMap<string, any>): void {

		this.myString = content.get("myString") as string;
		this.myNumber = content.get("myNumber") as number;

	}

	/**
	 * Create a mapping of this class for the database. 
	 * @return {ECMap<string, ECSQLValue>}
	 */
	protected encode(): ECMap<string, ECSQLValue> {

		let map: ECMap<string, ECSQLValue> = new ECMap<string, ECSQLValue>();

		map.set("myString", this.myString);
		map.set("myNumber", this.myNumber);

		return  map;

	}

	/**
	 * These are fired whenever the ECSQLObject class operates on this class.
	 * @return {Promise<void>}
	 */
	public async onCreated(): Promise<void> {}
	public async onDeleted(): Promise<void> {}
	public async onUpdated(): Promise<void> {}

}

/**
 * Create a new instance of your class.
 */
let newRow: MySQLTableObject = new MySQLTableObject();

/**
 * Populate the properties you have on your class.
 */
newRow.myNumber = 41;
newRow.myString = "Hello, World!";

/**
 * These methods are provided. No more work from you!!!
 * (note, these are all async methods)
 */
await newRow.create();
await newRow.update();
await newRow.delete();
await newRow.fireUpdatedAt();
```
## Populate a `ECSQLObject` Subclass
You will need to know how to populate the subclasses of `ECSQLObject` that you create. Below shows how to populate a
`ECSQLObject` subclass with the `ECSQLResponse` provided from a `ECSQLQuery`.
> Assume you have the same `MySQLTableObject` class from the example above.
```typescript
/**
 * Create a row and you can use the createQuery() method to create a query.
 */
let row: MySQLTableObject = new MySQLTableObject();
let query: ECSQLQuery = row.createQuery();

/**
 * Query for the object in and populate the row with populateFromDatabaseResponse(). The decode() method will be called. 
 * (note async function)
 */
let response: ECSQLResponse = await query.getObjectWithId("foo");
row.populateFromDatabaseResponse(response);

/**
 * Now you can use your row instance!!!
 */
row.myString;
row.myNumber;
```

## Documentation
Everything is completely documented. You can view the [declaration files](https://github.com/elijahjcobb/sql/tree/master/dist) or even the [source code](https://github.com/elijahjcobb/sql/tree/master/ts) on GitHub. Click a class from the table in the _"Classes"_ section to view its declaration file.

## Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/elijahjcobb/sql/issues) or if you are old fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).