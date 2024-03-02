import { Crossing } from "./markings/Crossing";
import { Light } from "./markings/Light";
import { Parking } from "./markings/Parking";
import { Start } from "./markings/Start";
import { Stop } from "./markings/Stop";
import { Target } from "./markings/Target";
import { Yield } from "./markings/Yield";

export interface CTXAttributes extends CanvasRenderingContext2D {
  dash: number[];
}
export type PointDrawOptions = {
  size?: number;
  outline?: boolean;
  fillPoint?: boolean;
} & Partial<CTXAttributes>;
export type SegmentDrawOptions = { width?: number } & Partial<CTXAttributes>;
export type PolygonDrawOptions = { width?: number } & Partial<CTXAttributes>;
export type EnvelopeDrawOptions = Partial<CTXAttributes>;

export type TPoint = { x: number; y: number };

export type GraphInfo = {
  points: TPoint[];
  segments: { p1: TPoint; p2: TPoint }[];
};

export type Markings =
  | Stop
  | Crossing
  | Start
  | Parking
  | Light
  | Target
  | Yield;
export type Modes =
  | "graph"
  | "stop"
  | "crossing"
  | "start"
  | "parking"
  | "light"
  | "target"
  | "yield";
