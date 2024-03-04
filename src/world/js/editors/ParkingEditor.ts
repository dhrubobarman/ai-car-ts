import Viewport from "@/world/js/Viewport";
import World from "@/world/js/World";
import { Parking } from "@/world/js/markings/Parking";
import Point from "@/world/js/primitives/point";
import { MarkingEditor } from "./MarkingEditor";

export class ParkingEditor extends MarkingEditor {
  constructor(viewport: Viewport, world: World) {
    super(viewport, world, world.laneGuides);
  }
  createMarking(center: Point, directionVector: Point) {
    return new Parking(
      center,
      directionVector,
      this.world.roadWidth / 2,
      this.world.roadWidth / 2
    );
  }
}
