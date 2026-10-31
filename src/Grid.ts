import { Point, Position } from './locationObjects/Position.js';
import { GridInterface } from './types/GridInterface.js';

export class Grid<Type> implements GridInterface {
	public readonly tiles: Type[][];
	public readonly width: number;
	public readonly height: number;

	constructor(tiles: Type[][]) {
		this.tiles = tiles;
		if (tiles.length === 0 || tiles[0].length === 0) {
			this.width = 0;
			this.height = 0;
		} else {
			this.width = tiles.length;
			this.height = tiles[0].length;
		}
	}

	inRange({ x, y }: Point): boolean {
		if (x < 0) {
			return false;
		}
		if (y < 0) {
			return false;
		}
		if (x >= this.width) {
			return false;
		}
		return y < this.height;
	}

	get({ x, y }: Point): Type | undefined {
		if (this.inRange({ x, y })) {
			return this.tiles[x][y];
		}
	}

	forEach(callback: { (mapTile: Type, { x, y }: Point): void }) {
		if (this.tiles.length === 0) return;
		this.tiles.forEach((mapRow, x) => {
			if (mapRow.length === 0) return;
			mapRow.forEach((mapTIle, y) => {
				callback(mapTIle, { x, y });
			});
		});
	}
}
