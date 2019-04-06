/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
import { AFArray } from "./AFArray";
import { AFArrayList } from "./AFArrayList";
import { AFIterator } from "../AFIterator";
/**
 * An interface for AFArray and AFArrayList to follow.
 */
export interface AFArrayable<T> {
    /**
     * Get the value at a specific index.
     * @param {number} index The index for the value to be returned.
     * @return {T} The value at the specific index.
     */
    get(index: number): T;
    /**
     * Checks if the instance is empty.
     * @return {boolean} Whether the instance contains values.
     */
    isEmpty(): boolean;
    /**
     * Returns the amount of items the instances is holding.
     * @return {number} The number of items.
     */
    size(): number;
    /**
     * Checks if the instance contains a specific value.
     * @param {T} value The value to look for.
     * @return {boolean} Whether the specified value was found.
     */
    contains(value: T): boolean;
    /**
     * Returns the index of a specific value. Returns -1 if a value can not be found.
     * @param {T} value The value to find the index for.
     * @return {number} The index of the value. Will be -1 if the value does not exist in the instance.
     */
    indexOf(value: T): number;
    /**
     * A iteration loop handler.
     * @param {(value: T) => void} iterator The iterator arrow function to be used.
     */
    forEach(iterator: ((value: T) => void)): any;
    /**
     * A iteration loop handler using promises.
     * @param {(value: T) => Promise<void>} iterator An async function that returns a promise.
     * @return {Promise<void>} Returns a promise.
     */
    forEachSync(iterator: ((value: T) => Promise<void>)): Promise<void>;
    /**
     * Create a AFIterator instance from this current instance.
     * @return {AFIterator<T>} A new AFIterator.
     */
    toIterator(): AFIterator<T>;
    /**
     * Convert this instance to a string using the provided separator.
     * @param {string} separator The separator to be used. Defaults to ", ".
     * @return {string} This instance as a string representation.
     */
    toString(separator?: string): string;
    /**
     * Convert this instance to native JavaScript array.
     * @return {T[]} This instance as a JavaScript array representation.
     */
    toNativeArray(): T[];
    /**
     * Convert this instance to a AFArray.
     * @return {string} This instance as a AFArray representation.
     */
    toAFArray(): AFArray<T>;
    /**
     * Convert this instance to a AFArrayList.
     * @return {string} This instance as a AFArrayList representation.
     */
    toAFArrayList(): AFArrayList<T>;
}
