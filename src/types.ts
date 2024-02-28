export interface CTXAttributes extends CanvasRenderingContext2D {
  dash: number[];
}
export type PointDrawOptions = {
  size?: number;
  outline?: boolean;
  fillPoint?: boolean;
} & Partial<CTXAttributes>;
export type SegmentDrawOptions = { width?: number } & Partial<CTXAttributes>;
