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
/**
 * A generic class representing a queue.
 */
class AFQueue {
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor() {
        this.list = new AFArrayList_1.AFArrayList();
    }
    /**
     * Add an object onto the queue.
     * @param {T} object The object to be added to the queue.
     */
    enqueue(object) {
        this.list.add(object);
    }
    /**
     * Remove an object from the queue.
     * @return {T} The object that was dequeued.
     */
    dequeue() {
        let object = this.list.get(0);
        this.list.remove(0);
        return object;
    }
    /**
     * Get the object that will be dequeued next.
     * @return {T} The object that will be dequeued.
     */
    peek() {
        return this.list.get(0);
    }
    /**
     * Create a new AFQueue instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initWithValues(...values) {
        let queue = new AFQueue();
        queue.list = AFArrayList_1.AFArrayList.initFromNativeArray(values);
        return queue;
    }
    /**
     * Create a new AFQueue from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initFromNativeArray(nativeArray) {
        let queue = new AFQueue();
        queue.list = AFArrayList_1.AFArrayList.initFromNativeArray(nativeArray);
        return queue;
    }
    /**
     * Create a new AFQueue from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initFromArray(array) {
        let queue = new AFQueue();
        queue.list = AFArrayList_1.AFArrayList.initFromArray(array);
        return queue;
    }
    /**
     * Create a new AFQueue from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFQueue<T>} A new AFQueue instance.
     */
    static initFromArrayList(arrayList) {
        let queue = new AFQueue();
        queue.list = arrayList;
        return queue;
    }
}
exports.AFQueue = AFQueue;
