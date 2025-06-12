import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, FormHelperText, Stack, styled } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { GameState, MowerDirection, MowerInstruction } from "../types/state";

const colors = ["red", "blue", "green", "orange", "purple", "pink"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export interface PropsType {
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

const UploadFileButton: React.FunctionComponent<PropsType> = ({
  setGameState,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const validateFileContent = (
    content: string | ArrayBuffer | null | undefined
  ) => {
    if (typeof content !== "string") {
      throw new Error("Invalid file content: Expected a string");
    }

    const cleanContent = content.trim(); // not sure if newline at end of file, will remove just incase

    const regex = /^\d{2}(?:\n\d{2}\s[NEWS]\n[RLF]+)+$/gm;
    const res = regex.exec(cleanContent);

    if (!res || res[0] !== cleanContent) {
      throw new Error("Invalid file content: Does not match expected format");
    }
  };

  const parseGameState = (content: string): GameState => {
    const lines = content.split("\n").map((line) => line.trim());

    const lawnSizeStr = lines.shift();
    if (!lawnSizeStr) {
      throw new Error("Invalid file content: Missing lawn size");
    }
    const lawnSize = lawnSizeStr.split("");
    if (lawnSize.length !== 2) {
      throw new Error("Invalid file content: Lawn size must be two numbers");
    }

    // add 1 to width and height because numbers correspond to top right corner position
    const lawnWidth = parseInt(lawnSize[0], 10) + 1; // +1 to account for 0-indexing
    const lawnHeight = parseInt(lawnSize[1], 10) + 1; // +1 to account for 0-indexing
    if (isNaN(lawnWidth) || isNaN(lawnHeight)) {
      throw new Error(
        "Invalid file content: Lawn size must be two valid numbers"
      );
    }

    const mowers: GameState["mowers"] = [];
    while (lines.length > 1) {
      const mowerPositionStr = lines.shift();
      if (!mowerPositionStr) {
        throw new Error("Invalid file content: Missing mower position");
      }

      const mowerInformation = mowerPositionStr.split(" ");
      if (mowerInformation.length !== 2) {
        throw new Error(
          "Invalid file content: Mower position must be two parts"
        );
      }

      const mowerPositionParts = mowerInformation[0].split("");
      const mowerPosition = {
        x: parseInt(mowerPositionParts[0], 10),
        y: parseInt(mowerPositionParts[1], 10),
      };
      if (isNaN(mowerPosition.x) || isNaN(mowerPosition.y)) {
        throw new Error(
          "Invalid file content: Mower position must be two valid numbers"
        );
      }

      if (
        mowerPosition.x < 0 ||
        mowerPosition.x >= lawnWidth ||
        mowerPosition.y < 0 ||
        mowerPosition.y >= lawnHeight
      ) {
        throw new Error(
          "Invalid file content: Mower position out of bounds of the lawn"
        );
      }

      const mowerDirection = mowerInformation[1] as MowerDirection;
      if (!["N", "E", "S", "W"].includes(mowerDirection)) {
        throw new Error(
          "Invalid file content: Mower direction must be one of N, E, S, W"
        );
      }
      const mowerInstructionsStr = lines.shift();
      if (!mowerInstructionsStr) {
        throw new Error("Invalid file content: Missing mower instructions");
      }
      const mowerInstructions = mowerInstructionsStr.split("");
      if (
        !mowerInstructions.every((instr) => ["L", "R", "F"].includes(instr))
      ) {
        throw new Error(
          "Invalid file content: Mower instructions must be L, R, or F"
        );
      }
      mowers.push({
        position: mowerPosition,
        direction: mowerDirection,
        instructions: mowerInstructions as Array<MowerInstruction>,
        color: colors[mowers.length % colors.length], // assign a color from the predefined list
        isFinished: false,
      });
    }

    return {
      lawnWidth,
      lawnHeight,
      mowers,
      mowedPositions: [...mowers.map((mower) => mower.position)], // initial mower positions are considered mowed
      isFinished: false,
    };
  };

  const handleNewFile = (file: File) => {
    // read file content
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const content = e.target?.result;

      try {
        // validate file content
        validateFileContent(content);

        // parse file content into game state
        setGameState(parseGameState(content as string));
      } catch (err) {
        console.error(err);
        setError("Invalid file content: " + (err as Error).message);
        return;
      }
    };
  };

  return (
    <Stack width="90%" maxWidth={300}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<FileUploadIcon />}
      >
        <FormattedMessage id="upload.button" />
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            setError(null); // reset error state
            const file = event.target.files?.[0];
            if (file) {
              handleNewFile(file);
            } else {
              throw new Error("No file selected");
            }
          }}
          accept=".txt"
        />
      </Button>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
};

export default UploadFileButton;
