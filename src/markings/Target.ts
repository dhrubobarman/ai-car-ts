import Point from "@/primitives/point";
import { Marking } from "./Marking";

export class Target extends Marking {
  constructor(
    center: Point,
    directionVector: Point,
    width: number,
    height: number
  ) {
    super(center, directionVector, width, height, "Target");
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.center.draw(ctx, { fillStyle: "red", size: 30 });
    this.center.draw(ctx, { fillStyle: "white", size: 20 });
    this.center.draw(ctx, { fillStyle: "red", size: 10 });
  }
}
