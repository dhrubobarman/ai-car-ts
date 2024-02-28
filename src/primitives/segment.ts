import type { SegmentDrawOptions } from "@/types";
import Point from "@/primitives/point";
class Segment {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }
  equals(segment: Segment) {
    return this.includes(segment.p1) && this.includes(segment.p2);
  }
  includes(point: Point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }
  draw(ctx: CanvasRenderingContext2D, options?: SegmentDrawOptions) {
    const {
      width = 2,
      strokeStyle = "black",
      dash = [],
      ...rest
    } = options || {};
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.setLineDash(dash);
    if (rest) {
      ctx.save();
      Object.assign(ctx, rest);
      ctx.restore();
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export default Segment;
