import Viewport from "@/world/js/Viewport";
import World from "@/world/js/World";
import { Yield } from "@/world/js/markings/Yield";
import Point from "@/world/js/primitives/point";
import { MarkingEditor } from "./MarkingEditor";

export class YieldEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.laneGuides);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Yield(
      center,
      directionVector,
      this.world.roadWidth / 2,
      this.world.roadWidth / 2
    );
  }
}
