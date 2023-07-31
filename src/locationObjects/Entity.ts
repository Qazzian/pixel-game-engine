import Area from "./Area";
import Position from "./Position";
import {Vector} from "../../index";


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


export function hasCollided(subject: Entity|Area, other: Entity|Area) {
	// this bottom right corner is inside other block
	if (subject.x + subject.width >= other.x &&
		subject.x + subject.width <= other.x + other.width &&
		subject.y + subject.height >= other.y &&
		subject.y + subject.height <= other.y + other.height) {
		return true;
	}
	// subject bottom left corner is inside other block
	if (subject.x >= other.x &&
		subject.x <= other.x + other.width &&
		subject.y + subject.height >= other.y &&
		subject.y + subject.height <= other.y + other.height) {
		return true;
	}

	// subject top left corner is inside other block
	if (subject.x >= other.x &&
		subject.x <= other.x + other.width &&
		subject.y >= other.y &&
		subject.y <= other.y + other.height) {
		return true;
	}

	// subject's bottom left corner is inside other block
	if (subject.x + subject.width >= other.x &&
		subject.x + subject.width <= other.x + other.width &&
		subject.y >= other.y &&
		subject.y <= other.y + other.height) {
		return true;
	}
	// No overlap
	return false;
}

/**
 * Return a copy of the given Entity but moved based on it's vector multiplied by the timeframe
 * @param entity
 * @param timeFrame Number of milliseconds to multiply the Entities 0vector by.
 */
export function move(entity:Entity, timeFrame: number) {
	return {
		...entity,
		x: entity.x + (entity.vector.x * timeFrame),
		y: entity.y + (entity.vector.y * timeFrame),
	}
}

export function accelerate(entity: Entity, force: Vector) {
	return {
		...entity,
		vector: entity.vector.add(force),
	}
}

export function getX2(entity: Entity) {
	return entity.x + entity.width;
}
export function getY2(entity: Entity) :number {
	return entity.y + entity.height;
}
