import React from "react";
import {
  GamePositonState,
  GameState,
  LawnMower,
  MowerDirection,
  MowerInstruction,
} from "../types/state";
import { Button, Stack } from "@mui/material";
import { FormattedMessage } from "react-intl";

const directionVectors = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

export interface PropsType {
  gameState: GameState;
  moveLawnMowerAction: (
    newPosition: LawnMower["position"],
    newDirection: LawnMower["direction"]
  ) => void;
  gamePositionState: GamePositonState;
  reset: () => void;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

const Actions: React.FunctionComponent<PropsType> = ({
  gameState,
  moveLawnMowerAction,
  gamePositionState,
  reset,
  setGameState,
}) => {
  const getNewDirection = (
    currentDirection: MowerDirection,
    instruction: MowerInstruction
  ): LawnMower["direction"] => {
    if (instruction === "L") {
      switch (currentDirection) {
        case "N":
          return "W";
        case "W":
          return "S";
        case "S":
          return "E";
        case "E":
          return "N";
      }
    }
    if (instruction === "R") {
      switch (currentDirection) {
        case "N":
          return "E";
        case "E":
          return "S";
        case "S":
          return "W";
        case "W":
          return "N";
      }
    }
    return currentDirection; // For "F", direction remains unchanged
  };

  /**
   * Computes only the next instruction and updates the state.
   */
  const handleNextMove = () => {
    const { mowerIndex, instructionIndex } = gamePositionState;
    const mower = gameState.mowers[mowerIndex];
    const instruction = mower.instructions[instructionIndex];

    let newPosition = mower.position;
    if (instruction === "F") {
      const computedPosition = {
        x: mower.position.x + directionVectors[mower.direction].x,
        y: mower.position.y + directionVectors[mower.direction].y,
      };

      // Check bounds
      if (
        computedPosition.x >= 0 &&
        computedPosition.x < gameState.lawnWidth &&
        computedPosition.y >= 0 &&
        computedPosition.y < gameState.lawnHeight
      ) {
        newPosition = computedPosition;
      }
    }

    moveLawnMowerAction(
      newPosition,
      getNewDirection(mower.direction, instruction)
    );
  };

  /**
   * For computing entire result in onw go while only updating the sate once.
   */
  const computeResult = () => {
    const mowers = gameState.mowers;
    const mowedPositions = gameState.mowedPositions;

    let { mowerIndex, instructionIndex } = gamePositionState;

    while (true) {
      if (mowerIndex >= mowers.length) {
        break;
      }

      const mower = mowers[mowerIndex];
      const instruction = mower.instructions[instructionIndex];

      let newPosition = mower.position;
      if (instruction === "F") {
        const computedPosition = {
          x: mower.position.x + directionVectors[mower.direction].x,
          y: mower.position.y + directionVectors[mower.direction].y,
        };

        // Check bounds
        if (
          computedPosition.x >= 0 &&
          computedPosition.x < gameState.lawnWidth &&
          computedPosition.y >= 0 &&
          computedPosition.y < gameState.lawnHeight
        ) {
          newPosition = computedPosition;
        }

        mowedPositions.push({ x: newPosition.x, y: newPosition.y });
      }

      mowers[mowerIndex] = {
        ...mower,
        position: newPosition,
        direction: getNewDirection(mower.direction, instruction),
      };

      instructionIndex += 1;
      if (instructionIndex >= mower.instructions.length) {
        instructionIndex = 0;
        mowerIndex += 1;
      }
    }

    setGameState((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        mowers,
        mowedPositions,
        isFinished: true,
      };
    });
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button onClick={reset} color="error" size="small">
        <FormattedMessage id="actions.reset" />
      </Button>
      <Button
        onClick={computeResult}
        size="small"
        disabled={gameState.isFinished}
      >
        <FormattedMessage id="actions.all" />
      </Button>
      <Button
        onClick={handleNextMove}
        variant="contained"
        size="small"
        disabled={gameState.isFinished}
      >
        <FormattedMessage id="actions.next" />
      </Button>
    </Stack>
  );
};

export default Actions;
