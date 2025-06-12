import AgricultureIcon from "@mui/icons-material/Agriculture";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { GamePositonState, GameState } from "../types/state";

export interface PropsType {
  gameState: GameState;
  gamePositionState: GamePositonState;
}

const Information: React.FunctionComponent<PropsType> = ({
  gameState,
  gamePositionState,
}) => {
  const isInstructionCompleted = (
    mowerIndex: number,
    instructionIndex: number
  ) => {
    if (gamePositionState.mowerIndex > mowerIndex) {
      return true;
    }
    if (gamePositionState.mowerIndex === mowerIndex) {
      return gamePositionState.instructionIndex > instructionIndex;
    }
    return false;
  };

  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        <FormattedMessage
          id="information.size"
          values={{ w: gameState.lawnWidth, h: gameState.lawnHeight }}
        />
      </Typography>
      <Stack spacing={2}>
        {gameState.mowers.map((mower, mi) => (
          <Stack key={mi}>
            <Stack
              direction={"row"}
              alignItems="center"
              width="100%"
              spacing={1}
            >
              <AgricultureIcon
                sx={{
                  color: mower.color,
                }}
              />
              <Typography variant="body1" color={mower.color}>
                <FormattedMessage
                  id="information.mower"
                  values={{ number: mi + 1 }}
                />
              </Typography>
              <Typography variant="body1">
                <FormattedMessage
                  id="information.position"
                  values={{
                    x: mower.position.x,
                    y: mower.position.y,
                    direction: mower.direction,
                  }}
                />
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              spacing={2}
              px={1}
              py={0.5}
              maxWidth={"100%"}
              flexWrap={"wrap"}
            >
              {mower.instructions.map((instruction, ii) => (
                <Typography
                  key={ii}
                  variant="body2"
                  sx={{
                    color: isInstructionCompleted(mi, ii) ? "green" : "gray",
                    fontWeight: isInstructionCompleted(mi, ii)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {instruction}
                </Typography>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Information;
