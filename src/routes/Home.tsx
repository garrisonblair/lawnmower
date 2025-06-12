import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Information from "../components/Information";
import Lawn from "../components/Lawn";
import UploadFileButton from "../components/UploadFileButton";
import { GamePositonState, GameState, LawnMower } from "../types/state";
import Actions from "../components/Actions";
import { FormattedMessage } from "react-intl";

const defaultPositionState: GamePositonState = {
  mowerIndex: 0,
  instructionIndex: 0,
};

const Home: React.FunctionComponent = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const [gamePositionState, setGamePositionState] =
    useState<GamePositonState>(defaultPositionState);

  /**
   * Sets the game state with new position and direction of the lawn mower.
   * Updates the mowed positions and checks if the game is finished.
   *
   * Updates game position state to point to the next instruction.
   */
  const moveLawnMowerAction = (
    newPosition: LawnMower["position"],
    newDirection: LawnMower["direction"]
  ) => {
    if (!gameState) return;

    let isFinished = false;

    let newMowerIndex = gamePositionState.mowerIndex;
    let newInstructionIndex = gamePositionState.instructionIndex + 1;

    if (
      newInstructionIndex >=
      gameState.mowers[gamePositionState.mowerIndex].instructions.length
    ) {
      newInstructionIndex = 0;
      newMowerIndex += 1;

      if (newMowerIndex >= gameState.mowers.length) {
        isFinished = true;
      }
    }

    setGameState((prevState) => {
      if (!prevState) return null;

      return {
        ...prevState,
        mowers: prevState.mowers.map((mower, index) => {
          if (index === gamePositionState.mowerIndex) {
            return {
              ...mower,
              position: newPosition,
              direction: newDirection,
            };
          }
          return mower;
        }),
        mowedPositions: [
          ...prevState.mowedPositions,
          { x: newPosition.x, y: newPosition.y },
        ],
        isFinished,
      };
    });

    setGamePositionState((prevState) => ({
      ...prevState,
      mowerIndex: newMowerIndex,
      instructionIndex: newInstructionIndex,
    }));
  };

  const reset = () => {
    setGameState(null);
    setGamePositionState(defaultPositionState);
  };

  return (
    <Stack width="100%" alignItems="center" spacing={10}>
      <Typography variant="h4">
        <FormattedMessage id="app_name" />
      </Typography>
      {gameState ? (
        <Stack spacing={3}>
          <Information
            gameState={gameState}
            gamePositionState={gamePositionState}
          />
          <Lawn gameState={gameState} />
          <Actions
            gameState={gameState}
            gamePositionState={gamePositionState}
            moveLawnMowerAction={moveLawnMowerAction}
            reset={reset}
            setGameState={setGameState}
          />
        </Stack>
      ) : (
        <UploadFileButton setGameState={setGameState} />
      )}
    </Stack>
  );
};

export default Home;
