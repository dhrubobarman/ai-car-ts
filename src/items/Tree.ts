import { getFake3dPoint, lerp, lerp2D, translate } from "@/math/utils";
import Polygon from "@/primitives/Polygon";
import Point from "@/primitives/point";

class Tree {
  center: Point;
  size: number;
  height: number;
  base: Polygon;
  constructor(center: Point, size: number, height = 200) {
    this.center = center;
    this.size = size;
    this.height = height;
    this.base = this.generateLevel(center, size);
  }
  private generateLevel(point: Point, size: number) {
    const points = [];
    const rad = size / 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      const kindOfRandomNumber =
        Math.cos(((a + this.center.x) * size) % 17) ** 2;
      const noisyRadius = rad * lerp(0.5, 1, kindOfRandomNumber);
      points.push(translate(point, a, noisyRadius));
    }
    return new Polygon(points);
  }
  draw(ctx: CanvasRenderingContext2D, viewpoint: Point) {
    const top = getFake3dPoint(this.center, viewpoint, this.height);
    const levelCount = 7;
    for (let level = 0; level < levelCount; level++) {
      const t = level / (levelCount - 1);
      const point = lerp2D(this.center, top, t);
      const color = `rgba(0,${lerp(50, 200, t)},70,1)`;
      const size = lerp(this.size, this.size * 0.25, t);
      const poly = this.generateLevel(point, size);
      poly.draw(ctx, { strokeStyle: "rgba(0,0,0,0)", fillStyle: color });
    }
  }
}
export default Tree;
