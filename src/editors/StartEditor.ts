import Viewport from "@/Viewport";
import World from "@/World";
import { Start } from "@/markings/Start";
import Point from "@/primitives/point";
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
