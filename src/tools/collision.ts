import {Area, Entity} from "../../index.js";
import {getX2, getY2, hasCollided, move} from "../locationObjects/Entity.js";

export interface CollisionRecord {
	didCollide: boolean,
	time: number,
	a: Entity,
	b: Entity,
}

/**
 * Do the two entities collide during the tick interval
 * @param a An Entity to test against
 * @param b
 * @param timeFrame How many milliseconds to simulate the collision over
 * @returns
 */
export default function(a: Entity, b: Entity, timeFrame: number): CollisionRecord {
	const couldHaveCollided = testTimeFrame(a, b, timeFrame);
	if(!couldHaveCollided) {
		return noCollision(a,b);
	}

	const movedA = move(a, timeFrame);
	const movedB = move(b, timeFrame);
	if (hasCollided(movedA, movedB)) {
		return {
			didCollide:true,
			time: timeFrame,
			a: movedA,
			b: movedB,
		};
	}

	return splitAndTest(a, b, timeFrame);
}

function splitAndTest(a: Entity, b: Entity, timeFrame: number):CollisionRecord {
	const halfTime = timeFrame / 2;
	const lateA = move(a, halfTime);
	const lateB = move(b, halfTime);

	const earlyTest = testTimeFrame(a, b, halfTime);
	const lateTest = testTimeFrame(lateA, lateB, halfTime);

	if(earlyTest && lateTest) {
		// TODO need to return the sum of all previously tested timeframes
		return {
			didCollide:true,
			time: timeFrame,
			a,
			b,
		};
	}
	if(earlyTest) {
		return splitAndTest(a, b, halfTime);
	}
	if(lateTest) {
		return splitAndTest(lateA, lateB, halfTime);
	}
	return noCollision(a, b);

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


function noCollision(a: Entity, b: Entity): CollisionRecord {
	return {
		didCollide: false,
		time: 0,
		a,
		b,
	};
}
