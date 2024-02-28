import Graph from "./math/graph";
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
  constructor(graph: Graph, rodeWidth = 100, roadRoundness = 10) {
    this.graph = graph;
    this.rodeWidth = rodeWidth;
    this.roadRoundness = roadRoundness;
    this.intersections = [];
    this.envelopes = [];
    this.roadBorder = [];
    this.generate();
  }
  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      const env = new Envelope(seg, this.rodeWidth, this.roadRoundness);
      this.envelopes.push(env);
    }
    this.roadBorder = Polygon.union(this.envelopes.map((e) => e.poly));
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
  }
}

export default World;
