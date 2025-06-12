import { Stack } from "@mui/material";
import React from "react";
import Cell from "./Cell";
import { GameState } from "../types/state";

export interface PropsType {
  gameState: GameState;
}

const Lawn: React.FunctionComponent<PropsType> = ({ gameState }) => {
  return (
    <Stack direction="row" spacing={1} width="100%">
      {new Array(gameState.lawnWidth).fill(0).map((_, x) => (
        <Stack
          key={x}
          direction="column-reverse"
          width={`${100 / gameState.lawnWidth}%`}
          spacing={1}
        >
          {new Array(gameState.lawnHeight).fill(0).map((_, y) => (
            <Cell
              key={`${x}-${y}`}
              lawnMower={
                gameState.mowers.find(
                  (mower) => mower.position.x === x && mower.position.y === y
                ) || null
              }
              // position={{ x, y }}
              isMowed={gameState.mowedPositions.some(
                (pos) => pos.x === x && pos.y === y
              )}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default Lawn;
