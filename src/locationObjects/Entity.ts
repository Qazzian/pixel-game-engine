import Area from "./Area";
import Position from "./Position";


export interface EntityInterface {
	x: number,
	y: number,
	width: number,
	height: number,
	vector: Position,
}

export class Entity implements EntityInterface {
	x: number;
	y: number;
	width: number;
	height: number;
	vector: Position;

	constructor(area: Area, direction: Position = new Position(0, 0)) {
		this.x = area.x;
		this.y = area.y;
		this.width = area.width;
		this.height = area.height;
		this.vector = direction;
	}
}


export function hasCollided(subject: Entity, other: Entity) {
	// this bottom right corner is inside other block
	if (subject.x + subject.width > other.x &&
		subject.x + subject.width < other.x + other.width &&
		subject.y + subject.height > other.y &&
		subject.y + subject.height < other.y + other.height) {
		return true;
	}
	// subject bottom left corner is inside other block
	if (subject.x > other.x &&
		subject.x < other.x + other.width &&
		subject.y + subject.height > other.y &&
		subject.y + subject.height < other.y + other.height) {
		return true;
	}

	// subject top left corner is inside other block
	if (subject.x > other.x &&
		subject.x < other.x + other.width &&
		subject.y > other.y &&
		subject.y < other.y + other.height) {
		return true;
	}

	// subject bottom left corner is inside other block
	if (subject.x + subject.width > other.x &&
		subject.x + subject.width < other.x + other.width &&
		subject.y > other.y &&
		subject.y < other.y + other.height) {
		return true;
	}
	// No overlap
	return false;
}
