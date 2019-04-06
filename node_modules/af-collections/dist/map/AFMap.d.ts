/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
import { AFObject } from "../AFObject";
import { AFArray } from "../array/AFArray";
import { AFDictionary } from "./AFDictionary";
import { AFMappable } from "./AFMappable";
import { AFIterator } from "../AFIterator";
/**
 * An implementation of a JSON object that uses generics.
 */
export declare class AFMap<K, V> extends AFObject implements AFMappable<K, V> {
    private map;
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor();
    /**
     * Get a value for a specific key from the instance.
     * @param {K} key The key to be used.
     * @return {V} The value for the specified key.
     */
    get(key: K): V;
    /**
     * Get the key for a specified value.
     * @param {V} value The value.
     * @return {K} The key for the specified value.
     */
    getKey(value: V): K;
    /**
     * Returns the number of key value pairs on the instance.
     * @return {number}
     */
    size(): number;
    /**
     * Checks if the instance contains a specific key.
     * @param {K} key The key to be searched for.
     * @return {boolean} Whether the key was found on the instance.
     */
    containsKey(key: K): boolean;
    /**
     * Get all the keys of the instance.
     * @return {AFArray<K>} A new AFArray instance containing all the keys on the instance.
     */
    keys(): AFArray<K>;
    /**
     * Get an AFIterator instance with the keys from the instance.
     * @return {AFIterator<K>}
     */
    keyIterator(): AFIterator<K>;
    /**
     * Checks if the instance contains a specific value.
     * @param {V} value The value to be searched for.
     * @return {boolean} Whether the value was found on the instance.
     */
    containsValue(value: V): boolean;
    /**
     * Get all the values of the instance.
     * @return {AFArray<V>} A new AFArray instance containing all the values on the instance.
     */
    values(): AFArray<V>;
    /**
     * Get an AFIterator instance with the values from the instance.
     * @return {AFIterator<V>} A new AFIterator instance.
     */
    valueIterator(): AFIterator<V>;
    /**
     * Checks if the instance contains a specific key and value pair.
     * @param {K} key The key to be searched for.
     * @param {V} value The value to be searched for.
     * @return {boolean} Whether the key value pair was found on the instance.
     */
    containsKeyValuePair(key: K, value: V): boolean;
    /**
     * An iterator helper to iterator through every key value pair.
     * @param {(key: K, value: V) => void} iterator An arrow function.
     */
    forEach(iterator: ((key: K, value: V) => void)): void;
    /**
     * An iterator helper to iterator through every key value pair that supports each iteration being an async function.
     * @param {(key: K, value: V) => Promise<void>} iterator An async arrow function.
     * @return {Promise<void>} A promise.
     */
    forEachSync(iterator: ((key: K, value: V) => Promise<void>)): Promise<void>;
    /**
     * Convert this instance to a native JavaScript object. Calls toNativeObject() method on instance.
     * @return {object} A native JavaScript object (JSON).
     */
    toJSON(): object;
    /**
     * Convert this instance to a native JavaScript object. Same as toJSON() function.
     * @return {object} A native JavaScript object (JSON).
     */
    toNativeObject(): object;
    /**
     * Convert this instance to a JSON string.
     * @return {string} A string with JSON encoding.
     */
    toString(): string;
    /**
     * Convert this instance to a AFMap instance.
     * @return {AFMap<K, V>} A new AFMap instance with the same internal data as the instance.
     */
    toMap(): AFMap<K, V>;
    /**
     * Convert this instance to a native Map instance.
     * @return {Map<K, V>} A new Map instance with the same internal data as the instance.
     */
    toNativeMap(): Map<K, V>;
    /**
     * Convert this instance to a AFDictionary instance.
     * @return {AFDictionary<K, V>} A new AFDictionary instance with the same internal data as the instance.
     */
    toDictionary(): AFDictionary<K, V>;
    /**
     * Set a value for a key.
     * @param {K} key A key to be added.
     * @param {V} value The value for the specified key.
     */
    set(key: K, value: V): void;
    /**
     * Remove the key and value for the specified key.
     * @param {K} key The key of the key value pair to be removed.
     */
    remove(key: K): void;
    /**
     * Remove all internal data from the instance.
     */
    removeAll(): void;
    /**
     * Remove the key and value for the specified value.
     * @param {V} value The value of the key value pair to be removed.
     */
    removeValue(value: V): void;
    /**
     * Create a new instance with keys and values.
     * @param {K[]} keys A native JavaScript array of keys.
     * @param {V[]} values A native JavaScript array of values.
     * @return {AFMap<K, V>} A new AFMap instance.
     */
    static initWithKeysAndValues<K, V>(keys: K[], values: V[]): AFMap<K, V>;
    /**
     * Create a new instance with keys and values.
     * @param {K[]} keys An AFArray instance containing keys.
     * @param {V[]} values An AFArray instance containing values.
     * @return {AFMap<K, V>} A new AFMap instance.
     */
    static initWithKeyArrayAndValueArray<K, V>(keys: AFArray<K>, values: AFArray<V>): AFMap<K, V>;
    /**
     * Create a new instance with a native JavaScript object.
     * @param {object} nativeObject A native JavaScript object.
     * @return {AFMap<string, V>} A new AFDictionary instance.
     */
    static initWithNativeObject<V>(nativeObject: object): AFMap<string, V>;
    /**
     * Create a new instance with a native Map instance.
     * @param {Map<K, V>} map A native Map instance.
     * @return {AFMap<K, V>} A new AFMap instance.
     */
    static initWithNativeMap<K, V>(map: Map<K, V>): AFMap<K, V>;
    /**
     * Create a new instance with a AFDictionary instance.
     * @param {AFDictionary<K, V>} dictionary An AFDictionary instance.
     * @return {AFMap<K, V>} A new AFMap instance.
     */
    static initWithDictionary<K, V>(dictionary: AFDictionary<K, V>): AFMap<K, V>;
}
