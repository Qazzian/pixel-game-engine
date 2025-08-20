import { Area } from './Area.js';

describe('Area', () => {
	test('Area Class', () => {
		expect(Area).toBeDefined();
		const area1 = new Area(2, 5, 3, 4);
		expect(area1).toMatchObject({
			x1: 2,
			x2: 5,
			y1: 5,
			y2: 9,
			width: 3,
			height: 4,
		});

		const area2 = new Area(0, 0, 2, 3);
		expect(area2).toMatchObject({
			x1: 0,
			x2: 2,
			y1: 0,
			y2: 3,
			width: 2,
			height: 3,
		});

		expect(area1.equals(area2)).toBeFalsy();
		expect(area1.equals(new Area(2, 5, 3, 4))).toBeTruthy();
	});
});
