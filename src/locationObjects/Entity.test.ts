import Area from "./Area";
import { Entity } from "./Entity";



describe('Entity Class', () => {
    test('constructor', () => {
        const ent1 = new Entity(new Area(1, 1, 2, 2));
        expect(ent1).toBeDefined();
    });


    describe('collision', () => {
        test('no collision', () => {
            const ent1 = new Entity(new Area(1, 1, 1, 1));
            const ent2 = new Entity(new Area(4, 4, 1, 1));
            expect(ent1.collision(ent2)).toBeFalsy();
        });

        /**
         * 
         *  +--+
         *  |  |
         *  | +|-+
         *  +--+ |
         *    |  |
         *    +--+
         */
        test('bottom-right corner', () => {
            const ent1 = new Entity(new Area(1, 1, 2, 2));
            const ent2 = new Entity(new Area(2, 2, 2, 2));
            expect(ent1.collision(ent2)).toBeTruthy();
        });

        test('bottom-left corner', () => {
            const ent1 = new Entity(new Area(1, 1, 2, 2));
            const ent2 = new Entity(new Area(0, 2, 2, 2));
            expect(ent1.collision(ent2)).toBeTruthy();
        });

        test('top-left corner', () => {
            const ent1 = new Entity(new Area(1, 1, 2, 2));
            const ent2 = new Entity(new Area(0, 0, 2, 2));
            expect(ent1.collision(ent2)).toBeTruthy();
        });

        test('top-right corner', () => {
            const ent1 = new Entity(new Area(1, 1, 2, 2));
            const ent2 = new Entity(new Area(2, 0, 2, 2));
            expect(ent1.collision(ent2)).toBeTruthy();
        });
    });


});