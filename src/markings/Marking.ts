import { angle, translate } from "@/math/utils";
import Envelope from "@/primitives/Envelope";
import Polygon from "@/primitives/Polygon";
import Point from "@/primitives/point";
import Segment from "@/primitives/segment";
import { MarkingsMap } from "@/types";

export class Marking {
  center: Point;
  directionVector: Point;
  width: number;
  height: number;
  support: Segment;
  poly: Polygon;
  type: MarkingsMap;
  constructor(
    center: Point,
    directionVector: Point,
    width: number,
    height: number,
    type: MarkingsMap = "Marking"
  ) {
    this.center = center;
    this.directionVector = directionVector;
    this.width = width;
    this.height = height;
    this.type = type;
    this.support = new Segment(
      translate(center, angle(directionVector), height / 2),
      translate(center, angle(directionVector), -height / 2)
    );
    this.poly = new Envelope(this.support, width, 0).poly;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx);
  }
}
