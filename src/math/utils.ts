import Point from "@/primitives/point";

export function getNearestPoint(
  loc: Point,
  points: Point[],
  threshold = Number.MAX_SAFE_INTEGER
) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearestPoint = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearestPoint = point;
    }
  }
  return nearestPoint;
}

export function distance(p1: Point, p2: Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function add(p1: Point, p2: Point) {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}
export function subtract(p1: Point, p2: Point) {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}
export function scale(p: Point, s: number) {
  return new Point(p.x * s, p.y * s);
}
