import { CSSProperties } from "react";

export type MowerDirection = "N" | "E" | "S" | "W";
export type MowerInstruction = "L" | "R" | "F";
export type Position = { x: number; y: number };

export type LawnMower = {
  position: Position;
  direction: MowerDirection;
  instructions: Array<MowerInstruction>;
  color: CSSProperties["color"];
  isFinished: boolean;
};

export interface GameState {
  lawnWidth: number;
  lawnHeight: number;
  mowers: Array<LawnMower>;
  mowedPositions: Array<Position>;
  isFinished: boolean;
}

export interface GamePositonState {
  mowerIndex: number;
  instructionIndex: number;
}
