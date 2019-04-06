/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
import { AFArrayList } from "./array/AFArrayList";
import { AFArray } from "./array/AFArray";
export declare class AFEnum {
    /**
     * Convert an enum to a string array.
     * @param value The num.
     * @return {AFArrayList<string>}
     */
    static convertEnumToArray(value: any): AFArray<string>;
    /**
     * Convert an enum to a string array.
     * @param value The num.
     * @return {AFArrayList<string>}
     */
    static convertEnumToArrayList(value: any): AFArrayList<string>;
}
