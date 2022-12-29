import Area from "./Area";
import Position from "./Position";

export class Entity {
	x: number;
	y: number;
	width: number;
	height: number;
	vector: Position;

    constructor(area: Area, direction: Position=new Position(0,0)) {
        this.x = area.x;
        this.y = area.y;
        this.width = area.width;
        this.height = area.height;
        this.vector = direction;
    }

    collision(other: Entity) {
        // this bottom right corner is inside other block
        if (this.x + this.width > other.x && 
            this.x + this.width < other.x + other.width && 
            this.y + this.height > other.y && 
            this.y + this.height < other.y + other.height)
            {
                return true;
            }
        // this bottom left corner is inside other block
        if (this.x > other.x && 
            this.x < other.x + other.width && 
            this.y + this.height > other.y && 
            this.y + this.height < other.y + other.height)
            {
                return true;
            }

        // this top left corner is inside other block
        if (this.x > other.x && 
            this.x < other.x + other.width && 
            this.y > other.y && 
            this.y < other.y + other.height)
            {
                return true;
            }

        // this bottom left corner is inside other block
        if (this.x + this.width > other.x && 
            this.x + this.width < other.x + other.width && 
            this.y > other.y && 
            this.y < other.y + other.height)
            {
                return true;
            }
        // No overlap    
        return false;
    }
}
