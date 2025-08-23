export class Grid<Type> {
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

	inRange(x: number, y: number): boolean {
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

	get(x: number, y: number): Type | undefined {
		if (this.inRange(x, y)) {
			return this.tiles[x][y];
		}
	}

	forEach(callback: { (mapTile: Type, x: number, y: number): void }) {
		if (this.tiles.length === 0) return;
		this.tiles.forEach((mapRow, x) => {
			if (mapRow.length === 0) return;
			mapRow.forEach((mapTIle, y) => {
				callback(mapTIle, x, y);
			});
		});
	}
}
