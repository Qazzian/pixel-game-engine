"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Area = /** @class */ (function () {
    function Area(x, y, width, height) {
        this.x1 = x;
        this.x2 = x + width;
        this.y1 = y;
        this.y2 = y + height;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Area.prototype, "x", {
        get: function () {
            return this.x1;
        },
        set: function (x) {
            this.x1 = x;
            this.width = this.x2 - this.x1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "y", {
        get: function () {
            return this.y1;
        },
        set: function (y) {
            this.y1 = y;
            this.height = this.y2 - this.y1;
        },
        enumerable: false,
        configurable: true
    });
    return Area;
}());
exports.default = Area;
