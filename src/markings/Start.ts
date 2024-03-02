import { angle } from "@/math/utils";
import Point from "@/primitives/point";
import { Marking } from "./Marking";

export class Start extends Marking {
  image: HTMLImageElement;
  constructor(
    center: Point,
    directionVector: Point,
    width: number,
    height: number
  ) {
    super(center, directionVector, width, height, "Start");
    this.image = new Image();
    this.image.src = "./assets/car.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(angle(this.directionVector) - Math.PI / 2);
    ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    ctx.restore();
  }
}
