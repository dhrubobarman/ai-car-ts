import Viewport from "@/Viewport";
import World from "@/World";
import { Target } from "@/markings/Target";
import Point from "@/primitives/point";
import { MarkingEditor } from "./MarkingEditor";

export class TargetEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.laneGuides);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Target(
      center,
      directionVector,
      this.world.roadWidth / 2,
      this.world.roadWidth / 2
    );
  }
}
