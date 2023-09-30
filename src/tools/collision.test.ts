import collision, {testTimeFrame} from './collision';
import {Area, Entity, Vector} from "../../index";

describe('Collision detection', () => {
	test('function definition',  () => {
		expect(collision).toBeDefined();
		expect(typeof collision).toBe('function');
	});

	test('with a small object hitting a stationary block.',  () => {
	  const ball = new Entity(new Area(1,1,1,1), new Vector(1, 0));
		const wall = new Entity(new Area(3, 0, 1, 3), new Vector(0, 0));
		expect(collision(ball, wall, 1)).toBeTruthy();
	});

	test('with a small object missing a stationary block.',  () => {
		const ball = new Entity(new Area(1,1,1,1), new Vector(1, 0));
		const wall = new Entity(new Area(3, 0, 1, 3), new Vector(0, 0));
		expect(collision(ball, wall, 0.5)).toBe(false);
	});

	test('with a small object hitting a moving block.',  () => {
		//expect(false).toBe(true);
		const ball = new Entity(new Area(1,1,1,1), new Vector(1, 0));
		const wall = new Entity(new Area(3, 2, 1, 3), new Vector(0, -1));
		expect(collision(ball, wall, 2)).toBeTruthy();
	});

	test('with a small object missing a moving block.',  () => {
		//expect(false).toBe(true);
		const ball = new Entity(new Area(1,1,1,1), new Vector(1, 0));
		const wall = new Entity(new Area(3, 4, 1, 3), new Vector(0, -1));
		expect(collision(ball, wall, 2)).toBeFalsy();
	});

	test('with a small object passing through a stationary block.',  () => {
		const ball = new Entity(new Area(1,1,1,1), new Vector(10, 0));
		const wall = new Entity(new Area(3, 0, 1, 3), new Vector(0, 0));
		expect(testTimeFrame(ball, wall, 1)).toBeTruthy();
		expect(collision(ball, wall, 1)).toBeTruthy();
	});
});
