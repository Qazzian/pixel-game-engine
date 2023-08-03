"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Position.prototype.multiply = function (other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    };
    return Position;
}());
exports.default = Position;
