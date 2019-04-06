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
 * A generic class representing a stack.
 */
class AFStack {
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor() {
        this.list = new AFArrayList_1.AFArrayList();
    }
    /**
     * Place an object onto the top of the stack.
     * @param {T} object The object to be placed on the top of the stack.
     */
    push(object) {
        this.list.insert(object, 0);
    }
    /**
     * Take the object of the top of the stack.
     * @return {T} The object that was on the top of the stack.
     */
    pop() {
        let value = this.list.get(0);
        this.list.remove(0);
        return value;
    }
    /**
     * View the object that is currently on the top of the stack.
     * @return {T} The object on the top of the stack.
     */
    peek() {
        return this.list.get(0);
    }
    /**
     * Get the number of items in the stack.
     * @return {number} The number of items in the stack.
     */
    size() {
        return this.list.size();
    }
    /**
     * Create a new AFStack instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initWithValues(...values) {
        let stack = new AFStack();
        stack.list = AFArrayList_1.AFArrayList.initFromNativeArray(values);
        return stack;
    }
    /**
     * Create a new AFStack from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initFromNativeArray(nativeArray) {
        let stack = new AFStack();
        stack.list = AFArrayList_1.AFArrayList.initFromNativeArray(nativeArray);
        return stack;
    }
    /**
     * Create a new AFStack from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initFromArray(array) {
        let stack = new AFStack();
        stack.list = AFArrayList_1.AFArrayList.initFromArray(array);
        return stack;
    }
    /**
     * Create a new AFStack from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFStack<T>} A new AFStack instance.
     */
    static initFromArrayList(arrayList) {
        let stack = new AFStack();
        stack.list = arrayList;
        return stack;
    }
}
exports.AFStack = AFStack;
