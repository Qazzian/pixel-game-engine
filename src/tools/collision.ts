import {Area, Entity} from "../../index";
import {getX2, getY2, hasCollided, move} from "../locationObjects/Entity";

import {info} from "console";

/**
 * Do the two entities collide during the tick interval
 * @param a
 * @param b
 * @param timeFrame How many milliseconds to simulate the collision over
 */
export default function(a: Entity, b: Entity, timeFrame: number) {


	const couldHaveCollided = testTimeFrame(a, b, timeFrame);
	if(!couldHaveCollided) {
		info('no collision');
		return false;
	}

	const movedA = move(a, timeFrame);
	const movedB = move(b, timeFrame);
	if (hasCollided(movedA, movedB)) {
		return true;
	}

	return splitAndTest(a, b, timeFrame);
}

function splitAndTest(a: Entity, b: Entity, timeFrame: number):boolean {
	info('splitAndTest', {a, b, timeFrame});
	const halfTime = timeFrame / 2;
	const lateA = move(a, halfTime);
	const lateB = move(b, halfTime);

	const earlyTest = testTimeFrame(a, b, halfTime);
	const lateTest = testTimeFrame(lateA, lateB, halfTime);

	if(earlyTest && lateTest) {
		info('full collision return true');
		return true;
	}
	if(earlyTest) {
		info('early collision.');
		return splitAndTest(a, b, halfTime);
	}
	if(lateTest) {
		info('late collision.');
		return splitAndTest(lateA, lateB, halfTime);
	}
	return false;

}

export function testTimeFrame(a: Entity, b: Entity, timeFrame: number) {

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
