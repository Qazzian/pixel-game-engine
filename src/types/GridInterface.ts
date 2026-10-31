import { Point } from '../locationObjects/Position.js';

export interface GridInterface {
	width: number;
	height: number;

	get({ x, y }: Point): unknown | undefined;
	inRange({ x, y }: Point): boolean;
	forEach(callback: (value: unknown, position: Point) => void): void;
}
