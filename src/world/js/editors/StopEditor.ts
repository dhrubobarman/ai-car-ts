import Viewport from "@/world/js/Viewport";
import World from "@/world/js/World";
import { MarkingEditor } from "./MarkingEditor";
import { Stop } from "@/world/js/markings/Stop";
import Point from "@/world/js/primitives/point";

export class StopEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.laneGuides);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Stop(
      center,
      directionVector,
      this.world.roadWidth / 2,
      this.world.roadWidth / 2
    );
  }
}
