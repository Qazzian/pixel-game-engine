"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var Entity_1 = require("../locationObjects/Entity");
/**
 * Do the two entities collide during the tick interval
 * @param a
 * @param b
 * @param timeFrame How many milliseconds to simulate the collision over
 */
function default_1(a, b, timeFrame) {
    // TODO work out the translated areas for each entity xMin, yMin, xMax, yMax
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
exports.default = default_1;
