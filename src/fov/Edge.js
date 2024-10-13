"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Edge = /** @class */ (function () {
    /**
     * Create an Edge with a start position and a movement vector
     * @param {number} x1 - x start position
     * @param {number} y1 - y start position
     * @param {number} dx - x change
     * @param {number} dy - y change
     */
    function Edge(x1, y1, dx, dy) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x1;
        this.y2 = y1;
        if (typeof dx === 'number' && typeof dy === 'number') {
            this.extend(dx, dy);
        }
    }
    Edge.prototype.extend = function (dx, dy) {
        this.x2 += dx;
        this.y2 += dy;
    };
    Edge.prototype.getPoints = function () {
        return [
            { x: this.x1, y: this.y1 },
            { x: this.x2, y: this.y2 },
        ];
    };
    Edge.prototype.getVector = function () {
        return {
            x: this.x1,
            y: this.y1,
            dx: this.x2 - this.x1,
            dy: this.y2 - this.y1,
        };
    };
    return Edge;
}());
exports.default = Edge;
