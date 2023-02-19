import {create as Rand} from 'random-seed';
import {Position} from "../../index";

export class Random {
	seed = '';
	rand;

	constructor(seed?: string|undefined) {
		this.seed = seed || Date.now().toString();
		// @ts-ignore
		this.rand = new Rand(seed);
	}

	intBetween(min: number, max: number): number {
		return this.rand.intBetween(min, max);
	}

	vector() :Position {
		const angle = this.rand.floatBetween(-Math.PI, Math.PI);
		return new Position(Math.cos(angle), Math.sin(angle));
	}
}
