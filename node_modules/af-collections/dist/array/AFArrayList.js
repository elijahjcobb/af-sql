"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AFObject_1 = require("../AFObject");
const AFArray_1 = require("./AFArray");
const AFIterator_1 = require("../AFIterator");
/**
 * A generic mutable implementation of an array.
 */
class AFArrayList extends AFObject_1.AFObject {
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor() {
        super();
        this.array = [];
    }
    /**
     * Get the value at a specific index.
     * @param {number} index The index for the value to be returned.
     * @return {T} The value at the specific index.
     */
    get(index) {
        return this.array[index];
    }
    /**
     * Checks if the instance is empty.
     * @return {boolean} Whether the instance contains values.
     */
    isEmpty() {
        return this.array.length === 0;
    }
    /**
     * Returns the amount of items the instances is holding.
     * @return {number} The number of items.
     */
    size() {
        return this.array.length;
    }
    /**
     * Checks if the instance contains a specific value.
     * @param {T} value The value to look for.
     * @return {boolean} Whether the specified value was found.
     */
    contains(value) {
        return this.indexOf(value) !== -1;
    }
    /**
     * Returns the index of a specific value. Returns -1 if a value can not be found.
     * @param {T} value The value to find the index for.
     * @return {number} The index of the value. Will be -1 if the value does not exist in the instance.
     */
    indexOf(value) {
        return this.array.indexOf(value);
    }
    /**
     * A iteration loop handler.
     * @param {(value: T) => void} iterator The iterator arrow function to be used.
     */
    forEach(iterator) {
        for (let i = 0; i < this.size(); i++)
            iterator(this.get(i));
    }
    /**
     * A iteration loop handler using promises.
     * @param {(value: T) => Promise<void>} iterator An async function that returns a promise.
     * @return {Promise<void>} Returns a promise.
     */
    forEachSync(iterator) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.size(); i++)
                yield iterator(this.get(i));
        });
    }
    /**
     * Create a AFIterator instance from this current instance.
     * @return {AFIterator<T>} A new AFIterator.
     */
    toIterator() {
        return AFIterator_1.AFIterator.initWithArrayList(this);
    }
    /**
     * Convert this instance to a string using the provided separator.
     * @param {string} separator The separator to be used. Defaults to ", ".
     * @return {string} This instance as a string representation.
     */
    toString(separator) {
        return this.array.join(separator || ", ");
    }
    /**
     * Convert this instance to native JavaScript array.
     * @return {T[]} This instance as a JavaScript array representation.
     */
    toNativeArray() {
        return this.array;
    }
    /**
     * Convert this instance to a AFArray.
     * @return {string} This instance as a AFArray representation.
     */
    toAFArray() {
        return AFArray_1.AFArray.initFromNativeArray(this.array);
    }
    /**
     * Convert this instance to a AFArrayList.
     * @return {string} This instance as a AFArrayList representation.
     */
    toAFArrayList() {
        return this;
    }
    /**
     * Insert a value at a specific index.
     * @param {T} value The value to be inserted.
     * @param {number} index The index the value should be inserted at.
     */
    insert(value, index) {
        this.array.splice(0, 0, value);
    }
    /**
     * Add a value at the end of this instance.
     * @param {T} value The value to be added.
     */
    add(value) {
        this.array.push(value);
    }
    /**
     * Add values at the end of this instance.
     * @param {T} values The values to be added.
     */
    addAll(...values) {
        this.array.push(...values);
    }
    /**
     * Remove a value by its index.
     * @param {number} index The index that should be removed.
     */
    remove(index) {
        this.array.splice(index, 1);
    }
    /**
     * Remove all values from the instance.
     */
    removeAll() {
        this.array = [];
    }
    /**
     * Remove a value.
     * @param {T} value The value to be removed.
     */
    removeValue(value) {
        this.remove(this.indexOf(value));
    }
    /**
     * Create a new AFArrayList instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFArrayList<T>} A new AFArrayList instance.
     */
    static initWithValues(...values) {
        let afArrayList = new AFArrayList();
        afArrayList.array = values;
        return afArrayList;
    }
    /**
     * Create a new AFArrayList from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFArrayList<T>} A new AFArrayList instance.
     */
    static initFromNativeArray(nativeArray) {
        let afArrayList = new AFArrayList();
        afArrayList.array = nativeArray;
        return afArrayList;
    }
    /**
     * Create a new AFArrayList from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFArrayList<T>} A new AFArrayList instance.
     */
    static initFromArray(array) {
        let afArrayList = new AFArrayList();
        afArrayList.array = array.toNativeArray();
        return afArrayList;
    }
}
exports.AFArrayList = AFArrayList;
