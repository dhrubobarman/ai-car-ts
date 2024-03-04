import Point from "@/world/js/primitives/point";
import Segment from "@/world/js/primitives/segment";
import { TPoint } from "@/types";

export function getNearestPoint(
  loc: Point,
  points: Point[],
  threshold = Number.MAX_SAFE_INTEGER
) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = point;
    }
  }
  return nearest;
}
export function getNearestSegment(
  loc: Point,
  segments: Segment[],
  threshold = Number.MAX_SAFE_INTEGER
) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const seg of segments) {
    const dist = seg.distanceToPoint(loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = seg;
    }
  }
  return nearest;
}
export function getNearesTPoint(
  loc: Point,
  segments: Segment[],
  threshold = Number.MAX_SAFE_INTEGER
) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const seg of segments) {
    const dist = seg.distanceToPoint(loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = seg;
    }
  }
  return nearest;
}

export function distance(p1: Point, p2: Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
export function average(p1: Point, p2: Point) {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
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
export function normalize(p: Point) {
  return scale(p, 1 / magnitude(p));
}
export function magnitude(p: Point) {
  return Math.hypot(p.x, p.y);
}
export function dot(p1: Point, p2: Point) {
  return p1.x * p2.x + p1.y * p2.y;
}
export function translate(loc: Point, angle: number, offset: number) {
  return new Point(
    loc.x + Math.cos(angle) * offset,
    loc.y + Math.sin(angle) * offset
  );
}

export function perpendicular(point: Point) {
  return new Point(-point.y, point.x);
}
export function angle(p: Point) {
  return Math.atan2(p.y, p.x);
}

export function getIntersection(
  A: Point | TPoint,
  B: Point | TPoint,
  C: Point | TPoint,
  D: Point | TPoint
) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
  const eps = 0.001;
  if (Math.abs(bottom) > eps) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }

  return null;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export function lerp2D(a: Point, b: Point, t: number) {
  return new Point(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
}

// if you're following along, this comes in a few minutes ;-)
export function getRandomColor() {
  const hue = 290 + Math.random() * 260;
  const s = getRndInteger(30, 100);
  const l = getRndInteger(25, 100);
  return `hsl(${hue},${s}%,${l}%)`;
  return "hsl(" + hue + ", 100%, 60%)";
}

export function getFake3dPoint(point: Point, viewpoint: Point, height: number) {
  const dir = normalize(subtract(point, viewpoint));
  const dist = distance(point, viewpoint);
  const scaler = Math.atan(dist / 300) / (Math.PI / 2);
  return add(point, scale(dir, height * scaler));
}

// new functions ---------------------------

export function polygonIntersect(
  poly1: TPoint[] | Point[],
  poly2: TPoint[] | Point[]
) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) {
        return true;
      }
    }
  }
  return false;
}

export function numberToBool(num: number) {
  return num === 1;
}
export function getRGBA(values: number) {
  const alpha = Math.abs(values);
  const r = values < 0 ? 0 : 255;
  const g = r;
  const b = values > 0 ? 0 : 255;

  return `rgba(${r},${g},${b},${alpha})`;
}

export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
