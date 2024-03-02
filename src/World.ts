import Tree from "@/items/Tree";
import Graph from "./math/graph";
import { add, distance, getNearestPoint, lerp, scale } from "./math/utils";
import Envelope from "./primitives/Envelope";
import Polygon from "./primitives/Polygon";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Building from "./items/Building";
import { Markings } from "./types";
import { Light } from "./markings/Light";

export type ControlCenter = Point & {
  lights?: Light[];
  ticks?: number;
};
class World {
  graph: Graph;
  roadWidth: number;
  roadRoundness: number;
  envelopes: Envelope[];
  intersections: Point[];
  roadBorder: Segment[];
  buildingWidth: number;
  buildingMinLength: number;
  spacing: number;
  buildings: Building[];
  trees: Tree[];
  treeSize: number;
  laneGuides: Segment[];
  markings: Markings[];
  frameCount: number;
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
    this.roadWidth = rodeWidth;
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
    this.laneGuides = [];
    this.frameCount = 0;
    this.markings = [];
    this.generate();
  }
  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      const env = new Envelope(seg, this.roadWidth, this.roadRoundness);
      this.envelopes.push(env);
    }
    this.roadBorder = Polygon.union(this.envelopes.map((e) => e.poly));
    this.buildings = this.generateBuildings();
    this.trees = this.generateTrees();
    this.laneGuides = this.generateLaneGuides();
  }

  private generateLaneGuides() {
    const tempEnvelope: Envelope[] = [];
    for (const seg of this.graph.segments) {
      tempEnvelope.push(
        new Envelope(seg, this.roadWidth / 2, this.roadRoundness)
      );
    }
    const segments = Polygon.union(tempEnvelope.map((e) => e.poly));
    return segments;
  }
  private generateTrees() {
    const points = [
      ...this.roadBorder.map((s) => [s.p1, s.p2]).flat(),
      ...this.buildings.map((b) => b.base.points).flat(),
    ];
    const left = Math.min(...points.map((p) => p.x));
    const right = Math.max(...points.map((p) => p.x));
    const top = Math.min(...points.map((p) => p.y));
    const bottom = Math.max(...points.map((p) => p.y));

    const illigalPolys = [
      ...this.buildings.map((b) => b.base),
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
          if (distance(t.center, p) < this.treeSize) {
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
        trees.push(new Tree(p, this.treeSize));
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
          this.roadWidth + this.buildingWidth + this.spacing * 2,
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
    return bases.map((b) => new Building(b));
  }
  private getIntersections() {
    const subset = [];
    for (const point of this.graph.points) {
      let degree = 0;
      for (const seg of this.graph.segments) {
        if (seg.includes(point)) {
          degree++;
        }
      }

      if (degree > 2) {
        subset.push(point);
      }
    }
    return subset;
  }
  private updateLights() {
    const lights = this.markings.filter((m) => m instanceof Light);
    const controlCenters: any[] = [];
    for (const light of lights) {
      const point = getNearestPoint(
        light.center,
        this.getIntersections()
      ) as Point;
      let controlCenter: any = controlCenters.find((c) => c.equals(point));
      if (!controlCenter) {
        controlCenter = new Point(point.x, point.y);
        controlCenter.lights = [light];
        controlCenters.push(controlCenter);
      } else {
        controlCenter.lights.push(light);
      }
    }
    const greenDuration = 2,
      yellowDuration = 1;
    for (const center of controlCenters) {
      center.ticks = center?.lights?.length * (greenDuration + yellowDuration);
    }
    const tick = Math.floor(this.frameCount / 60);
    for (const center of controlCenters) {
      const cTick = tick % center.ticks;
      const greenYellowIndex = Math.floor(
        cTick / (greenDuration + yellowDuration)
      );
      const greenYellowState =
        cTick % (greenDuration + yellowDuration) < greenDuration
          ? "green"
          : "yellow";
      for (let i = 0; i < center.lights.length; i++) {
        if (i == greenYellowIndex) {
          center.lights[i].state = greenYellowState;
        } else {
          center.lights[i].state = "red";
        }
      }
    }
    this.frameCount++;
  }
  draw(ctx: CanvasRenderingContext2D, viewpoint: Point) {
    this.updateLights();
    for (const env of this.envelopes) {
      env.draw(ctx, { fillStyle: "#BBB", strokeStyle: "#BBB", lineWidth: 15 });
    }
    for (const markings of this.markings) {
      markings.draw(ctx);
    }
    for (const seg of this.graph.segments) {
      seg.draw(ctx, { strokeStyle: "white", width: 4, dash: [10, 10] });
    }
    for (const seg of this.roadBorder) {
      seg.draw(ctx, { strokeStyle: "white", width: 4 });
    }
    const items = [...this.buildings, ...this.trees];
    items.sort(
      (a, b) =>
        b.base.distanceToPoint(viewpoint) - a.base.distanceToPoint(viewpoint)
    );
    for (const item of items) {
      item.draw(ctx, viewpoint);
    }
  }
}

export default World;
