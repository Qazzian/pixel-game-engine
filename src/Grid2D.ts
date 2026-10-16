/**
 * A grid that can use negative coordinates
 * Built on a 2D Map
 */
import {Point } from "./locationObjects/Position.js";


export class Grid2D<Type> {
	public readonly tiles: Map<number, Map<number, Type>>;

	private minX = 0;
	private minY = 0;
	private maxX = 0;
	private maxY = 0;


	constructor() {
			this.tiles = new Map<number, Map<number, Type>>();
	}

	get width() {
		return Math.abs(this.maxX - this.minX);
	}

	get height() {
		return Math.abs(this.maxY - this.minY);
	}

	addTile(pos: Point, data: Type) {
		if (!this.tiles.has(pos.x)) {
			this.tiles.set(pos.x, new Map<number, Type>());
		}
		const xPath = this.tiles.get(pos.x);
		xPath!.set(pos.y, data);

		this._updateSize(pos);
	}

	get(pos: Point): Type | undefined {
		if (this.inRange(pos)) {
			const xPath = this.tiles.get(pos.x);
			if (xPath) {
				return xPath.get(pos.y);
			}
		}
	}

	_updateSize(pos: Point) {
		if (pos.x < this.minX) {
			this.minX = pos.x;
		}
		if (pos.x > this.maxX) {
			this.maxX = pos.x;
		}
		if (pos.y < this.minY) {
			this.minY = pos.y;
		}
		if (pos.y > this.maxY) {
			this.maxY = pos.y;
		}

	}

	inRange(pos: Point): boolean {
		if (pos.x < this.minX) {
			return false;
		}
		if (pos.y < this.minY) {
			return false;
		}
		if (pos.x > this.maxX) {
			return false;
		}
		return pos.y <= this.maxY;
	}
}
