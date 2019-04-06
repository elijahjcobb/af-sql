"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An abstract class representing a base object for all AFCollection classes.
 * Every class extends this class as it is the base class.
 */
class AFObject {
    /**
     * Pretty print the instance into the console.
     */
    print() {
        console.dir(this, { depth: null });
    }
}
exports.AFObject = AFObject;
