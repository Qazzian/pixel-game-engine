import { Colour } from '../Colour';

export interface DrawInterface {
	clear: (backgroundColor?: Colour) => void;
	draw: (x: number, y: number, color: Colour) => void;
	fillRect: (x: number, y: number, width: number, height: number, color: Colour) => void;
	drawCharacter: (x: number, y: number, character: string, color: Colour) => void;
}
