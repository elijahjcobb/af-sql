/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
import { AFArrayList } from "./array/AFArrayList";
import { AFArray } from "./array/AFArray";
/**
 * A generic implementation of an iterator similar to a Java iterator.
 */
export declare class AFIterator<V> {
    private array;
    private index;
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor();
    /**
     * Checks if the iterator has a value after the current one.
     * @return {boolean} Whether there is another value after the current one.
     */
    hasNext(): boolean;
    /**
     * Get the next value from the iterator.
     * @return {V} The value.
     */
    next(): V;
    /**
     * Create a new AFIterator with values.
     * @param {V} values Values to be iterated through.
     * @return {AFIterator<V>} A new AFIterator instance.
     */
    static initWithValues<V>(...values: V[]): AFIterator<V>;
    /**
     * Create a new AFIterator with a native JavaScript array's values.
     * @param {V[]} values A native JavaScript array.
     * @return {AFIterator<V>} A new AFIterator instance.
     */
    static initWithNativeArray<V>(values: V[]): AFIterator<V>;
    /**
     * Create a new AFIterator with an AFArray's values.
     * @param {AFArray<V>} array An AFArray instance.
     * @return {AFIterator<V>} A new AFIterator instance.
     */
    static initWithArray<V>(array: AFArray<V>): AFIterator<V>;
    /**
     * Create a new AFIterator with an AFArrayList's values.
     * @param {AFArrayList<V>} arrayList An AFArrayList instance.
     * @return {AFIterator<V>} A new AFIterator instance.
     */
    static initWithArrayList<V>(arrayList: AFArrayList<V>): AFIterator<V>;
}
