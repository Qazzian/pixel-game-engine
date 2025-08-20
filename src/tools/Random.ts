import { create as Rand } from 'random-seed';
import Position from '../locationObjects/Position.js';

export class Random {
	seed = '';
	rand;

	constructor(seed?: string | undefined) {
		this.seed = seed || Date.now().toString();
		this.rand = Rand(this.seed);
	}

	intBetween(min: number, max: number): number {
		return this.rand.intBetween(min, max);
	}

	vector(): Position {
		const angle = this.rand.floatBetween(-Math.PI, Math.PI);
		return new Position(Math.cos(angle), Math.sin(angle));
	}
}
