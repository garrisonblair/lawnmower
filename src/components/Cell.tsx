// import AgricultureIcon from "@mui/icons-material/Agriculture";
import { Box } from "@mui/material";
import { IconGrowth } from "@tabler/icons-react";
import React from "react";
import { LawnMower } from "../types/state";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export interface PropsType {
  lawnMower: LawnMower | null;
  isMowed: boolean;
}

const Cell: React.FunctionComponent<PropsType> = ({ lawnMower, isMowed }) => {
  const renderContent = () => {
    if (lawnMower) {
      const { direction } = lawnMower;
      let transform = "";
      switch (direction) {
        case "N":
          transform = "rotate(-90deg)";
          break;
        case "E":
          break;
        case "S":
          transform = "rotate(90deg)";
          break;
        case "W":
          transform = "scaleX(-1)";
          break;
      }

      return (
        <ArrowRightAltIcon
          sx={{
            transform,
            color: lawnMower.color,
          }}
        />
      );
    }

    if (!isMowed) {
      return <IconGrowth stroke={2} color="darkgreen" />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightgreen",
        width: "100%",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default Cell;
