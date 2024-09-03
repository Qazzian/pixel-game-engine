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
        var cr = (0, collision_1.default)(ball, wall, 1);
        expect(cr.didCollide).toBeTruthy();
    });
    test('with a small object missing a stationary block.', function () {
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 0, 1, 3), new index_1.Vector(0, 0));
        var cr = (0, collision_1.default)(ball, wall, 0.5);
        expect(cr.didCollide).toBeFalsy();
    });
    test('with a small object hitting a moving block.', function () {
        //expect(false).toBe(true);
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 2, 1, 3), new index_1.Vector(0, -1));
        var cr = (0, collision_1.default)(ball, wall, 2);
        expect(cr.didCollide).toBeTruthy();
    });
    test('with a small object missing a moving block.', function () {
        //expect(false).toBe(true);
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 4, 1, 3), new index_1.Vector(0, -1));
        var cr = (0, collision_1.default)(ball, wall, 2);
        expect(cr.didCollide).toBeFalsy();
    });
    test('with a small object passing through a stationary block.', function () {
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(10, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 0, 1, 3), new index_1.Vector(0, 0));
        expect((0, collision_1.testTimeFrame)(ball, wall, 1)).toBeTruthy();
        var cr = (0, collision_1.default)(ball, wall, 1);
        expect(cr.didCollide).toBeTruthy();
    });
    test('Returns with position collision occurred', function () {
        var ball = new index_1.Entity(new index_1.Area(1, 1, 1, 1), new index_1.Vector(1, 0));
        var wall = new index_1.Entity(new index_1.Area(3, 2, 1, 3), new index_1.Vector(0, -1));
        var cr = (0, collision_1.default)(ball, wall, 2);
        expect(cr).toMatchObject({ x: 0, y: 0 });
    });
});
