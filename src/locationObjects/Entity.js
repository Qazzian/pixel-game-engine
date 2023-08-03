"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getY2 = exports.getX2 = exports.accelerate = exports.move = exports.hasCollided = exports.Entity = void 0;
var Position_1 = require("./Position");
var Entity = /** @class */ (function () {
    function Entity(area, direction) {
        if (direction === void 0) { direction = new Position_1.default(0, 0); }
        this.x = area.x;
        this.y = area.y;
        this.width = area.width;
        this.height = area.height;
        this.vector = direction;
    }
    return Entity;
}());
exports.Entity = Entity;
function hasCollided(subject, other) {
    // this bottom right corner is inside other block
    if (subject.x + subject.width >= other.x &&
        subject.x + subject.width <= other.x + other.width &&
        subject.y + subject.height >= other.y &&
        subject.y + subject.height <= other.y + other.height) {
        return true;
    }
    // subject bottom left corner is inside other block
    if (subject.x >= other.x &&
        subject.x <= other.x + other.width &&
        subject.y + subject.height >= other.y &&
        subject.y + subject.height <= other.y + other.height) {
        return true;
    }
    // subject top left corner is inside other block
    if (subject.x >= other.x &&
        subject.x <= other.x + other.width &&
        subject.y >= other.y &&
        subject.y <= other.y + other.height) {
        return true;
    }
    // subject's bottom left corner is inside other block
    if (subject.x + subject.width >= other.x &&
        subject.x + subject.width <= other.x + other.width &&
        subject.y >= other.y &&
        subject.y <= other.y + other.height) {
        return true;
    }
    // No overlap
    return false;
}
exports.hasCollided = hasCollided;
/**
 * Return a copy of the given Entity but moved based on it's vector multiplied by the timeframe
 * @param entity
 * @param timeFrame Number of milliseconds to multiply the Entities 0vector by.
 */
function move(entity, timeFrame) {
    return __assign(__assign({}, entity), { x: entity.x + (entity.vector.x * timeFrame), y: entity.y + (entity.vector.y * timeFrame) });
}
exports.move = move;
function accelerate(entity, force) {
    return __assign(__assign({}, entity), { vector: entity.vector.add(force) });
}
exports.accelerate = accelerate;
function getX2(entity) {
    return entity.x + entity.width;
}
exports.getX2 = getX2;
function getY2(entity) {
    return entity.y + entity.height;
}
exports.getY2 = getY2;
