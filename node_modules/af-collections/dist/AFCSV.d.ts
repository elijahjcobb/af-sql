/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
import { AFObject } from "./AFObject";
import { AFDictionary } from "./map/AFDictionary";
import { AFArray } from "./array/AFArray";
/**
 * Allowed types for AFCSV.
 */
export declare type AFCSVTypes = string | number | boolean;
/**
 * A helper class to convert an AFArray instance into a CSV file.
 */
export declare class AFCSV extends AFObject {
    private readonly array;
    /**
     * The constructor to make new instances of a AFCSV.
     * @param {AFArray<AFDictionary<string, AFCSVTypes>>} array An AFArray instance that contains AFDictionary instances.
     */
    constructor(array: AFArray<AFDictionary<string, AFCSVTypes>>);
    /**
     * Compile a string that is a CSV representation of the internal data.
     * @return {string} A CSV string representation of internal data.
     */
    compile(): string;
}
