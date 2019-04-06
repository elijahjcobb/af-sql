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
 * A generic class representing a stack.
 */
export declare class AFStack<T> {
    private list;
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor();
    /**
     * Place an object onto the top of the stack.
     * @param {T} object The object to be placed on the top of the stack.
     */
    push(object: T): void;
    /**
     * Take the object of the top of the stack.
     * @return {T} The object that was on the top of the stack.
     */
    pop(): T;
    /**
     * View the object that is currently on the top of the stack.
     * @return {T} The object on the top of the stack.
     */
    peek(): T;
    /**
     * Get the number of items in the stack.
     * @return {number} The number of items in the stack.
     */
    size(): number;
    /**
     * Create a new AFStack instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initWithValues<T>(...values: T[]): AFStack<T>;
    /**
     * Create a new AFStack from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initFromNativeArray<T>(nativeArray: T[]): AFStack<T>;
    /**
     * Create a new AFStack from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initFromArray<T>(array: AFArray<T>): AFStack<T>;
    /**
     * Create a new AFStack from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initFromArrayList<T>(arrayList: AFArrayList<T>): AFStack<T>;
}
