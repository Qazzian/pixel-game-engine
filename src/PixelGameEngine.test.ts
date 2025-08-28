import jsdom from 'jsdom';
import { setupJestCanvasMock } from 'jest-canvas-mock';
import { PixelGameEngine } from './PixelGameEngine';

describe('PixelGameEngine', () => {
	test('is defined', () => {
		expect(PixelGameEngine).toBeDefined();
	});

	test('can be instantiated', () => {
		const theDom = new jsdom.JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true });
		const canvas = theDom.window.document.createElement('canvas');
		const game = new PixelGameEngine(canvas, 100, 100, 10, 10);
		expect(game instanceof PixelGameEngine).toBe(true);
	});
});
