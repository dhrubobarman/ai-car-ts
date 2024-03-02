import Viewport from "@/Viewport";
import World from "@/World";
import { Yield } from "@/markings/Yield";
import Point from "@/primitives/point";
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
