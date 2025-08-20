export interface Point {
	x: number;
	y: number;
}

export class Position {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(other: Position) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	multiply(other: Position) {
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	equals(other: Position) {
		return this.x === other.x && this.y === other.y;
	}
}
