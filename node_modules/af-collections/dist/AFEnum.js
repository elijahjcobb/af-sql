"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const AFArrayList_1 = require("./array/AFArrayList");
const AFArray_1 = require("./array/AFArray");
class AFEnum {
    /**
     * Convert an enum to a string array.
     * @param value The num.
     * @return {AFArrayList<string>}
     */
    static convertEnumToArray(value) {
        const StringIsNumber = (value2) => isNaN(Number(value2)) === false;
        let values = Object.keys(value).filter(StringIsNumber).map((key) => value[key]);
        return AFArray_1.AFArray.initFromNativeArray(values);
    }
    /**
     * Convert an enum to a string array.
     * @param value The num.
     * @return {AFArrayList<string>}
     */
    static convertEnumToArrayList(value) {
        const StringIsNumber = (value2) => isNaN(Number(value2)) === false;
        let values = Object.keys(value).filter(StringIsNumber).map((key) => value[key]);
        return AFArrayList_1.AFArrayList.initFromNativeArray(values);
    }
}
exports.AFEnum = AFEnum;
