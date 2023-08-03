"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
var random_seed_1 = require("random-seed");
var Position_1 = require("../locationObjects/Position");
var Random = /** @class */ (function () {
    function Random(seed) {
        this.seed = '';
        this.seed = seed || Date.now().toString();
        // @ts-ignore
        this.rand = new random_seed_1.create(seed);
    }
    Random.prototype.intBetween = function (min, max) {
        return this.rand.intBetween(min, max);
    };
    Random.prototype.vector = function () {
        var angle = this.rand.floatBetween(-Math.PI, Math.PI);
        return new Position_1.default(Math.cos(angle), Math.sin(angle));
    };
    return Random;
}());
exports.Random = Random;
