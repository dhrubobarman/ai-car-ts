import Viewport from "@/world/js/Viewport";
import World from "@/world/js/World";
import { Start } from "@/world/js/markings/Start";
import Point from "@/world/js/primitives/point";
import { MarkingEditor } from "./MarkingEditor";

export class StartEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.laneGuides);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Start(
      center,
      directionVector,
      this.world.roadWidth / 2,
      this.world.roadWidth / 2
    );
  }
}
