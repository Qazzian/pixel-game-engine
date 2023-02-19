export default class Position {
	public x: number;
	public y: number;

	constructor(x:number, y:number) {
		this.x = x;
		this.y = y;
	}

	multiply(other: Position) {
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}


}
