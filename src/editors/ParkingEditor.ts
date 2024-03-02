import Viewport from "@/Viewport";
import World from "@/World";
import { Parking } from "@/markings/Parking";
import Point from "@/primitives/point";
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
