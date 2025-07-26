export class Grid <Type>{
	public readonly tiles: Type[][];
	public readonly width: number;
	public readonly height: number;

	constructor(tiles: Type[][]) {
		this.tiles = tiles;
		this.width = tiles.length;
		this.height = tiles[0].length;
	}

	inRange(x: number, y: number) : boolean {
		if (x < 0) {return false;}
		if (y < 0) {return false;}
		if (x >= this.width) {return false;}
		return y < this.height;
	}

	get(x: number, y: number) : Type | undefined {
		if (this.inRange(x, y)) {
			return this.tiles[x][y];
		}
	}

	forEach(callback: { (mapTile: Type, x: number, y: number): void; (arg0: Type, arg1: number, arg2: number): void; }) {
		this.tiles.forEach((mapRow, x) => mapRow.forEach((mapTIle, y) => {
			callback(mapTIle, x, y)
		}))
	}
}
