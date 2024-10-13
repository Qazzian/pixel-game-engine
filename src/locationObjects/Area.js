export default class Area {
    constructor(x, y, width, height) {
        this.x1 = x;
        this.x2 = x + width;
        this.y1 = y;
        this.y2 = y + height;
        this.width = width;
        this.height = height;
    }
    get x() {
        return this.x1;
    }
    set x(x) {
        this.x1 = x;
        this.width = this.x2 - this.x1;
    }
    get y() {
        return this.y1;
    }
    set y(y) {
        this.y1 = y;
        this.height = this.y2 - this.y1;
    }
}
//# sourceMappingURL=Area.js.map