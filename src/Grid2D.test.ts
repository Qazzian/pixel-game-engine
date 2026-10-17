import { describe, expect, test } from 'vitest';
import { Grid2D } from './Grid2D.js';

describe('Grid2D', () => {
	test('constructor no params', () => {
		expect(Grid2D).toBeDefined();
		const g = new Grid2D();
		expect(g).toBeDefined();
		expect(g).instanceOf(Grid2D);
	});

	test('Adding stuff', () => {
		const g = new Grid2D<string>();
		const pos = { x: 1, y: 1 };
		g.addTile(pos, 'BOB');
		expect(g.width).toBe(1);
		expect(g.height).toBe(1);
		expect(g.get(pos)).toBe('BOB');

		const pos2 = { x: -3, y: -6 };
		g.addTile(pos2, 'Alice');
		expect(g.width).toBe(4);
		expect(g.height).toBe(7);
		expect(g.get(pos2)).toBe('Alice');
	});
});
