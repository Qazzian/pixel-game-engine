import Position from "./Position";
export class Entity {
    constructor(area, direction = new Position(0, 0)) {
        this.x = area.x;
        this.y = area.y;
        this.width = area.width;
        this.height = area.height;
        this.vector = direction;
    }
}
export function hasCollided(subject, other) {
    const noChanceOfCollision = (subject.x + subject.width < other.x ||
        subject.y + subject.height < other.y ||
        subject.x > other.x + other.width ||
        subject.y > other.y + other.height);
    if (noChanceOfCollision) {
        return false;
    }
    if (cornersIntersected(subject, other)) {
        return true;
    }
    return objectsOverlap(subject, other);
}
function cornersIntersected(subject, other) {
    // this bottom right corner is inside other block
    if (subject.x + subject.width >= other.x &&
        subject.x + subject.width <= other.x + other.width &&
        subject.y + subject.height >= other.y &&
        subject.y + subject.height <= other.y + other.height) {
        return true;
    }
    // subject bottom left corner is inside other block
    if (subject.x >= other.x &&
        subject.x <= other.x + other.width &&
        subject.y + subject.height >= other.y &&
        subject.y + subject.height <= other.y + other.height) {
        return true;
    }
    // subject top left corner is inside other block
    if (subject.x >= other.x &&
        subject.x <= other.x + other.width &&
        subject.y >= other.y &&
        subject.y <= other.y + other.height) {
        return true;
    }
    // subject's bottom left corner is inside other block
    if (subject.x + subject.width >= other.x &&
        subject.x + subject.width <= other.x + other.width &&
        subject.y >= other.y &&
        subject.y <= other.y + other.height) {
        return true;
    }
    return false;
}
function objectsOverlap(subject, other) {
    const subjectIsWider = subject.x <= other.x && getX2(subject) >= getX2(other)
        && subject.y >= other.y && getY2(subject) <= getY2(other);
    if (subjectIsWider) {
        return true;
    }
    const otherIsWider = other.x <= subject.x && getX2(other) >= getX2(subject)
        && other.y >= subject.y && getY2(other) <= getY2(subject);
    return otherIsWider;
}
/**
 * Return a copy of the given Entity but moved based on it's vector multiplied by the timeframe
 * @param entity
 * @param timeFrame Number of milliseconds to multiply the Entities 0vector by.
 */
export function move(entity, timeFrame) {
    return Object.assign(Object.assign({}, entity), { x: entity.x + (entity.vector.x * timeFrame), y: entity.y + (entity.vector.y * timeFrame) });
}
export function accelerate(entity, force) {
    return Object.assign(Object.assign({}, entity), { vector: entity.vector.add(force) });
}
export function getX2(entity) {
    return entity.x + entity.width;
}
export function getY2(entity) {
    return entity.y + entity.height;
}
//# sourceMappingURL=Entity.js.map