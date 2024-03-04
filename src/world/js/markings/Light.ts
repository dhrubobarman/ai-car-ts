import { add, lerp2D, perpendicular, scale } from "@/math/utils";
import Point from "@/world/js/primitives/point";
import Segment from "@/world/js/primitives/segment";
import { Marking } from "./Marking";

export class Light extends Marking {
  border: Segment;
  state: "green" | "red" | "yellow" | "off";
  constructor(
    center: Point,
    directionVector: Point,
    width: number,
    height: number
  ) {
    super(center, directionVector, width, 18, "Light");
    this.border = this.poly.segments[0];
    this.state = "green";
  }

  draw(ctx: CanvasRenderingContext2D) {
    const perp = perpendicular(this.directionVector);
    const line = new Segment(
      add(this.center, scale(perp, this.width / 2)),
      add(this.center, scale(perp, -this.width / 2))
    );
    const green = lerp2D(line.p1, line.p2, 0.2);
    const yellow = lerp2D(line.p1, line.p2, 0.5);
    const red = lerp2D(line.p1, line.p2, 0.8);
    new Segment(red, green).draw(ctx, {
      width: this.height,
      lineCap: "round",
    });
    green.draw(ctx, { size: this.height * 0.6, fillStyle: "#060" });
    yellow.draw(ctx, { size: this.height * 0.6, fillStyle: "#660" });
    red.draw(ctx, { size: this.height * 0.6, fillStyle: "#600" });

    switch (this.state) {
      case "green":
        green.draw(ctx, { size: this.height * 0.6, fillStyle: "#0F0" });
        break;
      case "yellow":
        yellow.draw(ctx, { size: this.height * 0.6, fillStyle: "#FF0" });
        break;
      case "red":
        red.draw(ctx, { size: this.height * 0.6, fillStyle: "#F00" });
        break;
      default:
        break;
    }
  }
}
