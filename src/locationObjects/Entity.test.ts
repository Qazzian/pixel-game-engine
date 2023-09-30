import Area from "./Area";
import {accelerate, Entity, hasCollided, move} from "./Entity";
import {Vector} from "../../index";


describe('Entity Class', () => {
	test('constructor', () => {
		const ent1 = new Entity(new Area(1, 1, 2, 2));
		expect(ent1).toBeDefined();
		expect(ent1).toMatchObject({x: 1, y: 1, width: 2, height: 2});
		expect(ent1.vector).toMatchObject({x: 0, y: 0});
	});

	test('Movement', () => {
		const ent1 = new Entity(new Area(1, 1, 2, 2));
		const movingEntity = accelerate(ent1, new Vector(1, 0));
		expect(movingEntity.vector).toMatchObject({x: 1, y: 0});
		const movedEntity = move(movingEntity, 10);
		expect(movedEntity).toMatchObject({x: 11, y: 1, vector: {x: 1, y: 0}});
	});


	describe('collision', () => {
		test('no collision', () => {
			const ent1 = new Entity(new Area(1, 1, 1, 1));
			const ent2 = new Entity(new Area(4, 4, 1, 1));
			expect(hasCollided(ent1, ent2)).toBeFalsy();
		});

		test('bottom-right corner', () => {
			const ent1 = new Entity(new Area(1, 1, 2, 2));
			const ent2 = new Entity(new Area(2, 2, 2, 2));
			expect(hasCollided(ent1, ent2)).toBeTruthy();
		});

		test('bottom-left corner', () => {
			const ent1 = new Entity(new Area(1, 1, 2, 2));
			const ent2 = new Entity(new Area(0, 2, 2, 2));
			expect(hasCollided(ent1, ent2)).toBeTruthy();
		});

		test('top-left corner', () => {
			const ent1 = new Entity(new Area(1, 1, 2, 2));
			const ent2 = new Entity(new Area(0, 0, 2, 2));
			expect(hasCollided(ent1, ent2)).toBeTruthy();
		});

		test('top-right corner', () => {
			const ent1 = new Entity(new Area(1, 1, 2, 2));
			const ent2 = new Entity(new Area(2, 0, 2, 2));
			expect(hasCollided(ent1, ent2)).toBeTruthy();
		});

		test('One object inside another',  () => {
			const inner = new Entity(new Area(3, 3, 1, 1));
			const outer = new Entity(new Area(0, 0, 8, 8));
			expect(hasCollided(inner, outer)).toBeTruthy();
		});

		test('two long objects overlapping', () => {
			const horizontalWall = new Entity(new Area(1, 5, 10, 1));
			const verticalWall = new Entity(new Area(5, 0, 1, 10));
			expect(hasCollided(verticalWall, horizontalWall)).toBeTruthy();
		});

		test('two long objects overlapping but other way round', () => {
			const horizontalWall = new Entity(new Area(1, 5, 10, 1));
			const verticalWall = new Entity(new Area(5, 0, 1, 10));
			expect(hasCollided(horizontalWall, verticalWall)).toBeTruthy();
		});
	});


});
