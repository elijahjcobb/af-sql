# AFCollections
A collection of generic structures written in TypeScript.

## Included Structures 
| Class | Description |
| --- | --- |
| [`AFArray`](https://github.com/elijahjcobb/af-collections/blob/master/dist/array/AFArray.d.ts) | An immutable generic class representing a list of values. |
| [`AFArrayList`](https://github.com/elijahjcobb/af-collections/blob/master/dist/array/AFArrayList.d.ts) | A mutable generic class representing a list of values. |
| [`AFDictionary`](https://github.com/elijahjcobb/af-collections/blob/master/dist/map/AFDictionary.d.ts) | An immutable generic class representing a group of key value pairs. |
| [`AFMap`](https://github.com/elijahjcobb/af-collections/blob/master/dist/map/AFMap.d.ts) | A mutable generic class representing a group of key value pairs. | |
| [`AFIterator`](https://github.com/elijahjcobb/af-collections/blob/master/dist/AFIterator.d.ts) | A generic iterator to iterate through provided values. |
| [`AFCSV`](https://github.com/elijahjcobb/af-collections/blob/master/dist/AFCSV.d.ts) | A helper class to generate a `CSV` endoded `string` from an `AFArray` instance. |
| [`AFEnum`](https://github.com/elijahjcobb/af-collections/blob/master/dist/AFEnum.d.ts) | A helper class to generate both `AFArray` and `AFArrayList` instances from a typescript `enum `. |
| [`AFQueue`](https://github.com/elijahjcobb/af-collections/blob/master/dist/AFQueue.d.ts) | A mutable generic class representing a queue. |
| [`AFStack`](https://github.com/elijahjcobb/af-collections/blob/master/dist/AFStack.d.ts) | A mutable generic class representing a stack. |

## Accessing Structures
All the structures are packages onto `AFCollections`. Just import it like normal and you can use any structure of the package.
```
import AFCollections = require("af-collections");

let array: AFCollections.Array<any>;
let arrayList: AFCollections.ArrayList<any>;
let dictionary: AFCollections.Dictionary<any, any>;
let map: AFCollections.Map<any, any>;
let csv: AFCollections.CSV;
let iterator: AFCollections.Iterator<any>;
let set: AFCollections.Set<any>;
let stack: AFCollections.Stack<any>;

AFCollections.Enum.convertEnumToArray(null);
```

## Generics
Yes, literally everything is generic. I wrote this for a huge project and make sure everything I made was generic.

## Error Handling
Most classes throw errors when you do something that is a "no-no". They are just thrown as native `Error` instances.

## Full Documentation

### Source Code
If you want to poke around the source code for fun it is all located in the [`ts` directory](https://github.com/elijahjcobb/af-collections/tree/master/ts). 

### TypeScript Declaration Files
I have completely documented everything. In the table at the top each link on class each names directs to the declaration file for the class on GitHub. By installing with NPM you will also get all my type files.

## Bugs
If you find any bugs please create an issue on [GitHub](https://github.com/elijahjcobb/af-collections/issues) or if you are old fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).