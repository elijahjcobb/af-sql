"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const af_collections_1 = require("af-collections");
class AFDBSort extends af_collections_1.AFObject {
    constructor(key, direction) {
        super();
        this.key = key;
        this.direction = direction;
    }
    generateSQLCommand() {
        return `ORDER BY ${this.key} ${this.direction}`;
    }
}
exports.AFDBSort = AFDBSort;
