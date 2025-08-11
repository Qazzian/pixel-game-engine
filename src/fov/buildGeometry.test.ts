import {buildGeometry} from './buildGeometry.js';
import {Grid} from "../Grid.js";


describe('buildGeometry', () => {
	test('is defined', () => {
		expect(buildGeometry).toBeDefined();
	});

	test('Empty map returns empty array', () => {
		const emptyMap: Grid<number> = new Grid([
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]);
		const geom = buildGeometry(emptyMap, () => false);
		expect(geom).toBeDefined();
		expect(geom.length).toBe(0);
	});

	// 	// TODO convert to test.each
	describe('for only one block', () => {
		const tests = [
			{
				name: 'single east edge',
				map: [[1], [0]],
				geom: [{x1: 1, x2: 1, y1: 0, y2: 1}],
			},
			{
				name: 'single west edge',
				map: [[0], [1]],
				geom: [{x1: 1, x2: 1, y1: 0, y2: 1}],
			},
			{
				name: 'single north edge',
				map: [[0, 1]],
				geom: [{x1: 0, x2: 1, y1: 1, y2: 1}],
			},
			{
				name: 'single south edge',
				map: [[1, 0]],
				geom: [{x1: 0, x2: 1, y1: 1, y2: 1}],
			},
			{
				name: 'isolated block',
				map: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
				geom: [
					{x1: 1, x2: 2, y1: 1, y2: 1},
					{x1: 2, x2: 2, y1: 1, y2: 2},
					{x1: 1, x2: 2, y1: 2, y2: 2},
					{x1: 1, x2: 1, y1: 1, y2: 2},
				],
			},
		];

		test.each(tests)(`$name`, ({map, geom}) => {
			const calculatedGeom = buildGeometry(new Grid(map), (b) => !!b);
			expect(calculatedGeom).toMatchObject(geom);
		});
	});

	describe('for adjacent blocks', () => {

		// TODO convert to test.each

		const tests = [
			{
				name: 'two high',
				map: [
					[0, 0, 0],
					[1, 1, 0],
					[0, 0, 0]],
				geom: [
					{x1: 2, x2: 2, y1: 0, y2: 2},
					{x1: 1, x2: 1, y1: 0, y2: 2},
					{x1: 1, x2: 2, y1: 2, y2: 2},
				],
			},
			{
				name: 'snake like',
				map: [
					[0, 0, 0, 0, 0],
					[0, 1, 0, 0, 0],
					[0, 1, 0, 0, 0],
					[0, 1, 0, 0, 0],
					[0, 1, 1, 1, 0],
					[0, 0, 0, 1, 0],
					[0, 0, 0, 1, 0],
					[0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0],
				],
				geom: [
					{ x1: 1, x2: 5, y1: 1, y2: 1 },
					{ x1: 1, x2: 4, y1: 2, y2: 2 },
					{ x1: 1, x2: 1, y1: 1, y2: 2 },
					{ x1: 5, x2: 5, y1: 1, y2: 3 },
					{ x1: 4, x2: 4, y1: 2, y2: 4 },
					{ x1: 4, x2: 8, y1: 4, y2: 4 },
					{ x1: 5, x2: 8, y1: 3, y2: 3 },
					{ x1: 7, x2: 8, y1: 1, y2: 1 },
					{ x1: 8, x2: 8, y1: 1, y2: 2 },
					{ x1: 7, x2: 8, y1: 2, y2: 2 },
					{ x1: 7, x2: 7, y1: 1, y2: 2 },
					{ x1: 8, x2: 8, y1: 3, y2: 4 }
				],
			},
		];


		test.each(tests)(`$name`, ({map, geom}) => {
			const calculatedGeom = buildGeometry(new Grid(map), (b) => !!b);
			expect(calculatedGeom).toMatchObject(geom);
		});
	});
});
