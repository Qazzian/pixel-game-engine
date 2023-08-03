"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collision_1 = require("./collision");
var index_1 = require("../../index");
describe('Collision detection', function () {
    test('function definition', function () {
        expect(collision_1.default).toBeDefined();
        expect(typeof collision_1.default).toBe('function');
    });
    test('with a small object hitting a stationary block.', function () {
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 0, 1, 3), new index_1.Vector(0, 0));
        expect((0, collision_1.default)(ball, wall, 1)).toBeTruthy();
    });
    test('with a small object missing a stationary block.', function () {
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 0, 1, 3), new index_1.Vector(0, 0));
        expect((0, collision_1.default)(ball, wall, 0.5)).toBe(false);
    });
    test('with a small object hitting a moving block.', function () {
        expect(false).toBe(true);
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 0, 1, 3), new index_1.Vector(0, 0));
        expect((0, collision_1.default)(ball, wall, 1)).toBeTruthy();
    });
    // TODO moving objects that cross paths but don't hit
});
