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
