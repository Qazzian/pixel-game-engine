"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Colour_1 = require("./Colour");
var EventEmitter = require("events");
var PixelGameEngine = /** @class */ (function (_super) {
    __extends(PixelGameEngine, _super);
    function PixelGameEngine(canvas, width, height, pixelWidth, pixelHeight) {
        var _this = _super.call(this) || this;
        _this.canvas = canvas;
        _this.context = canvas.getContext('2d');
        _this.width = width;
        _this.height = height;
        _this.pixelWidth = pixelWidth;
        _this.pixelHeight = pixelHeight;
        canvas.width = width * pixelWidth;
        canvas.height = height * pixelHeight;
        _this.lastTimestamp = 0;
        _this.isRunning = false;
        if (_this.context) {
            _this.context.font = "".concat(_this.pixelHeight, "px monospace");
            _this.context.textAlign = 'center';
            _this.context.textBaseline = "middle";
        }
        return _this;
    }
    /**
     * Start listening to the animation frames
     * @param onUpdate{function}
     */
    PixelGameEngine.prototype.start = function () {
        var _this = this;
        this.emit('start');
        this.lastTimestamp = 0;
        this.isRunning = true;
        window.requestAnimationFrame(function (timestamp) { return _this.step(timestamp); });
    };
    PixelGameEngine.prototype.step = function (timestamp) {
        var _this = this;
        if (!this.isRunning) {
            return;
        }
        this.emit('before-update', timestamp);
        var timePassed = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        var fps = Math.round(1000 / timePassed);
        var timeStats = {
            timePassed: timePassed,
            timestamp: timestamp,
            fps: fps
        };
        this.emit('update', timestamp);
        this.emit('after-update', timestamp, timeStats);
        window.requestAnimationFrame(function (timestamp) { return _this.step(timestamp); });
    };
    PixelGameEngine.prototype.stop = function () {
        this.emit('stop');
        this.isRunning = false;
    };
    PixelGameEngine.prototype.getContext = function () {
        if (!this.context) {
            throw new Error("Context element not initialised");
        }
        return this.context;
    };
    PixelGameEngine.prototype.clear = function (backgroundColor) {
        if (backgroundColor === void 0) { backgroundColor = Colour_1.COLOURS.BLACK; }
        var context = this.getContext();
        context.fillStyle = backgroundColor.stringify();
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    /**
     * Draw a game pixel on the screen.
     * @param x{Number}
     * @param y{Number}
     * @param color{Colour}
     */
    PixelGameEngine.prototype.draw = function (x, y, color) {
        var context = this.getContext();
        context.fillStyle = color.stringify();
        context.fillRect(x * this.pixelWidth, y * this.pixelHeight, this.pixelWidth, this.pixelHeight);
    };
    /**
     * Draw a line on the screen
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param color
     */
    PixelGameEngine.prototype.drawLine = function (x1, y1, x2, y2, color) {
        var context = this.getContext();
        var dx = x1 - x2;
        var dy = y1 - y2;
        context.fillStyle = color.stringify();
        context.strokeStyle = color.stringify();
        // Single block
        if (dx === 0 && dy === 0) {
            return this.draw(x1, y1, color);
        }
        // vertical
        if (dx === 0) {
            var top_1 = Math.min(y1, y2);
            return context.fillRect(x1 * this.pixelWidth, top_1 * this.pixelHeight, this.pixelWidth, (Math.abs(dy) * this.pixelHeight) + this.pixelHeight);
        }
        // horizontal
        if (dy === 0) {
            var left = Math.min(x1, x2);
            return context.fillRect(left * this.pixelWidth, y1 * this.pixelHeight, (Math.abs(dx) * this.pixelWidth) + this.pixelWidth, this.pixelHeight);
        }
        var yPre = y1 > y2 ? this.pixelHeight : 0;
        var yPost = y1 < y2 ? this.pixelHeight : 0;
        context.beginPath();
        context.moveTo(x1 * this.pixelWidth, (y1 * this.pixelHeight) + yPre);
        context.lineTo((x1 * this.pixelWidth) + this.pixelWidth, (y1 * this.pixelHeight) + yPre);
        context.lineTo((x2 * this.pixelWidth) + this.pixelWidth, (y2 * this.pixelHeight) + yPost);
        context.lineTo(x2 * this.pixelWidth, (y2 * this.pixelHeight) + yPost);
        context.closePath();
        context.fill();
    };
    PixelGameEngine.prototype.drawDebugLine = function (x1, y1, x2, y2, color) {
        var context = this.getContext();
        var dx = x1 - x2;
        var dy = y1 - y2;
        context.fillStyle = color.stringify();
        context.strokeStyle = color.stringify();
        context.beginPath();
        context.moveTo(x1 * this.pixelWidth, y1 * this.pixelHeight);
        context.lineTo(x2 * this.pixelWidth, y2 * this.pixelHeight);
        context.closePath();
        context.stroke();
    };
    /**
     * Draw a filled rectangle on the screen
     * @param x{number}
     * @param y{number}
     * @param width{number}
     * @param height{number}
     * @param color{Colour}
     */
    PixelGameEngine.prototype.fillRect = function (x, y, width, height, color) {
        var context = this.getContext();
        context.fillStyle = color.stringify();
        context.fillRect(x * this.pixelWidth, y * this.pixelHeight, width * this.pixelWidth, height * this.pixelHeight);
    };
    /**
     * Draw an outline of a rectangle on the screen
     * @param x{number}
     * @param y{number}
     * @param width{number}
     * @param height{number}
     * @param colour{Colour}
     */
    PixelGameEngine.prototype.drawRect = function (x, y, width, height, colour) {
        var context = this.getContext();
        context.strokeStyle = colour.stringify();
        for (var dx = 0; dx < this.pixelWidth; dx++) {
            for (var dy = 0; dy < this.pixelHeight; dy++) {
                context.strokeRect((x * this.pixelWidth) + dx, (y * this.pixelHeight) + dy, width * this.pixelWidth, height * this.pixelHeight);
            }
        }
    };
    /**
     *
     * @param coords[] Array of {x, y} coordinate pairs
     * @param colour{Colour}
     */
    PixelGameEngine.prototype.drawPolygon = function (coords, colour) {
        var _this = this;
        var context = this.getContext();
        var startPos = coords[0];
        context.strokeStyle = colour.stringify();
        context.beginPath();
        context.moveTo(startPos.x * this.pixelWidth, startPos.y * this.pixelHeight);
        coords.forEach(function (pos) {
            context.lineTo(pos.x * _this.pixelWidth, pos.y * _this.pixelHeight);
        });
        context.lineTo(startPos.x * this.pixelWidth, startPos.y * this.pixelHeight);
        context.stroke();
    };
    /**
     * Draw a single utf-8 character onto the canvas
     * @param x {Number}
     * @param y {Number}
     * @param character {String}
     * @param colour {Colour}
     */
    PixelGameEngine.prototype.drawCharacter = function (x, y, character, colour) {
        var context = this.getContext();
        context.fillStyle = colour.stringify();
        var charX = x * this.pixelWidth + (this.pixelWidth / 2);
        var charY = y * this.pixelHeight + (this.pixelHeight / 2);
        context.fillText(character, charX, charY);
    };
    /**
     *
     * @param image{Image}
     * @param sourcePosition{[x, y, width, height]} The position of the sprite in the source image
     * @param destinationPosition{[x, y]} Position to place the sprite in the final image
     */
    PixelGameEngine.prototype.drawSprite = function (image, sourcePosition, destinationPosition) {
        var context = this.getContext();
        var sx = sourcePosition[0], sy = sourcePosition[1], sw = sourcePosition[2], sh = sourcePosition[3];
        var dx = destinationPosition[0] * this.pixelWidth;
        var dy = destinationPosition[1] * this.pixelHeight;
        var _a = [this.pixelWidth, this.pixelHeight], dw = _a[0], dh = _a[1];
        context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    };
    return PixelGameEngine;
}(EventEmitter));
exports["default"] = PixelGameEngine;
