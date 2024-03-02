import { average, getFake3dPoint } from "@/math/utils";
import Polygon from "@/primitives/Polygon";
import Point from "@/primitives/point";
import { InfoBuilding } from "@/types";

class Building {
  base: Polygon;
  height: number;
  constructor(poly: Polygon, height = 200) {
    this.base = poly;
    this.height = height;
  }
  static load(info: InfoBuilding) {
    return new Building(Polygon.load(info.base), info.height);
  }
  draw(ctx: CanvasRenderingContext2D, viewpoint: Point) {
    const topPoints = this.base.points.map((p: Point) => {
      return getFake3dPoint(p, viewpoint, this.height * 0.6);
    });
    const ceiling = new Polygon(topPoints);

    const sides = [];
    for (let i = 0; i < this.base.points.length; i++) {
      const nextI = (i + 1) % this.base.points.length;
      const poly = new Polygon([
        // this.base.points[i],
        // this.base.points[nextI],
        // topPoints[nextI],
        // topPoints[i],
        this.base.points[i],
        this.base.points[nextI],
        topPoints[nextI],
        topPoints[i],
      ]);
      sides.push(poly);
    }

    sides.sort((a, b) => {
      return b.distanceToPoint(viewpoint) - a.distanceToPoint(viewpoint);
    });

    const baseMidPoints = [
      average(this.base.points[0], this.base.points[1]),
      average(this.base.points[2], this.base.points[3]),
    ];

    const topMidPoints = baseMidPoints.map((p: Point) => {
      return getFake3dPoint(p, viewpoint, this.height);
    });

    const roofPolys = [
      new Polygon([
        ceiling.points[0],
        ceiling.points[3],
        topMidPoints[1],
        topMidPoints[0],
      ]),
      new Polygon([
        ceiling.points[2],
        ceiling.points[1],
        topMidPoints[0],
        topMidPoints[1],
      ]),
    ];

    roofPolys.sort((a, b) => {
      return b.distanceToPoint(viewpoint) - a.distanceToPoint(viewpoint);
    });

    this.base.draw(ctx, {
      fillStyle: "white",
      strokeStyle: "rgba(0,0,0,0.2)",
      lineWidth: 20,
    });
    for (const side of sides) {
      side.draw(ctx, { fillStyle: "white", strokeStyle: "#AAA" });
    }
    ceiling.draw(ctx, {
      fillStyle: "white",
      strokeStyle: "white",
      lineWidth: 6,
    });
    for (const poly of roofPolys) {
      poly.draw(ctx, {
        fillStyle: "#D44",
        strokeStyle: "#C44",
        lineWidth: 8,
        lineJoin: "round",
      });
    }
  }
}

export default Building;
