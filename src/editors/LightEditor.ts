import Viewport from "@/Viewport";
import World from "@/World";
import { Light } from "@/markings/Light";
import Point from "@/primitives/point";
import { MarkingEditor } from "./MarkingEditor";

export class LightEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.laneGuides);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Light(
      center,
      directionVector,
      this.world.roadWidth / 2,
      this.world.roadWidth / 2
    );
  }
}
