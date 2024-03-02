import Viewport from "@/Viewport";
import World from "@/World";
import { Crossing } from "@/markings/Crossing";
import Point from "@/primitives/point";
import { MarkingEditor } from "./MarkingEditor";

export class CrossingEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.graph.segments);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Crossing(
      center,
      directionVector,
      this.world.roadWidth,
      this.world.roadWidth / 2
    );
  }
}
