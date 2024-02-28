import Point from "@/primitives/point";
import Segment from "@/primitives/segment";

class Graph {
  points: Point[];
  segments: Segment[];
  constructor(points: Point[], segments: Segment[]) {
    this.points = points;
    this.segments = segments || [];
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  containsPoint(point: Point) {
    return Boolean(this.points.find((p) => p.equals(point)));
  }

  tryAddPoint(point: Point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addSegment(segment: Segment) {
    this.segments.push(segment);
  }

  containsSegment(segment: Segment) {
    return this.segments.find((s) => s.equals(segment)) !== undefined;
  }

  tryAddSegment(segment: Segment) {
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }
  getSegmentsWithPoint(point: Point) {
    const segments = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segments.push(seg);
      }
    }
    return segments;
  }

  removeSegment(seg: Segment) {
    this.segments = this.segments.filter((s) => !s.equals(seg));
  }
  removePoint(point: Point) {
    this.points = this.points.filter((p) => !p.equals(point));
    this.segments = this.segments.filter((s) => !s.includes(point));
  }
  dispose() {
    this.segments = [];
    this.points = [];
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

export default Graph;
