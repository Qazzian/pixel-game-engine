"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Area_1 = require("./Area");
var Entity_1 = require("./Entity");
var index_1 = require("../../index");
describe('Entity Class', function () {
    test('constructor', function () {
        var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 2, 2));
        expect(ent1).toBeDefined();
        expect(ent1).toMatchObject({ x: 1, y: 1, width: 2, height: 2 });
        expect(ent1.vector).toMatchObject({ x: 0, y: 0 });
    });
    test('Movement', function () {
        var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 2, 2));
        var movingEntity = (0, Entity_1.accelerate)(ent1, new index_1.Vector(1, 0));
        expect(movingEntity.vector).toMatchObject({ x: 1, y: 0 });
        var movedEntity = (0, Entity_1.move)(movingEntity, 10);
        expect(movedEntity).toMatchObject({ x: 11, y: 1, vector: { x: 1, y: 0 } });
    });
    describe('collision', function () {
        test('no collision', function () {
            var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 1, 1));
            var ent2 = new Entity_1.Entity(new Area_1.default(4, 4, 1, 1));
            expect((0, Entity_1.hasCollided)(ent1, ent2)).toBeFalsy();
        });
        test('bottom-right corner', function () {
            var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 2, 2));
            var ent2 = new Entity_1.Entity(new Area_1.default(2, 2, 2, 2));
            expect((0, Entity_1.hasCollided)(ent1, ent2)).toBeTruthy();
        });
        test('bottom-left corner', function () {
            var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 2, 2));
            var ent2 = new Entity_1.Entity(new Area_1.default(0, 2, 2, 2));
            expect((0, Entity_1.hasCollided)(ent1, ent2)).toBeTruthy();
        });
        test('top-left corner', function () {
            var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 2, 2));
            var ent2 = new Entity_1.Entity(new Area_1.default(0, 0, 2, 2));
            expect((0, Entity_1.hasCollided)(ent1, ent2)).toBeTruthy();
        });
        test('top-right corner', function () {
            var ent1 = new Entity_1.Entity(new Area_1.default(1, 1, 2, 2));
            var ent2 = new Entity_1.Entity(new Area_1.default(2, 0, 2, 2));
            expect((0, Entity_1.hasCollided)(ent1, ent2)).toBeTruthy();
        });
        test('One object inside another', function () {
            var inner = new Entity_1.Entity(new Area_1.default(3, 3, 1, 1));
            var outer = new Entity_1.Entity(new Area_1.default(0, 0, 8, 8));
            expect((0, Entity_1.hasCollided)(inner, outer)).toBeTruthy();
        });
        test('two long objects overlapping', function () {
            var horizontalWall = new Entity_1.Entity(new Area_1.default(1, 5, 10, 1));
            var verticalWall = new Entity_1.Entity(new Area_1.default(5, 0, 1, 10));
            expect((0, Entity_1.hasCollided)(verticalWall, horizontalWall)).toBeTruthy();
        });
        test('two long objects overlapping but other way round', function () {
            var horizontalWall = new Entity_1.Entity(new Area_1.default(1, 5, 10, 1));
            var verticalWall = new Entity_1.Entity(new Area_1.default(5, 0, 1, 10));
            expect((0, Entity_1.hasCollided)(horizontalWall, verticalWall)).toBeTruthy();
        });
    });
});
