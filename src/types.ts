import { Crossing } from "./world/js/markings/Crossing";
import { Light } from "./world/js/markings/Light";
import { Parking } from "./world/js/markings/Parking";
import { Start } from "./world/js/markings/Start";
import { Stop } from "./world/js/markings/Stop";
import { Target } from "./world/js/markings/Target";
import { Yield } from "./world/js/markings/Yield";

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
export type MarkingsMap =
  | "Stop"
  | "Crossing"
  | "Start"
  | "Parking"
  | "Light"
  | "Target"
  | "Yield"
  | "Marking";
export type Modes =
  | "graph"
  | "stop"
  | "crossing"
  | "start"
  | "parking"
  | "light"
  | "target"
  | "yield";

// --------------TYPE FOR LOADING LOCALSTORAGE DATA--------------
export type InfoWorld = {
  graph: InfoGraph;
  roadWidth: number;
  roadRoundness: number;
  envelopes: InfoEnvelope[];
  intersections: any[];
  roadBorder: InfoRoadBorder[];
  buildingWidth: number;
  buildingMinLength: number;
  spacing: number;
  buildings: InfoBuilding[];
  trees: InfoTree[];
  treeSize: number;
  laneGuides: InfoLaneGuide[];
  markings: InfoMarking[];
  frameCount: number;
  zoom: number;
  offset: InfoPoint | null;
};

export type InfoBuilding = {
  base: InfoGraph;
  height: number;
};

export type InfoGraph = {
  points: InfoPoint[];
  segments: InfoLaneGuide[];
};

export type InfoRoadBorder = {
  p1: InfoPoint;
  p2: InfoPoint;
};

export type InfoPoint = {
  x: number;
  y: number;
};

export type InfoLaneGuide = {
  p1: InfoPoint;
  p2: InfoPoint;
};

export type InfoEnvelope = {
  skeleton: InfoLaneGuide;
  poly: InfoGraph;
};

export type InfoTree = {
  center: InfoPoint;
  size: number;
  height: number;
  base: InfoGraph;
};
export type InfoPoly = {
  points: InfoPoint[];
  segments: InfoSegment[];
};
export type InfoSegment = {
  p1: InfoPoint;
  p2: InfoPoint;
};
export type InfoMarking = {
  center: InfoPoint;
  directionVector: InfoPoint;
  width: number;
  height: number;
  support: InfoLaneGuide;
  poly: InfoGraph;
  type: MarkingsMap;
  border?: InfoLaneGuide;
  borders?: InfoLaneGuide[];
  state?: string;
  image?: InfoImage;
};
export type InfoImage = {};
// --------------TYPE FOR LOADING LOCALSTORAGE DATA--------------

export type ControlType = "KEYS" | "DUMMY" | "AI";
