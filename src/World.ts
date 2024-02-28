import Graph from "./math/graph";
import { add, distance, lerp, scale } from "./math/utils";
import Envelope from "./primitives/Envelope";
import Polygon from "./primitives/Polygon";
import Point from "./primitives/point";
import Segment from "./primitives/segment";

class World {
  graph: Graph;
  rodeWidth: number;
  roadRoundness: number;
  envelopes: Envelope[];
  intersections: Point[];
  roadBorder: Segment[];
  buildingWidth: number;
  buildingMinLength: number;
  spacing: number;
  buildings: Polygon[];
  trees: Point[];
  treeSize: number;
  constructor(
    graph: Graph,
    rodeWidth = 100,
    roadRoundness = 10,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50,
    treeSize = 160
  ) {
    this.graph = graph;
    this.rodeWidth = rodeWidth;
    this.roadRoundness = roadRoundness;
    this.intersections = [];
    this.envelopes = [];
    this.roadBorder = [];
    this.buildingWidth = buildingWidth;
    this.buildingMinLength = buildingMinLength;
    this.spacing = spacing;
    this.treeSize = treeSize;
    this.buildings = [];
    this.trees = [];
    this.generate();
  }
  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      const env = new Envelope(seg, this.rodeWidth, this.roadRoundness);
      this.envelopes.push(env);
    }
    this.roadBorder = Polygon.union(this.envelopes.map((e) => e.poly));
    this.buildings = this.generateBuildings();
    this.trees = this.generateTrees();
  }
  private generateTrees() {
    const points = [
      ...this.roadBorder.map((s) => [s.p1, s.p2]).flat(),
      ...this.buildings.map((p) => p.points).flat(),
    ];
    const left = Math.min(...points.map((p) => p.x));
    const right = Math.max(...points.map((p) => p.x));
    const top = Math.min(...points.map((p) => p.y));
    const bottom = Math.max(...points.map((p) => p.y));

    const illigalPolys = [
      ...this.buildings,
      ...this.envelopes.map((e) => e.poly),
    ];

    const trees = [];
    let tryCount = 0;
    while (tryCount < 50) {
      const p = new Point(
        lerp(left, right, Math.random()),
        lerp(bottom, top, Math.random())
      );
      let keep = true;
      // If the point is too close to a building or road, don't add it.
      for (const poly of illigalPolys) {
        if (
          poly.containsPoint(p) ||
          poly.distanceToPoint(p) < this.treeSize / 2
        ) {
          keep = false;
          break;
        }
      }
      // If the point is too close to another tree, don't add it.
      if (keep) {
        for (const t of trees) {
          if (distance(t, p) < this.treeSize) {
            keep = false;
            break;
          }
        }
      }
      // Only add tree if there is something nearby
      if (keep) {
        let closeToSomething = false;
        for (const poly of illigalPolys) {
          if (poly.distanceToPoint(p) < this.treeSize * 2) {
            closeToSomething = true;
            break;
          }
        }
        keep = closeToSomething;
      }
      if (keep) {
        trees.push(p);
        tryCount = 0;
      }
      tryCount++;
    }

    return trees;
  }

  private generateBuildings() {
    const tempEnvelope: Envelope[] = [];
    for (const seg of this.graph.segments) {
      tempEnvelope.push(
        new Envelope(
          seg,
          this.rodeWidth + this.buildingWidth + this.spacing * 2,
          this.roadRoundness
        )
      );
    }
    const guides = Polygon.union(tempEnvelope.map((e) => e.poly));
    for (let i = 0; i < guides.length; i++) {
      const seg = guides[i];
      if (seg.length() < this.buildingMinLength) {
        guides.splice(i, 1);
        i--;
      }
    }
    const supports = [];
    for (const seg of guides) {
      const len = seg.length() + this.spacing;
      const buildingCount = Math.floor(
        len / (this.buildingMinLength + this.spacing)
      );
      const buildingLength = len / buildingCount - this.spacing;
      const dir = seg.directionVector();

      let q1 = seg.p1;
      let q2 = add(q1, scale(dir, buildingLength));
      supports.push(new Segment(q1, q2));

      for (let i = 2; i <= buildingCount; i++) {
        q1 = add(q2, scale(dir, this.spacing));
        q2 = add(q1, scale(dir, buildingLength));
        supports.push(new Segment(q1, q2));
      }
    }
    const bases = [];
    for (const seg of supports) {
      bases.push(new Envelope(seg, this.buildingWidth).poly);
    }
    const eps = 0.001;
    for (let i = 0; i < bases.length - 1; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (
          bases[i].intersectsPoly(bases[j]) ||
          bases[i].distanceToPolly(bases[j]) < this.spacing - eps
        ) {
          bases.splice(j, 1);
          j--;
        }
      }
    }
    return bases;
  }
  draw(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fillStyle: "#BBB", strokeStyle: "#BBB", lineWidth: 15 });
    }
    for (const seg of this.graph.segments) {
      seg.draw(ctx, { strokeStyle: "white", width: 4, dash: [10, 10] });
    }
    for (const seg of this.roadBorder) {
      seg.draw(ctx, { strokeStyle: "white", width: 4 });
    }
    for (const tree of this.trees) {
      tree.draw(ctx, {
        fillStyle: "rgba(0,255,0,0.5)",
        size: this.treeSize,
      });
    }
    for (const building of this.buildings) {
      building.draw(ctx, {});
    }
  }
}

export default World;
