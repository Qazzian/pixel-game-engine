import { create as Rand } from 'random-seed';
import Position from "../locationObjects/Position";
export class Random {
    constructor(seed) {
        this.seed = '';
        this.seed = seed || Date.now().toString();
        // @ts-ignore
        this.rand = new Rand(seed);
    }
    intBetween(min, max) {
        return this.rand.intBetween(min, max);
    }
    vector() {
        const angle = this.rand.floatBetween(-Math.PI, Math.PI);
        return new Position(Math.cos(angle), Math.sin(angle));
    }
}
//# sourceMappingURL=Random.js.map