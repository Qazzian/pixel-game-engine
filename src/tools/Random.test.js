"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Random_1 = require("./Random");
describe('Random', function () {
    test('constructor', function () {
        expect(Random_1.Random).toBeDefined();
        var rand = new Random_1.Random('1');
        expect(rand).toBeDefined();
        expect(rand.intBetween(0, 10)).toBe(3);
    });
    test('Vectors', function () {
        var rand = new Random_1.Random('1');
        expect(rand.vector).toBeDefined();
        expect(rand.vector()).toMatchObject({ x: 0.6210795857744511, y: -0.7837475027929826 });
        expect(rand.vector()).toMatchObject({ x: -0.7643821572941903, y: 0.6447634586499762 });
    });
});
