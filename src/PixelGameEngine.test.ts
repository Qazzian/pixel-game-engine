import 'jest-canvas-mock';
import { PixelGameEngine } from './PixelGameEngine';

describe('PixelGameEngine', () => {
	test('is defined', () => {
		expect(PixelGameEngine).toBeDefined();
	});

	test('can be instantiated', () => {
		const canvas = document.createElement('canvas');
		const game = new PixelGameEngine(canvas, 100, 100, 10, 10);
		expect(game instanceof PixelGameEngine).toBe(true);
	});

	test('clear method fills the canvas', () => {
		const canvas = document.createElement('canvas');
		const game = new PixelGameEngine(canvas, 100, 100, 10, 10);
		const ctx = game.getContext();
		game.clear();
		expect(ctx.fillRect).toHaveBeenCalled();
		expect(ctx.__getEvents()).toMatchSnapshot();
	});
});
