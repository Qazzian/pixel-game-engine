"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ray = /** @class */ (function () {
    function Ray(angle, radius) {
        this.angle = angle;
        this.dx = radius * Math.cos(angle);
        this.dy = radius * Math.sin(angle);
    }
    return Ray;
}());
exports.default = Ray;
