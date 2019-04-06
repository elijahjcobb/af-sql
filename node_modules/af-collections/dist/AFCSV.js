"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const AFObject_1 = require("./AFObject");
const AFArrayList_1 = require("./array/AFArrayList");
/**
 * A helper class to convert an AFArray instance into a CSV file.
 */
class AFCSV extends AFObject_1.AFObject {
    /**
     * The constructor to make new instances of a AFCSV.
     * @param {AFArray<AFDictionary<string, AFCSVTypes>>} array An AFArray instance that contains AFDictionary instances.
     */
    constructor(array) {
        super();
        this.array = array;
    }
    /**
     * Compile a string that is a CSV representation of the internal data.
     * @return {string} A CSV string representation of internal data.
     */
    compile() {
        let object = this.array.get(0);
        if (!object)
            throw "";
        let keys = object.keys();
        let csv = keys.toString(",");
        this.array.forEach((object) => {
            let values = new AFArrayList_1.AFArrayList();
            keys.forEach((key) => {
                let value = object.get(key);
                if (!value) {
                    value = "";
                }
                values.add("\"" + value + "\"");
            });
            csv += "\n" + values.toString(",");
        });
        return csv;
    }
}
exports.AFCSV = AFCSV;
