"use strict";
exports.__esModule = true;
exports.Grid = void 0;
var Grid = /** @class */ (function () {
    function Grid(tiles) {
        this.tiles = tiles;
        this.width = tiles.length;
        this.height = tiles[0].length;
    }
    Grid.prototype.inRange = function (x, y) {
        if (x < 0) {
            return false;
        }
        if (y < 0) {
            return false;
        }
        if (x >= this.width) {
            return false;
        }
        return y < this.height;
    };
    Grid.prototype.get = function (x, y) {
        if (this.inRange(x, y)) {
            return this.tiles[x][y];
        }
    };
    Grid.prototype.forEach = function (callback) {
        this.tiles.forEach(function (mapRow, x) { return mapRow.forEach(function (mapTIle, y) {
            callback(mapTIle, x, y);
        }); });
    };
    return Grid;
}());
exports.Grid = Grid;
