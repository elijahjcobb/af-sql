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
const AFArrayList_1 = require("./AFArrayList");
const AFObject_1 = require("../AFObject");
const AFIterator_1 = require("../AFIterator");
/**
 * A generic immutable implementation of an array.
 */
class AFArray extends AFObject_1.AFObject {
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
        return AFIterator_1.AFIterator.initWithArray(this);
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
        return this;
    }
    /**
     * Convert this instance to a AFArrayList.
     * @return {string} This instance as a AFArrayList representation.
     */
    toAFArrayList() {
        return AFArrayList_1.AFArrayList.initFromArray(this);
    }
    /**
     * Create a new AFArray instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFArray<T>} A new AFArray instance.
     */
    static initWithValues(...values) {
        let afArray = new AFArray();
        afArray.array = values;
        return afArray;
    }
    /**
     * Create a new AFArray from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFArray<T>} A new AFArray instance.
     */
    static initFromNativeArray(nativeArray) {
        let afArray = new AFArray();
        afArray.array = nativeArray;
        return afArray;
    }
    /**
     * Create a new AFArray from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFArray<T>} A new AFArray instance.
     */
    static initFromArrayList(arrayList) {
        let afArray = new AFArray();
        afArray.array = arrayList.toNativeArray();
        return afArray;
    }
}
exports.AFArray = AFArray;
