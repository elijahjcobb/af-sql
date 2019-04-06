/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
import { AFArrayList } from "./array/AFArrayList";
import { AFArray } from "./array/AFArray";
export declare class AFSet<T> {
    private list;
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor(...objects: T[]);
    /**
     * Add an object to the set.
     * @param {T} object The object to be added to the set.
     */
    add(object: T): void;
    /**
     * Remove an object from the set.
     * @param {T} object The object to be removed from the set.
     */
    remove(object: T): void;
    /**
     * Create a new set from this set and another set.
     * @param {AFSet<T>} set Another set to unionize with this set.
     * @return {AFSet<T>} A new AFSet instance.
     */
    union(set: AFSet<T>): AFSet<T>;
    /**
     * Create a new set from the intersection of this set and another set.
     * @param {AFSet<T>} set Another set to intersect with this set.
     * @return {AFSet<T>} A new AFSet instance.
     */
    intersection(set: AFSet<T>): AFSet<T>;
    /**
     * Create a new set from the difference between this set and another set.
     * @param {AFSet<T>} set Another set to get the difference between.
     * @return {AFSet<T>} A new AFSet instance.
     */
    difference(set: AFSet<T>): AFSet<T>;
    /**
     * Checks if a set is a subset of this set.
     * @param {AFSet<T>} set A possible subset.
     * @return {boolean} Whether the specified set is a subset of this set.
     */
    subset(set: AFSet<T>): boolean;
    /**
     * Create a new AFSet instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initWithValues<T>(...values: T[]): AFSet<T>;
    /**
     * Create a new AFSet from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initFromNativeArray<T>(nativeArray: T[]): AFSet<T>;
    /**
     * Create a new AFSet from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initFromArray<T>(array: AFArray<T>): AFSet<T>;
    /**
     * Create a new AFSet from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initFromArrayList<T>(arrayList: AFArrayList<T>): AFSet<T>;
}
