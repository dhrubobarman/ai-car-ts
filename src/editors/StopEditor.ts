import Viewport from "@/Viewport";
import World from "@/World";
import { MarkingEditor } from "./MarkingEditor";
import { Stop } from "@/markings/Stop";
import Point from "@/primitives/point";

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
