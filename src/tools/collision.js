"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var Entity_1 = require("../locationObjects/Entity");
var console_1 = require("console");
/**
 * Do the two entities collide during the tick interval
 * @param a
 * @param b
 * @param timeFrame How many milliseconds to simulate the collision over
 */
function default_1(a, b, timeFrame) {
    var couldHaveCollided = testTimeFrame(a, b, timeFrame);
    if (!couldHaveCollided) {
        (0, console_1.info)('no collision');
        return false;
    }
    var movedA = (0, Entity_1.move)(a, timeFrame);
    var movedB = (0, Entity_1.move)(b, timeFrame);
    if ((0, Entity_1.hasCollided)(movedA, movedB)) {
        return true;
    }
    return splitAndTest(a, b, timeFrame);
}
exports.default = default_1;
function splitAndTest(a, b, timeFrame) {
    (0, console_1.info)('splitAndTest', { a: a, b: b, timeFrame: timeFrame });
    var halfTime = timeFrame / 2;
    var lateA = (0, Entity_1.move)(a, halfTime);
    var lateB = (0, Entity_1.move)(b, halfTime);
    var earlyTest = testTimeFrame(a, b, halfTime);
    var lateTest = testTimeFrame(lateA, lateB, halfTime);
    if (earlyTest && lateTest) {
        (0, console_1.info)('full collision return true');
        return true;
    }
    if (earlyTest) {
        (0, console_1.info)('early collision.');
        return splitAndTest(a, b, halfTime);
    }
    if (lateTest) {
        (0, console_1.info)('late collision.');
        return splitAndTest(lateA, lateB, halfTime);
    }
    return false;
}
function testTimeFrame(a, b, timeFrame) {
    var movedA = (0, Entity_1.move)(a, timeFrame);
    var movedB = (0, Entity_1.move)(b, timeFrame);
    var aMinX = Math.min(a.x, movedA.x);
    var aMinY = Math.min(a.y, movedA.y);
    var aMaxX = Math.max((0, Entity_1.getX2)(a), (0, Entity_1.getX2)(movedA));
    var aMaxY = Math.max((0, Entity_1.getY2)(a), (0, Entity_1.getY2)(movedA));
    var aSpace = new index_1.Area(aMinX, aMinY, aMaxX - aMinX, aMaxY - aMinY);
    var bMinX = Math.min(b.x, movedB.x);
    var bMinY = Math.min(b.y, movedB.y);
    var bMaxX = Math.max((0, Entity_1.getX2)(b), (0, Entity_1.getX2)(movedB));
    var bMaxY = Math.max((0, Entity_1.getY2)(b), (0, Entity_1.getY2)(movedB));
    var bSpace = new index_1.Area(b.x, b.y, bMaxX - bMinX, bMaxY - bMinY);
    return (0, Entity_1.hasCollided)(aSpace, bSpace);
}
