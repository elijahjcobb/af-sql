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
 * A generic class representing a queue.
 */
export declare class AFQueue<T> {
    private list;
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor();
    /**
     * Add an object onto the queue.
     * @param {T} object The object to be added to the queue.
     */
    enqueue(object: T): void;
    /**
     * Remove an object from the queue.
     * @return {T} The object that was dequeued.
     */
    dequeue(): T;
    /**
     * Get the object that will be dequeued next.
     * @return {T} The object that will be dequeued.
     */
    peek(): T;
    /**
     * Create a new AFQueue instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initWithValues<T>(...values: T[]): AFQueue<T>;
    /**
     * Create a new AFQueue from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initFromNativeArray<T>(nativeArray: T[]): AFQueue<T>;
    /**
     * Create a new AFQueue from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initFromArray<T>(array: AFArray<T>): AFQueue<T>;
    /**
     * Create a new AFQueue from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initFromArrayList<T>(arrayList: AFArrayList<T>): AFQueue<T>;
}
