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
class AFSet {
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor(...objects) {
        this.list = new AFArrayList_1.AFArrayList();
    }
    /**
     * Add an object to the set.
     * @param {T} object The object to be added to the set.
     */
    add(object) {
        if (!this.list.contains(object))
            this.list.add(object);
    }
    /**
     * Remove an object from the set.
     * @param {T} object The object to be removed from the set.
     */
    remove(object) {
        this.list.removeValue(object);
    }
    /**
     * Create a new set from this set and another set.
     * @param {AFSet<T>} set Another set to unionize with this set.
     * @return {AFSet<T>} A new AFSet instance.
     */
    union(set) {
        let newSet = new AFSet();
        let list = new AFArrayList_1.AFArrayList();
        this.list.forEach((object) => { if (!list.contains(object))
            list.add(object); });
        set.list.forEach((object) => { if (!list.contains(object))
            list.add(object); });
        newSet.list = list;
        return newSet;
    }
    /**
     * Create a new set from the intersection of this set and another set.
     * @param {AFSet<T>} set Another set to intersect with this set.
     * @return {AFSet<T>} A new AFSet instance.
     */
    intersection(set) {
        let newSet = new AFSet();
        let list = new AFArrayList_1.AFArrayList();
        this.list.forEach((object) => { if (set.list.contains(object))
            list.add(object); });
        newSet.list = list;
        return newSet;
    }
    /**
     * Create a new set from the difference between this set and another set.
     * @param {AFSet<T>} set Another set to get the difference between.
     * @return {AFSet<T>} A new AFSet instance.
     */
    difference(set) {
        let newSet = new AFSet();
        let list = new AFArrayList_1.AFArrayList();
        this.list.forEach((object) => { if (!set.list.contains(object))
            list.add(object); });
        newSet.list = list;
        return newSet;
    }
    /**
     * Checks if a set is a subset of this set.
     * @param {AFSet<T>} set A possible subset.
     * @return {boolean} Whether the specified set is a subset of this set.
     */
    subset(set) {
        for (let i = 0; i < this.list.size(); i++)
            if (!set.list.contains(this.list.get(i)))
                return false;
        return true;
    }
    /**
     * Create a new AFSet instance from specific values.
     * @param {T} values The values to add to the new instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initWithValues(...values) {
        let set = new AFSet();
        set.list = AFArrayList_1.AFArrayList.initFromNativeArray(values);
        return set;
    }
    /**
     * Create a new AFSet from a native JavaScript array.
     * @param {T[]} nativeArray The array of values to add to this instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initFromNativeArray(nativeArray) {
        let set = new AFSet();
        set.list = AFArrayList_1.AFArrayList.initFromNativeArray(nativeArray);
        return set;
    }
    /**
     * Create a new AFSet from a AFArray.
     * @param {AFArray<T>} array The AFArray whose values should be added to this instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initFromArray(array) {
        let set = new AFSet();
        set.list = AFArrayList_1.AFArrayList.initFromArray(array);
        return set;
    }
    /**
     * Create a new AFSet from a AFArrayList.
     * @param {AFArrayList<T>} arrayList The AFArrayList whose values should be added to this instance.
     * @return {AFSet<T>} A new AFSet instance.
     */
    static initFromArrayList(arrayList) {
        let set = new AFSet();
        set.list = arrayList;
        return set;
    }
}
exports.AFSet = AFSet;
