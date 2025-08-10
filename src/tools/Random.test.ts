import {Random} from './Random.js';

describe('Random', () => {
	test('constructor',  () => {
		expect(Random).toBeDefined();
		const rand = new Random('1');
		expect(rand).toBeDefined();
		expect(rand.intBetween(0, 10)).toBe(3);
	});

	test('Vectors',  () => {
		const rand = new Random('1');
		expect(rand.vector).toBeDefined();
		expect(rand.vector()).toMatchObject({x: 0.6210795857744511, y: -0.7837475027929826});
		expect(rand.vector()).toMatchObject({x: -0.7643821572941903, y: 0.6447634586499762});
	});
});
