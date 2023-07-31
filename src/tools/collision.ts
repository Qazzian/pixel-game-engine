import {Area, Entity} from "../../index";
import {getX2, getY2, hasCollided, move} from "../locationObjects/Entity";

/**
 * Do the two entities collide during the tick interval
 * @param a
 * @param b
 * @param timeFrame How many milliseconds to simulate the collision over
 */
export default function(a: Entity, b: Entity, timeFrame: number) {
	// TODO work out the translated areas for each entity xMin, yMin, xMax, yMax
	const movedA = move(a, timeFrame);
	const movedB = move(b, timeFrame);
	const aMinX = Math.min(a.x, movedA.x);
	const aMinY = Math.min(a.y, movedA.y);
	const aMaxX = Math.max(getX2(a), getX2(movedA));
	const aMaxY = Math.max(getY2(a), getY2(movedA));
	const aSpace = new Area(aMinX, aMinY, aMaxX - aMinX, aMaxY - aMinY);

	const bMinX = Math.min(b.x, movedB.x);
	const bMinY = Math.min(b.y, movedB.y);
	const bMaxX = Math.max(getX2(b), getX2(movedB));
	const bMaxY = Math.max(getY2(b), getY2(movedB));
	const bSpace =  new Area(b.x, b.y, bMaxX - bMinX, bMaxY - bMinY);

	return hasCollided(aSpace, bSpace);
}
