import Viewport from "@/world/js/Viewport";
import World from "@/world/js/World";
import { Crossing } from "@/world/js/markings/Crossing";
import Point from "@/world/js/primitives/point";
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
