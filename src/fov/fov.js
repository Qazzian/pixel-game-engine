"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRaysFromPoint = exports.getIntersection = exports.findLineIntersections = exports.createRaysFromGeometry = void 0;
var Ray_1 = require("./Ray");
function fov(source, geometry, radius) {
    var lightRays = createRaysFromGeometry(source, geometry, radius);
    var intersectionPoints = findLineIntersections(source, lightRays, geometry)
        .filter(function (line) { return line.angle !== 0; })
        .sort(function (a, b) {
        return a.angle - b.angle;
    });
    return intersectionPoints;
}
exports.default = fov;
function createRaysFromGeometry(source, geometry, radius) {
    return geometry.reduce(function (rays, edge) {
        var pointList = edge.getPoints();
        var rayList = pointList.reduce(function (allRays, point) {
            return allRays.concat(createRaysFromPoint(source, radius, point));
        }, []);
        return rays.concat(rayList);
    }, []);
}
exports.createRaysFromGeometry = createRaysFromGeometry;
function findLineIntersections(rayOrigin, lightRays, worldGeometry) {
    var INITIAL_INTERSECT = { x: 0, y: 0, distance: Number.MAX_VALUE, angle: 0 };
    return lightRays.map(function (ray) {
        return worldGeometry.reduce(function (nearestIntersect, edge) {
            if (doVectorsOverlap(ray, edge.getVector())) {
                console.warn('OVERLAP:', ray, edge);
                return nearestIntersect;
            }
            var intersectionPoint = getIntersection(rayOrigin, ray, edge);
            return intersectionPoint && intersectionPoint.distance < nearestIntersect.distance ? intersectionPoint : nearestIntersect;
        }, INITIAL_INTERSECT);
    });
}
exports.findLineIntersections = findLineIntersections;
function doVectorsOverlap(ray, vector) {
    return Math.abs(ray.dx - vector.dx) === 0.0 || Math.abs(ray.dy - vector.dy) === 0.0;
}
function getIntersection(rayOrigin, ray, segment) {
    // TODO translate into my interfaces
    // RAY in parametric: Point + Delta*T1
    var segmentVector = segment.getVector();
    // SOLVE FOR T1 & T2
    // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
    // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
    // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
    // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
    var T2 = (ray.dx * (segmentVector.y - rayOrigin.y)
        + ray.dy * (rayOrigin.x - segmentVector.x))
        / (segmentVector.dx * ray.dy - segmentVector.dy * ray.dx);
    var T1 = (segmentVector.x + segmentVector.dx * T2 - rayOrigin.x) / ray.dx;
    // Must be within parametric whatevers for RAY/SEGMENT
    if (T1 < 0)
        return null;
    if (T2 < 0 || T2 > 1)
        return null;
    // Return the POINT OF INTERSECTION
    return {
        angle: ray.angle,
        x: rayOrigin.x + ray.dx * T1,
        y: rayOrigin.y + ray.dy * T1,
        distance: T1,
    };
}
exports.getIntersection = getIntersection;
function createRaysFromPoint(source, radius, destination) {
    var x = destination.x - source.x;
    var y = destination.y - source.y;
    var angle = Math.atan2(y, x);
    return [angle - 0.0001, angle, angle + 0.0001]
        .map(function (a) { return new Ray_1.default(a, radius); });
}
exports.createRaysFromPoint = createRaysFromPoint;
function sortRays(a, b) {
    return a.angle - b.angle;
}
