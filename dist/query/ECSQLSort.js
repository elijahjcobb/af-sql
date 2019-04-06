"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("@elijahjcobb/collections");
class ECSQLSort extends collections_1.ECPrototype {
    constructor(key, direction) {
        super();
        this.key = key;
        this.direction = direction;
    }
    generateSQLCommand() {
        return `ORDER BY ${this.key} ${this.direction}`;
    }
}
exports.ECSQLSort = ECSQLSort;
